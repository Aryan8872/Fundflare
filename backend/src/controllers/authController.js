import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';
import { z } from 'zod';
import catchAsync from '../utils/catchAsync.js';
import { sendEmail } from '../utils/emailService.js';
import logger from '../utils/logger.js';

const prisma = new PrismaClient();

// In-memory store for failed login attempts (for demo; use Redis/DB in production)
const loginAttempts = {};
const LOCK_TIME = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // max 20 login requests per IP per window
    message: 'Too many login attempts from this IP, please try again later.'
});

const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }),
    role: z.enum(['DONOR', 'CREATOR']).optional() // Only allow donor or creator at registration
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '1d',
    });
};

function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
function hashOtp(otp) {
    return crypto.createHash('sha256').update(otp).digest('hex');
}

export const register = catchAsync(async (req, res) => {
    const { captcha, ...body } = req.body;
    // Verify reCAPTCHA
    const captchaRes = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${RECAPTCHA_SECRET}&response=${captcha}`
    });
    const captchaData = await captchaRes.json();
    if (!captchaData.success) {
        return res.status(400).json({ message: 'CAPTCHA verification failed' });
    }
    const data = signupSchema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw { status: 400, message: 'Email already in use' };

    const hashed = await bcrypt.hash(data.password, 12);
    let userRole = data.role || 'DONOR';
    // Prevent users from registering as admin
    if (data.role === 'ADMIN') userRole = 'DONOR';
    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashed,
            role: userRole
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        },
    });

    const token = generateToken(user.id);
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'Strict' : 'Lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    };
    res.cookie('token', token, cookieOptions);

    res.status(201).json({
        user,
        message: 'Registration successful'
    });
    logger.info(`User registered: ${user.email} (${user.id})`);
});

export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const now = Date.now();
    if (!loginAttempts[email]) loginAttempts[email] = { count: 0, lockUntil: 0 };
    if (loginAttempts[email].lockUntil > now) {
        return res.status(429).json({ message: `Account locked. Try again after ${Math.ceil((loginAttempts[email].lockUntil - now) / 60000)} minutes.` });
    }
    const data = loginSchema.parse({ email, password });
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
        loginAttempts[email].count++;
        if (loginAttempts[email].count >= MAX_ATTEMPTS) {
            loginAttempts[email].lockUntil = now + LOCK_TIME;
        }
        throw { status: 400, message: 'Invalid credentials' };
    }
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
        loginAttempts[email].count++;
        if (loginAttempts[email].count >= MAX_ATTEMPTS) {
            loginAttempts[email].lockUntil = now + LOCK_TIME;
        }
        throw { status: 400, message: 'Invalid credentials' };
    }
    // Reset attempts on successful password check
    loginAttempts[email] = { count: 0, lockUntil: 0 };
    // Generate OTP
    const otp = generateOtp();
    const otpHash = hashOtp(otp);
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry
    await prisma.user.update({ where: { id: user.id }, data: { otpHash, otpExpiry } });
    // Send OTP via email
    await sendEmail(user.email, 'otp', { otp });
    logger.info(`OTP sent to user: ${user.email} (${user.id})`);
    res.json({ message: 'OTP sent to your email. Please verify to complete login.' });
});

export const verifyOtp = catchAsync(async (req, res) => {
    const { email, otp } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.otpHash || !user.otpExpiry) {
        return res.status(400).json({ message: 'OTP not requested or expired.' });
    }
    if (user.otpExpiry < new Date()) {
        await prisma.user.update({ where: { id: user.id }, data: { otpHash: null, otpExpiry: null } });
        return res.status(400).json({ message: 'OTP expired. Please login again.' });
    }
    if (user.otpHash !== hashOtp(otp)) {
        return res.status(400).json({ message: 'Invalid OTP.' });
    }
    // OTP is valid, clear it and complete login
    await prisma.user.update({ where: { id: user.id }, data: { otpHash: null, otpExpiry: null } });
    const token = generateToken(user.id);
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'Strict' : 'Lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    };
    res.cookie('token', token, cookieOptions);
    logger.info(`User login (OTP verified): ${user.email} (${user.id})`);
    res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        message: 'Login successful'
    });
});

export const logout = catchAsync(async (req, res) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'Strict' : 'Lax',
    };
    res.clearCookie('token', cookieOptions);
    res.json({ message: 'Logged out successfully' });
});

export const getCurrentUser = catchAsync(async (req, res) => {
    if (!req.user) {
        throw { status: 401, message: 'Authentication required' };
    }

    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true
        },
    });

    res.json({ user });
});

export const updateProfile = catchAsync(async (req, res) => {
    const userId = req.user.id;
    const { name, email, password } = req.body;
    const data = {};
    if (name) data.name = name;
    if (email) data.email = email;
    if (password) data.password = await bcrypt.hash(password, 12);
    const updated = await prisma.user.update({ where: { id: userId }, data });
    const { password: _, ...userWithoutPassword } = updated;
    res.json({ user: userWithoutPassword });
}); 
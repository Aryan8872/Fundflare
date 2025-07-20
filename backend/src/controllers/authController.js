import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import catchAsync from '../utils/catchAsync.js';

const prisma = new PrismaClient();

const signupSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(['DONOR', 'CREATOR']).optional() // Only allow donor or creator at registration
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || 'your-secret-key', {
        expiresIn: '7d',
    });
};

export const register = catchAsync(async (req, res) => {
    const data = signupSchema.parse(req.body);

    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw { status: 400, message: 'Email already in use' };

    const hashed = await bcrypt.hash(data.password, 10);
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

    res.status(201).json({
        user,
        token,
        message: 'Registration successful'
    });
});

export const login = catchAsync(async (req, res) => {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw { status: 400, message: 'Invalid credentials' };

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw { status: 400, message: 'Invalid credentials' };

    const token = generateToken(user.id);

    res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token,
        message: 'Login successful'
    });
});

export const logout = catchAsync(async (req, res) => {
    // JWT tokens are stateless, so we just return success
    // The client should remove the token from storage
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
  if (password) data.password = await bcrypt.hash(password, 10);
  const updated = await prisma.user.update({ where: { id: userId }, data });
  const { password: _, ...userWithoutPassword } = updated;
  res.json({ user: userWithoutPassword });
}); 
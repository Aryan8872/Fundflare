import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import catchAsync from '../utils/catchAsync.js';
import logger, { logUserActivity } from '../utils/logger.js';
const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET_KEY || '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

const prisma = new PrismaClient();

// Dashboard: stats for campaigns, donations, users, payouts
export const getDashboardStats = catchAsync(async (req, res) => {
    const [
        totalCampaigns,
        totalDonations,
        totalUsers,
        totalPayouts,
        recentDonations
    ] = await Promise.all([
        prisma.campaign.count(),
        prisma.donation.count(),
        prisma.user.count(),
        prisma.payoutRequest.count(),
        prisma.donation.findMany({
            take: 5,
            orderBy: { date: 'desc' },
            include: {
                donor: { select: { name: true, email: true } },
                campaign: { select: { title: true } },
            },
        }),
    ]);
    res.json({
        stats: {
            totalCampaigns,
            totalDonations,
            totalUsers,
            totalPayouts
        },
        recentDonations
    });
});

// List all payout requests
export const getAllPayoutRequests = catchAsync(async (req, res) => {
    const payouts = await prisma.payoutRequest.findMany({
        include: { campaign: { select: { title: true, creatorId: true } } },
        orderBy: { requestedAt: 'desc' }
    });
    res.json({ payouts });
});

// Approve payout request
export const approvePayoutRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { captcha } = req.body;
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
    const payout = await prisma.payoutRequest.update({
        where: { id },
        data: { status: 'APPROVED', reviewedAt: new Date() }
    });
    logger.info(`Payout approved: payoutId=${id} by admin=${req.user?.id}`);
    res.json({ payout, message: 'Payout approved' });
});

// Reject payout request
export const rejectPayoutRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { captcha } = req.body;
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
    const payout = await prisma.payoutRequest.update({
        where: { id },
        data: { status: 'REJECTED', reviewedAt: new Date() }
    });
    logger.info(`Payout rejected: payoutId=${id} by admin=${req.user?.id}`);
    res.json({ payout, message: 'Payout rejected' });
});

// Mark payout as completed
export const completePayoutRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { captcha } = req.body;
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
    const payout = await prisma.payoutRequest.update({
        where: { id },
        data: { status: 'COMPLETED' }
    });
    logger.info(`Payout completed: payoutId=${id} by admin=${req.user?.id}`);
    res.json({ payout, message: 'Payout marked as completed' });
});

// List all users
export const getAllUsersAdmin = catchAsync(async (req, res) => {
    const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ users });
});

// List all campaigns
export const getAllCampaignsAdmin = catchAsync(async (req, res) => {
    const campaigns = await prisma.campaign.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ campaigns });
});

// List all donations
export const getAllDonationsAdmin = catchAsync(async (req, res) => {
    const donations = await prisma.donation.findMany({
        orderBy: { date: 'desc' },
        include: {
            donor: { select: { name: true, email: true } },
            campaign: {
                select: {
                    title: true,
                    creator: { select: { name: true } }
                }
            },
            transaction: { select: { provider: true, status: true } }
        }
    });

    // Decrypt guest emails
    const decryptedDonations = donations.map(donation => ({
        ...donation,
        guestEmail: donation.guestEmail ? decryptGuestEmail(donation.guestEmail) : null
    }));

    res.json({ donations: decryptedDonations });
});

// Helper function to decrypt guest email
function decryptGuestEmail(encryptedEmail) {
    try {
        const crypto = require('crypto');
        const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '0123456789abcdef0123456789abcdef';
        const IV_LENGTH = 16;

        if (!encryptedEmail) return encryptedEmail;
        const parts = encryptedEmail.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const encryptedText = Buffer.from(parts[1], 'hex');
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    } catch (error) {
        console.error('Error decrypting guest email:', error);
        return encryptedEmail; // Return original if decryption fails
    }
}

// Get activity logs (last 200 lines)
export const getActivityLogs = catchAsync(async (req, res) => {
    const logPath = path.resolve(process.cwd(), 'user-activity.log');
    if (!fs.existsSync(logPath)) {
        return res.json({ logs: [] });
    }
    const data = fs.readFileSync(logPath, 'utf-8');
    const lines = data.trim().split('\n');
    const lastLines = lines.slice(-200); // last 200 lines
    res.json({ logs: lastLines });
});

export const updateUserRole = async (req, res) => {
    try {
        // Only allow admins
        if (!req.user || req.user.role !== 'ADMIN') {
            return res.status(403).json({ status: 'error', message: 'Insufficient permissions' });
        }
        const { id } = req.params;
        const { role } = req.body;
        if (!role) {
            return res.status(400).json({ status: 'error', message: 'Role is required' });
        }
        const user = await prisma.user.update({
            where: { id },
            data: { role },
        });
        
        // Log admin activity
        logUserActivity(req.user.id, 'ADMIN_ROLE_CHANGE', `Admin changed user role`, `Target user: ${user.email}, New role: ${role}`);
        logger.info(`Admin ${req.user.email} changed role for user ${user.email} to ${role}`);
        res.json({ status: 'success', user });
    } catch (err) {
        logger.error('Error updating user role:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update user role' });
    }
};

export const deactivateUser = async (req, res) => {
    try {
        // Only allow admins
        if (!req.user || req.user.role !== 'ADMIN') {
            return res.status(403).json({ status: 'error', message: 'Insufficient permissions' });
        }
        const { id } = req.params;
        const user = await prisma.user.update({
            where: { id },
            data: { status: 'deactivated' },
        });
        
        // Log admin activity
        logUserActivity(req.user.id, 'ADMIN_USER_DEACTIVATION', `Admin deactivated user`, `Target user: ${user.email}`);
        logger.info(`Admin ${req.user.email} deactivated user ${user.email}`);
        res.json({ status: 'success', user });
    } catch (err) {
        logger.error('Error deactivating user:', err);
        res.status(500).json({ status: 'error', message: 'Failed to deactivate user' });
    }
}; 
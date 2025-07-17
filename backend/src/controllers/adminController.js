import { PrismaClient } from '@prisma/client';
import catchAsync from '../utils/catchAsync.js';

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
    const payout = await prisma.payoutRequest.update({
        where: { id },
        data: { status: 'APPROVED', reviewedAt: new Date() }
    });
    res.json({ payout, message: 'Payout approved' });
});

// Reject payout request
export const rejectPayoutRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payout = await prisma.payoutRequest.update({
        where: { id },
        data: { status: 'REJECTED', reviewedAt: new Date() }
    });
    res.json({ payout, message: 'Payout rejected' });
});

// Mark payout as completed
export const completePayoutRequest = catchAsync(async (req, res) => {
    const { id } = req.params;
    const payout = await prisma.payoutRequest.update({
        where: { id },
        data: { status: 'COMPLETED' }
    });
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
    const donations = await prisma.donation.findMany({ orderBy: { date: 'desc' } });
    res.json({ donations });
}); 
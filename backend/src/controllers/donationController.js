import { PrismaClient } from '@prisma/client';
import * as donationService from '../services/donationService.js';
import catchAsync from '../utils/catchAsync.js';
import { donationSchema } from '../validation/donationValidation.js';
const prisma = new PrismaClient();

export const createDonation = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'DONOR') throw { status: 403, message: 'Only donors can donate' };
    const data = donationSchema.parse(req.body);
    const campaign = await prisma.campaign.findUnique({ where: { id: data.campaignId } });
    if (!campaign || campaign.status !== 'active') throw { status: 404, message: 'Campaign not found or inactive' };
    // Create donation
    const donation = await donationService.createDonation({
        donorId: req.user.id,
        campaignId: data.campaignId,
        amount: data.amount,
        type: data.type
    });
    // Update campaign's currentAmount
    await prisma.campaign.update({
        where: { id: data.campaignId },
        data: { currentAmount: { increment: data.amount } }
    });
    res.status(201).json({ donation, message: 'Donation successful' });
});

export const getDonationHistory = catchAsync(async (req, res) => {
    if (!req.user) throw { status: 401, message: 'Authentication required' };
    let donations;
    if (req.user.role === 'DONOR') {
        donations = await donationService.getDonationsByDonor(req.user.id);
    } else if (req.user.role === 'CREATOR') {
        // Get all donations to creator's campaigns
        const campaigns = await prisma.campaign.findMany({ where: { creatorId: req.user.id }, select: { id: true } });
        const campaignIds = campaigns.map(c => c.id);
        donations = await donationService.getDonationsByCampaigns(campaignIds);
    } else {
        donations = [];
    }
    res.json({ donations });
});

export const simulateRecurringDonations = catchAsync(async (req, res) => {
    const count = await donationService.simulateRecurringDonations();
    res.json({ message: 'Recurring donations simulated', count });
}); 
import { PrismaClient } from '@prisma/client';
import * as campaignService from '../services/campaignService.js';
import catchAsync from '../utils/catchAsync.js';
import logger, { userActivityLogger } from '../utils/logger.js';
import { createCampaignSchema, updateCampaignSchema } from '../validation/campaignValidation.js';

const prisma = new PrismaClient();

const logAction = (req, action, message, details = '') => {
    userActivityLogger.log({
        level: 'info',
        userId: req.user?.id || null,
        action,
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        message,
        details
    });
};

export const getAllCampaigns = catchAsync(async (req, res) => {
    const { search, category } = req.query;
    const where = { status: { in: ['approved', 'active'] } };
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (category && category !== 'undefined' && category !== 'All') where.category = category;
    const campaigns = await campaignService.getAllCampaigns(where);
    res.json({ campaigns });
});

export const getCampaignById = catchAsync(async (req, res) => {
    const { id } = req.params;
    const campaign = await campaignService.getCampaignById(id);
    if (!campaign) throw { status: 404, message: 'Campaign not found' };
    res.json({ campaign });
});

export const createCampaign = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'CREATOR') throw { status: 403, message: 'Only campaign creators can create campaigns' };
    const data = createCampaignSchema.parse(req.body);
    // Media upload logic (mock for now)
    const media = data.media || [];
    const campaign = await campaignService.createCampaign({
        ...data,
        creatorId: req.user.id,
        status: 'pending',
        media,
    });
    logAction(req, 'Create Campaign', `Created campaign ${campaign.id}`);

    res.status(201).json({ campaign });
});

export const approveCampaign = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'ADMIN') throw { status: 403, message: 'Only admins can approve campaigns' };
    const { id } = req.params;
    const campaign = await campaignService.updateCampaign(id, { status: 'approved', approvedBy: req.user.id, approvedAt: new Date() });
    logAction(req, 'Approve Campaign', `Approved campaign ${id}`);
    res.json({ campaign });
});

export const rejectCampaign = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'ADMIN') throw { status: 403, message: 'Only admins can reject campaigns' };
    const { id } = req.params;
    const campaign = await campaignService.updateCampaign(id, { status: 'rejected', approvedBy: req.user.id, approvedAt: new Date() });
    logAction(req, 'Reject Campaign', `Rejected campaign ${id}`);
    res.json({ campaign });
});

export const getCampaignUpdates = catchAsync(async (req, res) => {
    const { id } = req.params;
    const updates = await campaignService.getCampaignUpdates(id);
    res.json({ updates });
});

export const addCampaignUpdate = catchAsync(async (req, res) => {
    if (!req.user) throw { status: 401, message: 'Authentication required' };
    const { id } = req.params;
    const { content } = req.body;
    const update = await campaignService.addCampaignUpdate(id, req.user.id, content);
    logAction(req, 'Add Campaign Update', `Added update to campaign ${id}`);
    res.status(201).json({ update });
});

export const updateCampaign = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'CREATOR') throw { status: 403, message: 'Only campaign creators can update campaigns' };
    const campaign = await campaignService.getCampaignById(id);
    if (!campaign || campaign.creatorId !== req.user.id) throw { status: 403, message: 'Not authorized' };
    const data = updateCampaignSchema.parse(req.body);
    const updated = await campaignService.updateCampaign(id, data);
    logAction(req, 'Update Campaign', `Updated campaign ${id}`);

    res.json({ campaign: updated });
});

export const adminUpdateCampaign = async (req, res) => {
    try {
        if (!req.user || req.user.role !== 'ADMIN') {
            return res.status(403).json({ status: 'error', message: 'Insufficient permissions' });
        }
        const { id } = req.params;
        const updateData = req.body;
        const campaign = await prisma.campaign.update({
            where: { id },
            data: updateData,
        });
        logAction(req, 'Admin Update Campaign', `Admin updated campaign ${id}`);
        res.json({ status: 'success', campaign });
    } catch (err) {
        logger.error('Error updating campaign as admin:', err);
        res.status(500).json({ status: 'error', message: 'Failed to update campaign' });
    }
};

export const deleteCampaign = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!req.user) throw { status: 401, message: 'Authentication required' };

    const campaign = await campaignService.getCampaignById(id);
    if (!campaign) throw { status: 404, message: 'Campaign not found' };

    // Admins can delete any campaign, creators can only delete their own
    if (req.user.role === 'ADMIN') {
        // Admin can delete any campaign
        await deleteCampaignWithRelatedData(id);
        logAction(req, 'Delete Campaign', `Admin deleted campaign ${id}`);
        res.json({ message: 'Campaign deleted successfully' });
    } else if (req.user.role === 'CREATOR') {
        // Creator can only delete their own campaign
        if (campaign.creatorId !== req.user.id) {
            throw { status: 403, message: 'You can only delete your own campaigns' };
        }
        await deleteCampaignWithRelatedData(id);
        logAction(req, 'Delete Campaign', `Creator deleted campaign ${id}`);
        res.json({ message: 'Campaign deleted successfully' });
    } else {
        throw { status: 403, message: 'Insufficient permissions to delete campaigns' };
    }
});

// Helper function to delete campaign and all related data
async function deleteCampaignWithRelatedData(campaignId) {
    // Delete in order to respect foreign key constraints
    // 1. Delete transactions (if any)
    await prisma.transaction.deleteMany({
        where: { donation: { campaignId } }
    });

    // 2. Delete donations
    await prisma.donation.deleteMany({
        where: { campaignId }
    });

    // 3. Delete recurring donations
    await prisma.recurringDonation.deleteMany({
        where: { campaignId }
    });

    // 4. Delete payout requests
    await prisma.payoutRequest.deleteMany({
        where: { campaignId }
    });

    // 5. Delete campaign updates
    await prisma.campaignUpdate.deleteMany({
        where: { campaignId }
    });

    // 6. Delete campaign favorites (many-to-many relationship)
    await prisma.campaign.update({
        where: { id: campaignId },
        data: { favoritedBy: { set: [] } }
    });

    // 7. Finally delete the campaign
    await prisma.campaign.delete({
        where: { id: campaignId }
    });
} 
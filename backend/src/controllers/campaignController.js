import * as campaignService from '../services/campaignService.js';
import catchAsync from '../utils/catchAsync.js';
import { createCampaignSchema, updateCampaignSchema } from '../validation/campaignValidation.js';

export const getAllCampaigns = catchAsync(async (req, res) => {
    const { search, category } = req.query;
    const where = { status: 'active' };
    if (search) {
        where.OR = [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
        ];
    }
    if (category) where.category = category;
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
    const campaign = await campaignService.createCampaign({ ...data, creatorId: req.user.id });
    res.status(201).json({ campaign });
});

export const updateCampaign = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'CREATOR') throw { status: 403, message: 'Only campaign creators can update campaigns' };
    const campaign = await campaignService.getCampaignById(id);
    if (!campaign || campaign.creatorId !== req.user.id) throw { status: 403, message: 'Not authorized' };
    const data = updateCampaignSchema.parse(req.body);
    const updated = await campaignService.updateCampaign(id, data);
    res.json({ campaign: updated });
});

export const deleteCampaign = catchAsync(async (req, res) => {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'CREATOR') throw { status: 403, message: 'Only campaign creators can delete campaigns' };
    const campaign = await campaignService.getCampaignById(id);
    if (!campaign || campaign.creatorId !== req.user.id) throw { status: 403, message: 'Not authorized' };
    await campaignService.deleteCampaign(id);
    res.json({ message: 'Campaign deleted successfully' });
}); 
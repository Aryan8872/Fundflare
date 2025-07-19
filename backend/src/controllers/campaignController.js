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
    // Only filter by category if it's a real value
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
    res.status(201).json({ campaign });
});

export const approveCampaign = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'ADMIN') throw { status: 403, message: 'Only admins can approve campaigns' };
    const { id } = req.params;
    const campaign = await campaignService.updateCampaign(id, { status: 'approved', approvedBy: req.user.id, approvedAt: new Date() });
    res.json({ campaign });
});

export const rejectCampaign = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'ADMIN') throw { status: 403, message: 'Only admins can reject campaigns' };
    const { id } = req.params;
    const campaign = await campaignService.updateCampaign(id, { status: 'rejected', approvedBy: req.user.id, approvedAt: new Date() });
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
    res.status(201).json({ update });
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
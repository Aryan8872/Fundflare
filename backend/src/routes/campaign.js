import express from 'express';
import * as campaignController from '../controllers/campaignController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Creator routes - require authentication and creator role
router.post('/', authenticateToken, requireRole(['CREATOR']), campaignController.createCampaign);
router.post('/:id/approve', authenticateToken, requireRole(['ADMIN']), campaignController.approveCampaign);
router.post('/:id/reject', authenticateToken, requireRole(['ADMIN']), campaignController.rejectCampaign);
router.get('/:id/updates', campaignController.getCampaignUpdates);
router.post('/:id/updates', authenticateToken, campaignController.addCampaignUpdate);
router.put('/:id', authenticateToken, requireRole(['CREATOR']), campaignController.updateCampaign);
router.patch('/:id/admin', authenticateToken, requireRole(['ADMIN']), campaignController.adminUpdateCampaign);
router.delete('/:id', authenticateToken, requireRole(['CREATOR', 'ADMIN']), campaignController.deleteCampaign);

export default router; 
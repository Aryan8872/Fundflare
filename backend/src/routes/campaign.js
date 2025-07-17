import express from 'express';
import * as campaignController from '../controllers/campaignController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', campaignController.getAllCampaigns);
router.get('/:id', campaignController.getCampaignById);

// Creator routes - require authentication and creator role
router.post('/', authenticateToken, requireRole(['CREATOR']), campaignController.createCampaign);
router.put('/:id', authenticateToken, requireRole(['CREATOR']), campaignController.updateCampaign);
router.delete('/:id', authenticateToken, requireRole(['CREATOR']), campaignController.deleteCampaign);

export default router; 
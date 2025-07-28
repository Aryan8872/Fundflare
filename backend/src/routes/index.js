import express from 'express';
import { updateProfile } from '../controllers/authController.js';
import * as donationController from '../controllers/donationController.js';
import { authenticateToken } from '../middleware/auth.js';
import adminRouter from './admin.js';
import logsRouter from './logs.js';
import authRouter from './auth.js';
import campaignRouter from './campaign.js';
import donationRouter from './donation.js';
import notificationsRouter from './notifications.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/campaigns', campaignRouter);
router.use('/donations', donationRouter);
router.use('/notifications', notificationsRouter);
router.use('/admin', adminRouter);
router.use('/logs', logsRouter); // /api/logs
router.patch('/users/profile', authenticateToken, updateProfile);

export default router; 
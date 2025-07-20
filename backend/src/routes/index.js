import express from 'express';
import { updateProfile } from '../controllers/authController.js';
import adminRouter from './admin.js';
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
router.patch('/users/profile', auth, updateProfile);

export default router; 
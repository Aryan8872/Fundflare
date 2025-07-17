import express from 'express';
import adminRouter from './admin.js';
import authRouter from './auth.js';
import campaignRouter from './campaign.js';
import donationRouter from './donation.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/campaigns', campaignRouter);
router.use('/donations', donationRouter);
router.use('/admin', adminRouter);

export default router; 
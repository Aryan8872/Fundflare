import express from 'express';
import * as donationController from '../controllers/donationController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// All donation routes require authentication
router.use(authenticateToken);

// Donor donation routes
router.post('/', requireRole(['DONOR']), donationController.createDonation);
router.get('/history', donationController.getDonationHistory);
router.post('/recurring/simulate', requireRole(['ADMIN']), donationController.simulateRecurringDonations);

export default router; 
import express from 'express';
import * as adminController from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require admin authentication (add middleware in production)

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Payout Requests
router.get('/payouts', adminController.getAllPayoutRequests);
router.post('/payouts/:id/approve', adminController.approvePayoutRequest);
router.post('/payouts/:id/reject', adminController.rejectPayoutRequest);
router.post('/payouts/:id/complete', adminController.completePayoutRequest);

// User Management
router.get('/users', adminController.getAllUsersAdmin);

// Campaign Management
router.get('/campaigns', adminController.getAllCampaignsAdmin);

// Donation Management
router.get('/donations', adminController.getAllDonationsAdmin);

export default router; 
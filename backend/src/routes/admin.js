import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Protect all admin routes
router.use(authenticateToken);

// Dashboard
router.get('/dashboard', adminController.getDashboardStats);

// Payout Requests
router.get('/payouts', adminController.getAllPayoutRequests);
router.post('/payouts/:id/approve', adminController.approvePayoutRequest);
router.post('/payouts/:id/reject', adminController.rejectPayoutRequest);
router.post('/payouts/:id/complete', adminController.completePayoutRequest);

// User Management
router.get('/users', adminController.getAllUsersAdmin);
router.patch('/users/:id/role', adminController.updateUserRole);
router.post('/users/:id/deactivate', adminController.deactivateUser);

// Campaign Management
router.get('/campaigns', adminController.getAllCampaignsAdmin);

// Donation Management
router.get('/donations', adminController.getAllDonationsAdmin);

// Activity Logs
router.get('/logs', adminController.getActivityLogs);

export default router; 
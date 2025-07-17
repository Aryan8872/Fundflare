import express from 'express';
import * as notificationController from '../controllers/notificationController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// All notification routes require authentication
router.use(authenticateToken);

// User notification routes
router.get('/', notificationController.getNotifications);
router.put('/:id/read', notificationController.markAsRead);
router.put('/read-all', notificationController.markAllAsRead);
router.delete('/:id', notificationController.deleteNotification);

// Admin notification routes
router.get('/admin', requireAdmin, notificationController.getAdminNotifications);

export default router; 
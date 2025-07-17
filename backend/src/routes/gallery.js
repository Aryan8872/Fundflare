import express from 'express';
import * as galleryController from '../controllers/galleryController.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', galleryController.getAllGalleryImages);
router.get('/categories', galleryController.getGalleryCategories);
router.get('/:id', galleryController.getGalleryImageById);

// Admin routes - require authentication and admin role
router.post('/', authenticateToken, requireRole(['admin']), galleryController.createGalleryImage);
router.put('/:id', authenticateToken, requireRole(['admin']), galleryController.updateGalleryImage);
router.delete('/:id', authenticateToken, requireRole(['admin']), galleryController.deleteGalleryImage);

export default router; 
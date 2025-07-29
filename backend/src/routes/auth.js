
import csurf from 'csurf';
import express from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Registration now supports role selection: DONOR or CREATOR
router.post(
    '/register',
    [
        body('name').trim().escape().notEmpty().withMessage('Name is required'),
        body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
        body('role').optional().isIn(['DONOR', 'CREATOR'])
    ],
    authController.register
);
router.post('/login', authController.loginLimiter, authController.login);
router.post('/logout', authController.logout);
router.post('/verify-otp', authController.verifyOtp);
router.get('/me', authenticateToken, authController.getCurrentUser);
router.get('/csrf-token', csurf({ cookie: true }), (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

export default router; 
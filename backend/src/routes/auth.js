import express from 'express';
import * as authController from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';
import csurf from 'csurf';

const router = express.Router();

// Registration now supports role selection: DONOR or CREATOR
router.post('/register', authController.register);
router.post('/login', authController.loginLimiter, authController.login);
router.post('/logout', authController.logout);
router.post('/verify-otp', authController.verifyOtp);
router.get('/me', authenticateToken, authController.getCurrentUser);
router.get('/csrf-token', csurf({ cookie: true }), (req, res) => {
    res.json({ csrfToken: req.csrfToken() });
});

export default router; 
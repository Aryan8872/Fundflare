import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

// Get latest 200 user logs (admin only)
router.get('/', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  const logs = await prisma.userLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 200,
  });
  res.json({ logs });
});

export default router;

import { PrismaClient } from '@prisma/client';
import catchAsync from '../utils/catchAsync.js';

const prisma = new PrismaClient();

export const getNotifications = catchAsync(async (req, res) => {
    if (!req.user) throw { status: 401, message: 'Authentication required' };
    const notifications = await prisma.notification.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: 'desc' },
    });
    res.json({ notifications });
}); 
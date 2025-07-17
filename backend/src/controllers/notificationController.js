import { PrismaClient } from '@prisma/client';
import catchAsync from '../utils/catchAsync.js';

const prisma = new PrismaClient();

export const getNotifications = catchAsync(async (req, res) => {
    if (!req.user) {
        throw { status: 401, message: 'Authentication required' };
    }

    const { page = 1, limit = 20, unreadOnly = false } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {
        OR: [
            { userId: req.user.id },
            { userId: null } // Admin notifications
        ]
    };

    if (unreadOnly === 'true') {
        whereClause.isRead = false;
    }

    const notifications = await prisma.notification.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: parseInt(offset),
        take: parseInt(limit),
    });

    const total = await prisma.notification.count({
        where: whereClause,
    });

    const unreadCount = await prisma.notification.count({
        where: {
            ...whereClause,
            isRead: false,
        },
    });

    res.json({
        notifications,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit),
        },
        unreadCount,
    });
});

export const markAsRead = catchAsync(async (req, res) => {
    if (!req.user) {
        throw { status: 401, message: 'Authentication required' };
    }

    const { id } = req.params;

    const notification = await prisma.notification.findFirst({
        where: {
            id,
            OR: [
                { userId: req.user.id },
                { userId: null } // Admin notifications
            ]
        },
    });

    if (!notification) {
        throw { status: 404, message: 'Notification not found' };
    }

    const updatedNotification = await prisma.notification.update({
        where: { id },
        data: { isRead: true },
    });

    res.json({ notification: updatedNotification });
});

export const markAllAsRead = catchAsync(async (req, res) => {
    if (!req.user) {
        throw { status: 401, message: 'Authentication required' };
    }

    await prisma.notification.updateMany({
        where: {
            OR: [
                { userId: req.user.id },
                { userId: null } // Admin notifications
            ],
            isRead: false,
        },
        data: { isRead: true },
    });

    res.json({ message: 'All notifications marked as read' });
});

export const deleteNotification = catchAsync(async (req, res) => {
    if (!req.user) {
        throw { status: 401, message: 'Authentication required' };
    }

    const { id } = req.params;

    const notification = await prisma.notification.findFirst({
        where: {
            id,
            OR: [
                { userId: req.user.id },
                { userId: null } // Admin notifications
            ]
        },
    });

    if (!notification) {
        throw { status: 404, message: 'Notification not found' };
    }

    await prisma.notification.delete({
        where: { id },
    });

    res.json({ message: 'Notification deleted successfully' });
});

export const getAdminNotifications = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        throw { status: 403, message: 'Admin access required' };
    }

    const { page = 1, limit = 20, type } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = {};
    if (type) {
        whereClause.type = type;
    }

    const notifications = await prisma.notification.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        skip: parseInt(offset),
        take: parseInt(limit),
    });

    const total = await prisma.notification.count({
        where: whereClause,
    });

    const unreadCount = await prisma.notification.count({
        where: {
            ...whereClause,
            isRead: false,
        },
    });

    res.json({
        notifications,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit),
        },
        unreadCount,
    });
}); 
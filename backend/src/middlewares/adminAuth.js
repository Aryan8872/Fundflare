import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const requireAdmin = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.session.userId },
            select: { id: true, name: true, email: true, role: true },
        });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Admin access required' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
}; 
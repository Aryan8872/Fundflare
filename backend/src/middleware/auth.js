import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const authenticateToken = async (req, res, next) => {
    try {
        // Try to get token from cookie first, then from Authorization header
        let token = req.cookies?.token;
        if (!token) {
            const authHeader = req.headers.authorization;
            token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        }

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            },
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }
        return res.status(500).json({ message: 'Authentication error' });
    }
};

export const requireRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }

        next();
    };
};

// FundFlare roles: 'DONOR', 'CREATOR', 'ADMIN'
export const requireAdmin = requireRole(['ADMIN']); 
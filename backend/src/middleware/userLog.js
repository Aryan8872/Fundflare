import { logUserActivityToDb } from '../utils/dbLogger.js';

// Express middleware to log user activity to Postgres
export async function userLogMiddleware(req, res, next) {
    // Only log API requests (not static files, etc.)
    if (req.path.startsWith('/api')) {
        const email = req.user?.email || 'anonymous';
        const username = req.user?.name || null;
        const url = req.originalUrl;
        const ip = req.headers['x-forwarded-for'] || req.ip;
        const method = req.method;
        res.on('finish', () => {
            const status = res.statusCode;
            logUserActivityToDb({ email, username, url, method, status, ip });
        });
    }
    next();
}

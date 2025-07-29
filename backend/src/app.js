import cookieParser from 'cookie-parser';
import cors from 'cors';
import csurf from 'csurf';
import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleStripeWebhook } from './controllers/donationController.js';
import { userLogMiddleware } from './middleware/userLog.js';
import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.js';
// Log user activity to Postgres for all API requests

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(userLogMiddleware);

app.use(cors({
    origin: 'https://localhost:5173',
    credentials: true
}));

// Register Stripe webhook route BEFORE body parsers
app.post(
    '/api/webhooks/stripe',
    express.raw({ type: 'application/json' }),
    handleStripeWebhook
);

// Increase payload limits for file uploads and large JSON data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24
    },
}));

app.use(cookieParser());

app.use(helmet());

// CSRF protection for state-changing routes
app.use(['/api/campaigns', '/api/donations', '/api/auth/logout', '/api/auth/register'], csurf({ cookie: true }));

// CSRF error handler
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(403).json({ message: 'Invalid CSRF token' });
});

// Debug middleware - handle large requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    if (req.body && Object.keys(req.body).length > 0) {
        console.log('Request body keys:', Object.keys(req.body));
        if (req.files) {
            console.log('Files uploaded:', req.files.length);
        }
    }
    next();
});

// Handle payload size errors
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({
            status: 'error',
            message: 'Request entity too large or invalid JSON format'
        });
    }
    next(err);
});

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

app.use('/api', routes);

// 404 handler for unknown API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ status: 'error', message: 'API route not found' });
});

app.use(errorHandler);

export default app; 
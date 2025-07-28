const { z } = require('zod');

const userSchema = z.object({
    username: z.string().min(1, 'Username is required').max(100, 'Username too long'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .regex(/^(?!.*password).*/, 'Password cannot contain the word "password"')
        .regex(/^(?!.*1234).*/, 'Password cannot contain sequences like "1234"'),
});

const validateUser = (req, res, next) => {
    try {
        userSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(400).json({ errors: error.errors });
    }
};

module.exports = validateUser; 
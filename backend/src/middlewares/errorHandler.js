import { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    // Handle Zod validation errors
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: err.errors && err.errors.length > 0 ? err.errors[0].message : 'Validation error',
            errors: err.errors.map(e => ({
                code: e.code,
                message: e.message,
                path: e.path,
                ...e
            }))
        });
    }
    // Handle other errors
    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        errors: err.errors || undefined,
    });
};
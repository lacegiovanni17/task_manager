import { Request, Response, NextFunction } from 'express';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error occurred:', err.message || err);
    const statusCode = err.statusCode || 500;

    const errorResponse = {
        status: false,
        message: err.message || 'Internal Server Error',
        statusCode: statusCode,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }), // Include stack trace in development
    }

    res.status(statusCode).json(errorResponse);
    next();
};

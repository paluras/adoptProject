import { NextFunction, Response, Request } from "express";

export enum ErrorType {
    VALIDATION = 'VALIDATION',
    DATABASE = 'DATABASE',
    NOT_FOUND = 'NOT_FOUND',
    UNAUTHORIZED = 'UNAUTHORIZED',
    FORBIDDEN = 'FORBIDDEN',
    INTERNAL = 'INTERNAL',
}

export class AppError extends Error {
    constructor(
        public message: string,
        public type: ErrorType,
        public statusCode: number
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class ErrorHandler {
    static createError(message: string, type: ErrorType): AppError {
        const statusCodes: Record<ErrorType, number> = {
            [ErrorType.VALIDATION]: 400,
            [ErrorType.DATABASE]: 500,
            [ErrorType.NOT_FOUND]: 404,
            [ErrorType.UNAUTHORIZED]: 401,
            [ErrorType.FORBIDDEN]: 403,
            [ErrorType.INTERNAL]: 500,
        };

        return new AppError(message, type, statusCodes[type]);
    }

    static handle(err: any, req: Request, res: Response, next: NextFunction) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                status: 'error',
                type: err.type,
                message: err.message,
            });
        }


        console.error('Unexpected error:', err);
        res.status(500).json({
            status: 'error',
            type: ErrorType.INTERNAL,
            message: 'An unexpected error occurred',
        });
    }
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { AnimalModel } from '../models/animalModel';
import { ErrorHandler, ErrorType } from '../utils/ErrorHandler';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!;
const animalModel = new AnimalModel()

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return next(ErrorHandler.createError('Access denied, token missing', ErrorType.UNAUTHORIZED));
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number, is_admin: boolean, };
        (req as any).user = decoded;
        next();
    } catch (error) {
        return next(ErrorHandler.createError('Invalid token, access denied', ErrorType.UNAUTHORIZED));
    }
};

export const verifyOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    const isAdmin = (req as any).user?.is_admin;
    const animalId = req.params.id;

    try {
        const animal = await animalModel.getById(parseInt(animalId, 10));

        if (!animal) {
            return next(ErrorHandler.createError('Animal not found', ErrorType.NOT_FOUND));
        }
        if (isAdmin) {
            console.log("Admin user, skipping ownership check");

            return next();
        } else if (animal.user_id !== userId) {
            return next(ErrorHandler.createError('Forbiden to make changes', ErrorType.FORBIDDEN));
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

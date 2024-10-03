import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as animalModel from '../models/animalModel';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token missing' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: number, is_admin: boolean, };
        console.log(decoded);

        (req as any).user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export const verifyOwnership = async (req: Request, res: Response, next: NextFunction) => {
    const userId = (req as any).user?.id;
    const isAdmin = (req as any).user?.is_admin;
    console.log("is admin", isAdmin);

    const animalId = req.params.id;

    try {

        const animal = await animalModel.getAnimalById(parseInt(animalId, 10));

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }
        if (isAdmin) {
            console.log("Admin user, skipping ownership check");

            return next();
        } else if (animal.user_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to modify this animal' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

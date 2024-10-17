import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../schemas/userSchema';
import { UserModel } from '../models/userModel';
import { ErrorHandler, ErrorType } from '../utils/ErrorHandler';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET!;

export class UserController {
    private userModel: UserModel;

    constructor() {
        this.userModel = new UserModel();
    }

    registerUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const existingUser: User = await this.userModel.findUserByUsername(username);

            const hashedPassword: string = await bcrypt.hash(password, 10);
            const newUser: User = await this.userModel.createUser(username, hashedPassword, false);

            return res.status(201).json({
                message: "Successfully created a new user",
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    isAdmin: newUser.is_admin
                }
            });
        } catch (error) {
            next(error)
        }
    };

    loginUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, password } = req.body;

            const user: User = await this.userModel.findUserByUsername(username);
            const isMatch: boolean = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid credentials , not a macth")

            }

            const token = jwt.sign(
                { id: user.id, is_admin: user.is_admin },
                JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000, // 1 hour
                secure: true,
                sameSite: 'none',
                domain: 'adoptproject.onrender.com'
            });
            return res.status(200).json({
                username: user.username,
                isAdmin: user.is_admin,
                id: user.id
            });
        } catch (error) {
            next(error)
        }
    };

    logoutUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict'
            });
            return res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            next(error)
        }
    }

    getUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { username, isAdmin } = req.body;

            if (!username) {
                throw ErrorHandler.createError(
                    'Username is required',
                    ErrorType.VALIDATION
                );
            }
            console.log(username, isAdmin);


            return res.status(200).json({ username, isAdmin });
        } catch (error) {
            next(error)
        }
    }
}
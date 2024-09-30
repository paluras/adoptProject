import { Request, Response } from 'express';
import dotenv from 'dotenv';
import * as userModel from '../models/userModel';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

dotenv.config();

interface User {
    id: number,
    username: string,
    password: string,
    is_admin: boolean
}

const JWT_SECRET = process.env.JWT_SECRET!;

export const registerUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const existingUser: User = await userModel.findUserByUsername(username);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);
        const newUser: User = await userModel.createUser(username, hashedPassword, false);

        res.status(200).json({ message: "Succesfully created a new user", user: newUser })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong creatign the user", error });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user: User = await userModel.findUserByUsername(username);
        if (!user) {
            return res.status(400).json({ message: "No username, invalid credentials" })
        }
        const isMatch: boolean = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, is_admin: user.is_admin }, JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,

        });
        res.status(200).json({ username });

    } catch (error) {
        res.status(500).json({ message: "womething wrong loggin", error });
    }
};

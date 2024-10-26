import express, { Application } from 'express';
import animalRoutes from './routes/animalRoutes';
import medicalHistoryRoutes from './routes/medicalHistoryRoutes';
import authRoutes from './routes/authRoutes'
import cors from 'cors';
import path from 'path';
import cookieParser from "cookie-parser"
import { ErrorHandler } from './utils/ErrorHandler';
import dotenv from 'dotenv';
import process = require('process');

dotenv.config();
const app: Application = express();

// Middleware
app.use(cookieParser())
app.use(cors({
    origin: process.env.VITE_API_URL,
    credentials: true
}));
app.use(express.json());
// eslint-disable-next-line no-undef
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);

// Errors Handles

app.use(ErrorHandler.handle);


export default app;

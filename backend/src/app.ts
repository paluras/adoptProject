import express, { Application } from 'express';
import { Request, Response } from 'express';
import animalRoutes from './routes/animalRoutes';
import medicalHistoryRoutes from './routes/medicalHistoryRoutes';
import authRoutes from './routes/authRoutes'
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from "cookie-parser"

// import animalRoutes from './routes/animalRoutes';
// import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();


// Middleware
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/animals', animalRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);


export default app;

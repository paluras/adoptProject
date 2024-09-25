import express, { Application } from 'express';
import { Request, Response } from 'express';
import animalRoutes from './routes/animalRoutes';
import medicalHistoryRoutes from './routes/medicalHistoryRoutes';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// import animalRoutes from './routes/animalRoutes';
// import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Application = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/animals', animalRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);


app.get('/', (req: Request, res: Response) => {
    res.send("Welcome")
})

export default app;

import { Response } from "express";

export class ErrorHandler {
    static handleMulterError(res: Response, err: any) {
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'Error uploading file', error: err });
    }

    static handleUnknownError(res: Response, err: any) {
        console.error('Unknown error:', err);
        return res.status(500).json({ message: 'Unknown error occurred', error: err });
    }

    static handleDatabaseError(res: Response, error: any) {
        console.error('Database error:', error);
        return res.status(500).json({ message: 'Error creating the animal', error });
    }

    static handleNoAnimalFound(res: Response, error?: any) {
        console.error('Animal Not Found:', error);
        return res.status(404).json({ message: 'Animal Not Found', error })

    }
}
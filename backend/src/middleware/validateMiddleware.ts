// middlewares/validateMiddleware.ts
import { Request, Response, NextFunction } from 'express';


export function validateAnimalInput(req: Request, res: Response, next: NextFunction) {
    const { name, species, age, breed, status, sex, description } = req.body;
    const errors: string[] = [];

    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
        errors.push('Name must be between 2 and 50 characters');
    }

    // Age validation
    const numAge = Number(age);
    if (isNaN(numAge) || numAge < 0 || numAge > 100) {
        errors.push('Age must be a number between 0 and 100');
    }

    // Species validation
    if (!species || typeof species !== 'string' || species.trim().length < 2) {
        errors.push('Species is required and must be at least 2 characters');
    }

    // Breed validation
    if (!breed || typeof breed !== 'string' || breed.trim().length < 2) {
        errors.push('Breed is required and must be at least 2 characters');
    }

    // Description validation (optional)
    if (description && (typeof description !== 'string' || description.length > 1000)) {
        errors.push('Description must not exceed 1000 characters');
    }

    if (errors.length > 0) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors
        });
    }

    // If validation passes, modify req.body to ensure correct types
    req.body.age = numAge;
    req.body.name = name.trim();
    req.body.species = species.trim();
    req.body.breed = breed.trim();
    if (description) req.body.description = description.trim();

    next();
}
// middlewares/validateMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { ErrorHandler, ErrorType } from '../utils/ErrorHandler';

export const createAnimalValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

    body('species')
        .trim()
        .notEmpty().withMessage('Species is required')
        .isLength({ min: 2, max: 50 }).withMessage('Species must be between 2 and 50 characters'),

    body('age')
        .isInt({ min: 0, max: 100 }).withMessage('Age must be a number between 0 and 100')
        .toInt(), // This converts the value to an integer

    body('breed')
        .trim()
        .notEmpty().withMessage('Breed is required')
        .isLength({ min: 2, max: 50 }).withMessage('Breed must be between 2 and 50 characters'),

    body('description')
        .optional()
        .trim()
        .isLength({ max: 5000 }).withMessage('Description must not exceed 5000 characters'),
]

export const createMedicalHistoryValidation = [
    body('vaccines')
        .trim()
        .notEmpty().withMessage('Vaccines is required')
        .isLength({ min: 2, max: 50 }).withMessage('Vaccines must be between 2 and 50 characters'),

    body('treatments')
        .trim()
        .notEmpty().withMessage('Treatments is required')
        .isLength({ min: 2, max: 50 }).withMessage('Treatments must be between 2 and 50 characters'),

    body('notes')
        .notEmpty().withMessage('Notes is required')
        .isLength({ min: 2, max: 50 }).withMessage('Notes must be between 2 and 50 characters'),

    body('dewormings')
        .trim()
        .notEmpty().withMessage('Dewormings is required')
        .isLength({ min: 2, max: 50 }).withMessage('Species must be between 2 and 50 characters'),

    body('animal_id')
        .notEmpty().withMessage('No animal id found')
]



export const validateAnimal = (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => err.msg).join('\n');

        return next(ErrorHandler.createError(extractedErrors, ErrorType.VALIDATION));
    }
    return next()
}
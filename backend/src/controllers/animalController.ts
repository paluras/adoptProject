import { Request, Response } from "express";
import { AnimalModel } from '../models/animalModel';
import * as medicalRecordModel from '../models/medicalHistoryModel';
import multer from "multer";
import { upload } from "../middleware/imgUpload";

const animalModel = new AnimalModel();

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
}

export class AnimalController {
    async addAnimal(req: Request, res: Response) {
        console.log('Reached addAnimal controller');
        console.log('Cookies: ', req.cookies);
        const userId = (req as any).user.id;

        const { name, species, age, breed, status, sex, description } = req.body;
        const files = req.files as Express.Multer.File[];
        const imageUrls = files ? files.map(file => file.filename) : [];

        try {
            console.log('Animal data:', { name, species, age, breed, status, imageUrls, userId });
            const animal = await animalModel.addAnimal(name, species, age, breed, status, imageUrls, sex, description, userId);
            res.status(201).json(animal);
        } catch (error) {
            return ErrorHandler.handleDatabaseError(res, error);
        }
    }

    // Method for updating an existing animal
    async updateAnimal(req: Request, res: Response) {
        upload(req, res, async (err) => {
            if (err instanceof multer.MulterError) {
                console.error('Multer error:', err);
                return res.status(500).json({ message: 'Error uploading file', error: err });
            } else if (err) {
                console.error('Unknown error during file upload:', err);
                return res.status(500).json({ message: 'Unknown error occurred', error: err });
            }

            const { id } = req.params;
            const { name, species, age, breed, status, sex, description } = req.body;
            const userId = (req as any).user.id;
            const userAdmin = (req as any).user.is_admin;
            console.log(userAdmin);

            const existingAnimal = await animalModel.getById(parseInt(id, 10));
            if (!existingAnimal) {
                return res.status(404).json({ message: 'Animal not found' });
            }

            const files = req.files as Express.Multer.File[];
            const fileUploadExistAndNotEmpty = files && files.length > 0;
            const useExistingFiles = Array.isArray(existingAnimal.image_url) ? existingAnimal.image_url : [existingAnimal.image_url];
            const updatedImageUrl = fileUploadExistAndNotEmpty ? files.map(file => file.filename) : useExistingFiles;

            try {
                console.log('Updating animal data:', {
                    id,
                    name,
                    species,
                    age,
                    breed,
                    status,
                    files,
                });
                const animal = await animalModel.updateAnimal(
                    parseInt(id, 10),
                    name,
                    species,
                    parseInt(age, 10),
                    breed,
                    status,
                    updatedImageUrl,
                    sex,
                    description
                );

                if (!animal) {
                    return res.status(404).json({ message: 'Animal not found' });
                }

                res.status(200).json(animal);
            } catch (error) {
                console.error('Error updating animal in the database:', error);
                res.status(500).json({ message: 'Error updating the animal', error });
            }
        });
    }

    // Method for getting all animals with optional filters
    async getAllAnimals(req: Request, res: Response) {
        try {
            const { species, sex, ageMin, ageMax, breed, status } = req.query;

            const animals = await animalModel.getAll({
                species: species as string | undefined,
                ageMin: ageMin ? parseInt(ageMin as string) : undefined,
                ageMax: ageMax ? parseInt(ageMax as string) : undefined,
                sex: sex as string | undefined,
                breed: breed as string | undefined,
                status: status as string | undefined,
            });

            const animalsWithRecords = await Promise.all(animals.map(async (animal: any) => {
                const records = await medicalRecordModel.getMedicalHistoryByAnimalId(animal.id);
                return { ...animal, medicalRecords: records };
            }));

            res.json(animalsWithRecords);
        } catch (error) {
            res.status(500).json({ message: "error", error });
        }
    }

    // Method for fetching a specific animal by ID
    async getAnimalById(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const animal = await animalModel.getById(parseInt(id, 10));
            res.json(animal);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching the animal by id', error });
        }
    }

    // Method for deleting an animal by ID
    async deleteAnimalById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const animal = await animalModel.getById(parseInt(id, 10));
            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            await animalModel.deleteAnimal(parseInt(id, 10));
            res.status(200).json({ message: 'Successfully deleted', id });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting the animal by id', error });
        }
    }
}

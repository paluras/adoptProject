import { Request, Response } from "express";
import * as animalModel from '../models/animalModel'
import * as medicalRecordModel from '../models/medicalHistoryModel'
import multer from "multer";
import { upload } from "../middleware/imgUpload";

export const addAnimal = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading file', error: err });
        } else if (err) {
            console.error('Unknown error during file upload:', err);
            return res.status(500).json({ message: 'Unknown error occurred', error: err });
        }

        // Retrieve other data from the request body
        const { name, species, age, breed, status } = req.body;

        // Get the image file path if uploaded
        const imageUrl = req.file ? req.file.filename : null;

        try {
            console.log('Animal data:', { name, species, age, breed, status, imageUrl });
            const animal = await animalModel.addAnimal(name, species, age, breed, status, imageUrl!);
            res.status(201).json(animal);
        } catch (error) {
            console.error('Error inserting animal into database:', error);
            res.status(500).json({ message: 'Error creating the animal', error });
        }
    });
};


export const updateAnimal = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading file', error: err });
        } else if (err) {
            console.error('Unknown error during file upload:', err);
            return res.status(500).json({ message: 'Unknown error occurred', error: err });
        }

        const { id } = req.params;
        const { name, species, age, breed, status } = req.body;

        const existingAnimal = await animalModel.getAnimalById(parseInt(id, 10));
        if (!existingAnimal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        const imageUrl = req.file ? req.file.filename : null;
        const updatedImageUrl = imageUrl || existingAnimal.image_url;


        try {
            console.log('Updating animal data:', {
                id,
                name,
                species,
                age,
                breed,
                status,
                imageUrl
            });
            const animal = await animalModel.updateAnimal(parseInt(id, 10),
                name,
                species,
                parseInt(age, 10),
                breed,
                status,
                updatedImageUrl);

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            res.status(200).json(animal);

        } catch (error) {
            console.error('Error updating animal in the database:', error);
            res.status(500).json({ message: 'Error updating the animal', error });
        }
    });
};


export const getAllAnimals = async (req: Request, res: Response) => {
    try {
        const animals = await animalModel.getAllAnimals();
        const animalsWithRecords = await Promise.all(animals.map(async (animal: any) => {
            const records = await medicalRecordModel.getMedicalHistoryByAnimalId(animal.id);
            return { ...animal, medicalRecords: records };
        }));
        res.json(animalsWithRecords);
    } catch (error) {
        res.status(500).json({ message: "error", error });
    }
}

export const getAnimalById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const animal = await animalModel.getAnimalById(parseInt(id, 10))
        res.json(animal)
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the animal by id', error })
    }
}
import { Request, Response } from "express";
import * as animalModel from '../models/animalModel'
import * as medicalRecordModel from '../models/medicalHistoryModel'
import multer from "multer";
import { upload } from "../middleware/imgUpload";

export const addAnimal = async (req: Request, res: Response) => {
    console.log('Reached addAnimal controller');
    console.log('Cookies: ', req.cookies);
    const userId = (req as any).user.id;
    console.log(userId, "USER IDDDDDDDd");

    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            return res.status(500).json({ message: 'Error uploading file', error: err });
        } else if (err) {
            console.error('Unknown error during file upload:', err);
            return res.status(500).json({ message: 'Unknown error occurred', error: err });
        }

        const { name, species, age, breed, status, sex, description } = req.body;

        const files = req.files as Express.Multer.File[];
        const imageUrls = files ? files.map(file => file.filename) : [];

        try {
            console.log('Animal data:', { name, species, age, breed, status, imageUrls, userId });
            const animal = await animalModel.addAnimal(name, species, age, breed, status, imageUrls, sex, description, userId);
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
        const { name, species, age, breed, status, sex, description } = req.body;
        const userId = (req as any).user.id;
        const userAdmin = (req as any).user.is_admin;
        console.log(userAdmin);




        const existingAnimal = await animalModel.getAnimalById(parseInt(id, 10));
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
            const animal = await animalModel.updateAnimal(parseInt(id, 10),
                name,
                species,
                parseInt(age, 10),
                breed,
                status,
                updatedImageUrl,
                sex,
                description);

            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }


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

export const deleteAnimalById = async (req: Request, res: Response) => {
    const { id } = req.params
    const userId = (req as any).user.id;
    try {

        const animal = await animalModel.getAnimalById(parseInt(id, 10));

        if (!animal) {
            return res.status(404).json({ message: 'Animal not found' });
        }

        if (animal.user_id !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this animal' });
        }


        await animalModel.deleteAnimal(parseInt(id, 10))
        res.status(200).json({ message: 'Deleted succesfuly the', id })
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the animal by id', error })

    }
}
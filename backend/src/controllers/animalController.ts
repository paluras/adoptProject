import { Request, Response } from "express";
import { AnimalModel } from '../models/animalModel';
import * as medicalRecordModel from '../models/medicalHistoryModel';
import { ErrorHandler } from "../utils/ErrorHandler";
import { Animal, AnimalInput, AnimalFilters } from "../schemas/animalSchema";

export class AnimalController {
    private animalModel: AnimalModel;

    constructor() {
        this.animalModel = new AnimalModel();

        // this.updateAnimal = this.updateAnimal.bind(this);
        // this.getAllAnimals = this.getAllAnimals.bind(this);
        // this.getAnimalById = this.getAnimalById.bind(this);
        // this.deleteAnimalById = this.deleteAnimalById.bind(this);
        // this.extractAnimalInput = this.extractAnimalInput.bind(this);
        // this.extractFilters = this.extractFilters.bind(this);
    }

    private extractAnimalInput(body: any): AnimalInput {
        return {
            name: body.name,
            species: body.species,
            age: Number(body.age),
            breed: body.breed,
            status: body.status,
            sex: body.sex,
            description: body.description
        };
    }

    private extractFilters(query: any): AnimalFilters {
        const filters: AnimalFilters = {};

        if (query.species) filters.species = query.species;
        if (query.sex) filters.sex = query.sex;
        if (query.breed) filters.breed = query.breed;
        if (query.status) filters.status = query.status;
        if (query.ageMin) filters.ageMin = Number(query.ageMin);
        if (query.ageMax) filters.ageMax = Number(query.ageMax);

        return filters;
    }

    addAnimal = async (req: Request, res: Response) => {
        try {
            const userId: number = (req as any).user.id;
            const animalInput = this.extractAnimalInput(req.body);
            const files = req.files as Express.Multer.File[];
            const imageUrls: string[] = files ? files.map(file => file.filename) : [];

            const animal = await this.animalModel.addAnimal({
                ...animalInput,
                imageUrls,
                userId
            });

            res.status(201).json(animal);
        } catch (error) {
            ErrorHandler.handleDatabaseError(res, error);
        }
    }

    updateAnimal = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const animalInput = this.extractAnimalInput(req.body);

            const existingAnimal = await this.animalModel.getById(id);

            const files = req.files as Express.Multer.File[];
            const newImageUrls = files?.map(file => file.filename);
            const imageUrls = newImageUrls?.length ? newImageUrls : existingAnimal.image_url;

            const updatedAnimal = await this.animalModel.updateAnimal(
                id,
                {
                    ...animalInput,
                    imageUrls
                }
            );
            res.status(200).json(updatedAnimal);
        } catch (error) {

            return ErrorHandler.handleDatabaseError(res, error);
        }
    }

    getAllAnimals = async (req: Request, res: Response) => {
        try {
            const filters = this.extractFilters(req.query);
            const animals = await this.animalModel.getAll(filters);

            const animalsWithRecords = await Promise.all(animals.map(async (animal) => {
                const records = await medicalRecordModel.getMedicalHistoryByAnimalId(animal.id);
                return { ...animal, medicalRecords: records };
            }));

            res.json(animalsWithRecords);
        } catch (error) {
            ErrorHandler.handleDatabaseError(res, error);
        }
    }

    getAnimalById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            const animal = await this.animalModel.getById(id);
            res.json(animal);
        } catch (error) {
            ErrorHandler.handleDatabaseError(res, error);
        }
    }

    deleteAnimalById = async (req: Request, res: Response) => {
        try {
            const id = parseInt(req.params.id, 10);
            await this.animalModel.deleteAnimal(id);
            res.status(200).json({ message: 'Successfully deleted', id });
        } catch (error) {
            ErrorHandler.handleDatabaseError(res, error);
        }
    }
}
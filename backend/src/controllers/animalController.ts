import { Request, Response, NextFunction } from "express";
import { AnimalModel } from '../models/animalModel';
import { AnimalInput, AnimalFilters } from "../schemas/animalSchema";

export class AnimalController {
    private animalModel: AnimalModel;

    constructor() {
        this.animalModel = new AnimalModel();
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

    addAnimal = async (req: Request, res: Response, next: NextFunction) => {
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
            res.status(201).json({ body: animal, message: "Successfully added an animal", });
        } catch (error) {
            next(error)
        }
    }

    updateAnimal = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const existingAnimal = await this.animalModel.getById(id);
            const animalInput = this.extractAnimalInput(req.body);
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
            next(error)

        }
    }

    getAllAnimals = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const filters = this.extractFilters(req.query);
            const animals = await this.animalModel.getAll(filters);
            res.json({ message: "Successfully found the animals", body: animals });
        } catch (error) {
            next(error)
        }
    }

    getAnimalById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            const animal = await this.animalModel.getById(id);
            res.status(200).json({ message: 'Successfully Found the Animal with Id' + id, body: animal });
        } catch (error) {
            next(error)
        }
    }

    deleteAnimalById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = parseInt(req.params.id, 10);
            await this.animalModel.deleteAnimal(id);
            res.status(200).json({ message: 'Successfully deleted', id });
        } catch (error) {
            next(error)
        }
    }
}
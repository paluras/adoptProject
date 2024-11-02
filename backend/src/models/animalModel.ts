/* eslint-disable no-undef */
/* eslint-disable no-console */
import pool from "../db";
import { Animal, AnimalFilters, AnimalInput } from "../schemas/animalSchema";
import { ErrorHandler, ErrorType } from "../utils/ErrorHandler";


export class AnimalModel {

    ANIMAL_NOT_FOUND_ERROR = 'Animal not found';

    // Maybe turn this into a utilityClass
    // Helper method to validate the input
    validateAnimalInput(input: AnimalInput): void {
        const errors: string[] = [];

        this.validateName(input.name, errors);
        this.validateSpecies(input.species, errors);
        this.validateAge(input.age, errors);
        this.validateBreed(input.breed, errors);
        this.validateSex(input.sex, errors);
        this.validateStatus(input.status, errors);

        if (errors.length > 0) {
            throw ErrorHandler.createError(errors.join(', '), ErrorType.VALIDATION);
        }
    }

    private validateName(name: string, errors: string[]): void {
        if (!name || typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 50) {
            errors.push('Name must be between 2 and 50 characters');
        }
    }

    private validateSpecies(species: string, errors: string[]): void {
        if (!species || typeof species !== 'string' || species.trim().length < 2) {
            errors.push('Species is required and must be at least 2 characters');
        }
    }

    private validateAge(age: number, errors: string[]): void {
        if (typeof age !== 'number' || age < 0 || age > 100) {
            errors.push('Age must be a number between 0 and 100');
        }
    }

    private validateBreed(breed: string, errors: string[]): void {
        if (!breed || typeof breed !== 'string' || breed.trim().length < 2) {
            errors.push('Breed is required and must be at least 2 characters');
        }
    }

    private validateSex(sex: string, errors: string[]): void {
        if (!['Mascul', 'Femela'].includes(sex)) {
            errors.push('Sex must be either "male" or "female"');
        }
    }

    private validateStatus(status: string, errors: string[]): void {
        if (!['Valabil', 'Adoptat'].includes(status)) {
            errors.push('Status must be "available", "adopted", or "pending"');
        }
    }

    async getAll(filters: AnimalFilters = {}): Promise<Animal[]> {
        try {
            const { query, values } = this.buildQuery(filters);
            const result = await pool.query(query, values);
            return result.rows;
        } catch {
            throw ErrorHandler.createError('Failed to fetch animals', ErrorType.DATABASE);
        }
    }

    private buildQuery(filters: AnimalFilters): { query: string, values: (string | number)[] } {
        let query = `SELECT * FROM animals WHERE 1=1`;
        const values: (string | number)[] = [];
        let index = 1;

        if (filters.species) {
            query += ` AND species = $${index}`;
            values.push(filters.species);
            index++;
        }
        if (filters.sex) {
            query += ` AND sex = $${index}`;
            values.push(filters.sex);
            index++;
        }
        if (filters.ageMin !== undefined) {
            query += ` AND age >= $${index}`;
            values.push(filters.ageMin);
            index++;
        }
        if (filters.ageMax !== undefined) {
            query += ` AND age <= $${index}`;
            values.push(filters.ageMax);
            index++;
        }
        if (filters.breed) {
            query += ` AND breed = $${index}`;
            values.push(filters.breed);
            index++;
        }
        if (filters.status) {
            query += ` AND status = $${index}`;
            values.push(filters.status);
            index++;
        }
        if (filters.city) {
            query += ` AND city = $${index}`;
            values.push(filters.city);
            index++;
        }
        if (filters.country) {
            query += ` AND country = $${index}`;
            values.push(filters.country);
            index++;
        }

        return { query, values };
    }

    async getById(id: number): Promise<Animal> {

        try {
            const result = await pool.query(`SELECT * from animals WHERE id = $1`, [id]);
            if (result.rows.length === 0) {
                throw ErrorHandler.createError(this.ANIMAL_NOT_FOUND_ERROR, ErrorType.NOT_FOUND);
            }
            return result.rows[0];
        } catch {
            throw ErrorHandler.createError('Error fetching animal by id', ErrorType.DATABASE);
        }
    }

    async addAnimal(input: AnimalInput): Promise<Animal> {
        this.validateAnimalInput(input);
        console.log(input);


        const result = await pool.query(
            `INSERT INTO animals (name, species, age, breed, status, image_url, sex, description, user_id, country, city, weight)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
             RETURNING *`,
            [
                input.name, input.species, input.age, input.breed,
                input.status, input.imageUrls, input.sex,
                input.description, input.userId, input.country, input.city, input.weight
            ]
        );
        return result.rows[0];
    }

    async updateAnimal(id: number, input: AnimalInput): Promise<Animal> {
        try {
            this.validateAnimalInput(input);

            const result = await pool.query(
                `UPDATE animals SET name = $1, species = $2, age = $3, breed = $4, status = $5, image_url = $6, sex = $7, description = $8, country = $9, city = $10, weight = $11
                 WHERE id = $12 RETURNING *`,
                [input.name, input.species, input.age, input.breed, input.status, input.imageUrls, input.sex, input.description, input.country, input.city, input.weight, id]
            );

            if (result.rows.length === 0) {
                throw ErrorHandler.createError(this.ANIMAL_NOT_FOUND_ERROR, ErrorType.NOT_FOUND);
            }
            return result.rows[0];

        } catch {
            throw ErrorHandler.createError('Failed to update animal', ErrorType.DATABASE);
        }
    }

    async deleteAnimal(id: number): Promise<string> {
        try {
            const result = await pool.query('DELETE FROM animals WHERE id = $1', [id]);

            if (result.rowCount === 0) {
                throw ErrorHandler.createError(this.ANIMAL_NOT_FOUND_ERROR, ErrorType.NOT_FOUND);
            }

            return "Successfully deleted";
        } catch {
            throw ErrorHandler.createError('Failed to delete animal', ErrorType.DATABASE);
        }
    }
}

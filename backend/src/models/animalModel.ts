import pool from "../db";
import { Animal, AnimalFilters, AnimalInput } from "../schemas/animalSchema";
import { ErrorHandler, ErrorType } from "../utils/ErrorHandler";

export class AnimalModel {
    // Maybe turn this into a utilityClass
    // Helper method to validate the input
    validateAnimalInput(input: AnimalInput): void {
        const errors: string[] = [];


        // Name validation
        if (!input.name || typeof input.name !== 'string' || input.name.trim().length < 2 || input.name.trim().length > 50) {
            errors.push('Name must be between 2 and 50 characters');
        }

        // Species validation
        if (!input.species || typeof input.species !== 'string' || input.species.trim().length < 2) {
            errors.push('Species is required and must be at least 2 characters');
        }

        // Age validation
        if (typeof input.age !== 'number' || input.age < 0 || input.age > 100) {

            errors.push('Age must be a number between 0 and 100');
        }

        // Breed validation
        if (!input.breed || typeof input.breed !== 'string' || input.breed.trim().length < 2) {
            errors.push('Breed is required and must be at least 2 characters');
        }

        // // Sex validation
        if (!['Mascul', 'Femela'].includes(input.sex)) {
            errors.push('Sex must be either "male" or "female"');
        }

        // // Status validation
        if (!['Valabil', 'Adoptat'].includes(input.status)) {
            errors.push('Status must be "available", "adopted", or "pending"');
        }

        // If validation fails, throw an error
        if (errors.length > 0) {

            throw ErrorHandler.createError(errors.join(', '), ErrorType.VALIDATION);
        }
    }

    async getAll(filters: AnimalFilters = {}): Promise<Animal[]> {
        try {
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

            const result = await pool.query(query, values);
            return result.rows;

        } catch {
            throw ErrorHandler.createError('Failed to fetch animals', ErrorType.DATABASE);
        }
    }

    async getById(id: number): Promise<Animal> {
        try {
            const result = await pool.query(`SELECT * from animals WHERE id = $1`, [id]);
            if (result.rows.length === 0) {
                throw ErrorHandler.createError("Animal Not found by id", ErrorType.NOT_FOUND);
            }
            return result.rows[0];
        } catch {
            throw ErrorHandler.createError('Error fetching animal by id', ErrorType.DATABASE);
        }
    }

    async addAnimal(input: AnimalInput): Promise<Animal> {
        this.validateAnimalInput(input);

        const result = await pool.query(
            `INSERT INTO animals (name, species, age, breed, status, image_url, sex, description, user_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             RETURNING *`,
            [
                input.name, input.species, input.age, input.breed,
                input.status, input.imageUrls, input.sex,
                input.description, input.userId
            ]
        );
        return result.rows[0];
    }

    async updateAnimal(id: number, input: AnimalInput): Promise<Animal> {
        try {
            this.validateAnimalInput(input);

            const result = await pool.query(
                `UPDATE animals SET name = $1, species = $2, age = $3, breed = $4, status = $5, image_url = $6, sex = $7, description = $8
                 WHERE id = $9 RETURNING *`,
                [input.name, input.species, input.age, input.breed, input.status, input.imageUrls, input.sex, input.description, id]
            );

            if (result.rows.length === 0) {
                throw ErrorHandler.createError("Animal Not found by id", ErrorType.NOT_FOUND);
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
                throw ErrorHandler.createError("Animal Not found by id", ErrorType.NOT_FOUND);
            }

            return "Successfully deleted";
        } catch {
            throw ErrorHandler.createError('Failed to delete animal', ErrorType.DATABASE);
        }
    }
}

import pool from "../db";
import { Animal, AnimalFilters, AnimalInput } from "../schemas/animalSchema";
import { ErrorHandler, ErrorType } from "../utils/ErrorHandler";

export class AnimalModel {

    async getAll(filters: AnimalFilters = {}): Promise<Animal[]> {
        try {
            let query = `SELECT * FROM animals WHERE 1=1`;
            const values: any[] = [];
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

        } catch (err) {
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
        } catch (err) {
            throw ErrorHandler.createError('Error fetching animal by id', ErrorType.DATABASE);
        }
    }

    async addAnimal(input: AnimalInput): Promise<Animal> {
        try {
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
        } catch (err) {
            throw ErrorHandler.createError('Failed to add new animal', ErrorType.DATABASE);
        }
    }

    async updateAnimal(id: number, input: AnimalInput): Promise<Animal> {

        try {
            const result = await pool.query(
                `UPDATE animals SET name = $1, species = $2, age = $3, breed = $4, status = $5, image_url = $6, sex = $7, description = $8
                 WHERE id = $9 RETURNING *`,
                [input.name, input.species, input.age, input.breed, input.status, input.imageUrls, input.sex, input.description, id]
            );

            if (result.rows.length === 0) {
                throw ErrorHandler.createError("Animal Not found by id", ErrorType.NOT_FOUND);
            }
            return result.rows[0];

        } catch (err) {
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
        } catch (err) {
            throw ErrorHandler.createError('Failed to delete animal', ErrorType.DATABASE);
        }
    }
}

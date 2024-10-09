import pool from "../db";
import { Animal, AnimalFilters, AnimalInput } from "../schemas/animalSchema";

export class AnimalModel {

    async getAll(filters: AnimalFilters = {}): Promise<Animal[]> {
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
    }

    async getById(id: number): Promise<Animal> {
        const result = await pool.query(`SELECT * from animals WHERE id = $1`, [id]);
        if (result.rows.length === 0) {
            throw new Error("Animal not found");
        }
        return result.rows[0];
    }

    async addAnimal(input: AnimalInput): Promise<Animal> {

        if (isNaN(input.age)) {
            throw new Error("Age is not a number");
        }
        if (input.age < 0) {
            throw new Error("Age must be a positive number");
        }

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

        if (isNaN(input.age)) {
            throw new Error("Age is not a number");
        }
        if (input.age < 0) {
            throw new Error("Age must be a positive number");
        }

        const result = await pool.query(
            `UPDATE animals SET name = $1, species = $2, age = $3, breed = $4, status = $5, image_url = $6, sex = $7, description = $8
            WHERE id = $9 RETURNING *`,
            [input.name, input.species, input.age, input.breed, input.status, input.imageUrls, input.sex, input.description, id]
        );
        return result.rows[0];
    }

    async deleteAnimal(id: number): Promise<string> {
        await pool.query('DELETE FROM animals WHERE id = $1', [id]);
        return "Successfully deleted";
    }
}

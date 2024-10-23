import pool from '../../db';
import { MedicalHistoryModel } from '../../models/medicalHistoryModel';
import { MedicalHistoryInput } from '../../schemas/medicalHistorySchema';
import { describe, it, expect, beforeEach, afterEach, afterAll } from '@jest/globals';


const medicalHistory = new MedicalHistoryModel();

const createTestUser = async (): Promise<number> => {
    const { rows } = await pool.query(`INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id`, ['testuser', 'hashedpassword', false]);
    return rows[0].id;
};

const createTestAnimal = async (userId: number): Promise<number> => {
    const { rows } = await pool.query(`INSERT INTO animals (name, species, age, breed, status, image_url, sex, description, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`, ['Luna', 'Cat', 2, 'Siamese', 'Available', ['url1', 'url2'], 'Female', 'Friendly cat', userId]);
    return rows[0].id;
};

const medicalHistoryInput = (animalId: number): MedicalHistoryInput => (
    {
        animal_id: animalId,
        vaccines: 'Parvoviroza',
        dewormings: 'Da',
        treatments: 'Obez',
        notes: 'Sanatos'
    }
)

describe("Medical History Model", () => {
    beforeEach(async () => {
        await pool.query(`
            BEGIN;

            TRUNCATE TABLE medical_history CASCADE;
            TRUNCATE TABLE animals CASCADE;
            TRUNCATE TABLE users CASCADE;

            ALTER SEQUENCE medical_history_id_seq RESTART WITH 1;
            ALTER SEQUENCE animals_id_seq RESTART WITH 1;
            ALTER SEQUENCE users_id_seq RESTART WITH 1;

            COMMIT;
        `);
    });

    afterEach(async () => {
        await pool.query(`ROLLBACK;`); // Rollback transaction to ensure data isolation between tests
    });

    afterAll(async () => {
        await pool.end(); // Close the pool after all tests to avoid open handles
    });

    it('should add and get medical history', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);


        const medicalHistoryResult = await medicalHistory.addMedicalHistory(medicalHistoryInput(animalId));

        expect(medicalHistoryResult).toBeDefined();

    });

    it('should update medical history', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);
        const medicalHistoryResult = await medicalHistory.addMedicalHistory(medicalHistoryInput(animalId));

        expect(medicalHistoryResult).toBeDefined();


    })

    it('should get medical history by id', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);
        const medicalHistoryResult = await medicalHistory.addMedicalHistory(medicalHistoryInput(animalId));

        expect(medicalHistoryResult).toBeDefined();

        const getMedicalById = await medicalHistory.getMedicalHistoryByAnimalId(animalId)

        expect(getMedicalById).toStrictEqual(medicalHistoryResult);

    })
});

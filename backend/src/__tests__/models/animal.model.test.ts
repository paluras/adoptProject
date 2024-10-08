import pool from '../../db'; // Make sure this is connected to the test DB
import { addAnimal, deleteAnimal, getAllAnimals, getAnimalById, updateAnimal } from '../../models/animalModel';

const createTestUser = async (): Promise<number> => {
    const { rows } = await pool.query(`INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id`, ['testuser', 'hashedpassword', false]);
    return rows[0].id;
};

const createTestAnimal = async (userId: number): Promise<number> => {
    const { rows } = await pool.query(`INSERT INTO animals (name, species, age, breed, status, image_url, sex, description, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`, ['Luna', 'Cat', 2, 'Siamese', 'Available', ['url1', 'url2'], 'Female', 'Friendly cat', userId]);
    return rows[0].id;
};

describe('Animal Model', () => {
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

    afterAll(async () => {
        await pool.end(); // Close the pool after all tests
    });

    it('should get all animals', async () => {
        const userId = await createTestUser();
        await createTestAnimal(userId);

        const animals = await getAllAnimals();
        expect(animals.length).toBe(1);
        expect(animals[0].name).toBe('Luna');
    });
    it('should get animal with species = cat', async () => {
        const userId = await createTestUser();
        await createTestAnimal(userId);

        const animals = await getAllAnimals({ species: "Cat" });
        const animals2 = await getAllAnimals({ species: "Dog" });

        expect(animals.length).toBe(1);
        expect(animals2.length).toBe(0);

    })

    it('should get an animal by id', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);

        const animal = await getAnimalById(animalId);
        expect(animal).toBeDefined();
        expect(animal.name).toBe('Luna');
    });

    it('should throw an error for non-existent animal id', async () => {
        await expect(getAnimalById(99999)).rejects.toThrow('Animal not found');
    });
    it('should insert a valid animal', async () => {
        const userId = await createTestUser();
        const createAnimal = await addAnimal(
            'Test1',
            'Cat',
            2,
            'Siamese',
            'Available',
            ['url1', 'url2'],
            'Female',
            'Friendly cat',
            userId)


        expect(createAnimal).toBeDefined;
        expect(createAnimal.name).toBe('Test1');
    });
    it("should not insert a invalid animal - negative age", async () => {
        const userId = await createTestUser();

        await expect(addAnimal(
            '12',
            'Cat',
            -1,
            'Siamese',
            'Available',
            ['url1', 'url2'],
            'Female',
            'Friendly cat',
            userId)).rejects.toThrow("Age must be a positive number")
    })


    it("should update a animal", async () => {
        const userId = await createTestUser();
        const createAnimal = await addAnimal(
            'Test1',
            'Cat',
            2,
            'Siamese',
            'Available',
            ['url1', 'url2'],
            'Female',
            'Friendly cat',
            userId)

        expect(createAnimal.name).toBe('Test1')

        const updatedAnimal = await updateAnimal(
            createAnimal.id,
            'Nona',
            'Dog',
            5,
            'Siamese',
            'Available',
            ['url1', 'url2'],
            'Mascul',
            'Friendly cat',

        )

        expect(updatedAnimal.name).toBe('Nona')
        expect(updatedAnimal == createAnimal).toBeFalsy
    })

    it('should delete a animal', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);
        const deletedReturnValue = await deleteAnimal(animalId)

        expect(deletedReturnValue).toBe("Successfully deleted")
    })


});

/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
/* eslint-disable sonarjs/no-duplicate-string */
import pool from '../../db'; // Make sure this is connected to the test DB
import { AnimalModel } from '../../models/animalModel';
import { AnimalInput } from '../../schemas/animalSchema';

const animalModel = new AnimalModel();

const createTestUser = async (): Promise<number> => {
    const { rows } = await pool.query(`INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING id`, ['testuser', 'hashedpassword', false]);
    return rows[0].id;
};

const testAnimalInput = (userId: number): AnimalInput => ({
    name: 'Luna',
    species: 'Cat',
    age: 2,
    breed: 'Siamese',
    status: 'Valabil',
    imageUrls: ['url1', 'url2'],
    sex: 'Femela',
    description: 'Friendly cat',
    userId,
    country: '',
    city: '',
    weight: 0
});

const createTestAnimal = async (userId: number): Promise<number> => {
    const animal = await animalModel.addAnimal(testAnimalInput(userId));
    return animal.id;
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

        const animals = await animalModel.getAll();
        expect(animals.length).toBe(1);
        expect(animals[0].name).toBe('Luna');
    });
    it('should get animal with species = cat', async () => {
        const userId = await createTestUser();
        await createTestAnimal(userId);

        const animals = await animalModel.getAll({ species: "Cat" });
        const animals2 = await animalModel.getAll({ species: "Dog" });

        expect(animals.length).toBe(1);
        expect(animals2.length).toBe(0);

    })

    it('should get an animal by id', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);

        const animal = await animalModel.getById(animalId);
        expect(animal).toBeDefined();
        expect(animal.name).toBe('Luna');
    });

    it('should throw an error for non-existent animal id', async () => {
        await expect(animalModel.getById(99999)).rejects.toThrow('Error fetching animal by id');
    });
    it('should insert a valid animal', async () => {
        const userId = await createTestUser();

        const animalInput: AnimalInput = {
            name: 'Test1',
            species: 'Cat',
            age: 2,
            breed: 'Siamese',
            status: 'Valabil',
            imageUrls: ['url1', 'url2'],
            sex: 'Femela',
            description: 'Friendly cat',
            userId,
            country: '',
            city: '',
            weight: 0
        };
        const createAnimal = await animalModel.addAnimal(animalInput)


        expect(createAnimal).toBeDefined();
        expect(createAnimal.name).toBe('Test1');
    });
    it("should not insert a invalid animal - negative age", async () => {
        const userId = await createTestUser();
        const animalInput: AnimalInput = {
            name: 'Test1',
            species: 'Cat',
            age: -2,
            breed: 'Siamese',
            status: 'Valabil',
            imageUrls: ['url1', 'url2'],
            sex: 'Femela',
            description: 'Friendly cat',
            userId,
            country: '',
            city: '',
            weight: 0
        };

        await expect(animalModel.addAnimal(animalInput))
            .rejects.toThrow("Age must be a number between 0 and 100")
    })


    it("should update a animal", async () => {
        const userId = await createTestUser();

        const originalAnimal = await animalModel.addAnimal(testAnimalInput(userId));


        expect(originalAnimal.name).toBe('Luna')

        const updateInput: AnimalInput = {
            name: 'Nona',
            species: 'Dog',
            age: 5,
            breed: 'Siamese',
            status: 'Valabil',
            imageUrls: ['url1', 'url2'],
            sex: 'Mascul',
            description: 'Friendly cat',
            country: '',
            city: '',
            weight: 0
        };

        const updatedAnimal = await animalModel.
            updateAnimal(originalAnimal.id, updateInput);


        expect(updatedAnimal.name).toBe('Nona')
        expect(updatedAnimal == originalAnimal).toBeFalsy()
    })

    it('should delete a animal', async () => {
        const userId = await createTestUser();
        const animalId = await createTestAnimal(userId);
        const deletedReturnValue = await animalModel.deleteAnimal(animalId)

        expect(deletedReturnValue).toBe("Successfully deleted")
    })


});

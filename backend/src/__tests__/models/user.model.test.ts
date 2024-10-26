
import pool from '../../db';
import { describe, it, expect, beforeEach, afterEach, afterAll } from '@jest/globals';


import { UserModel } from '../../models/userModel';

const user = new UserModel();

describe("User Model", () => {
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

    it('should register a user', async () => {

        const registeredUser = await user.createUser('user1', 'password', false)

        expect(registeredUser).toBeDefined();
        expect(registeredUser.username).toBe('user1')
    })

    it('should get the correct user', async () => {
        const registeredUser = await user.createUser('user1', 'password', false);

        expect(registeredUser).toBeDefined();
        expect(registeredUser.username).toBe('user1')

        const getUser = await user.findUserByUsername('user1');
        expect(getUser.username).toBe('user1')

    })


});
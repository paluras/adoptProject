import pool from "../db";
import { User } from "../schemas/userSchema";

export class UserModel {

    findUserByUsername = async (username: string): Promise<User> => {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])

        return result.rows[0];
    }

    createUser = async (
        username: string,
        password: string,
        isAdmin: boolean): Promise<User> => {
        const result = await pool.query(`
             INSERT INTO users (username, password, is_admin)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [username, password, isAdmin]
        )

        return result.rows[0];
    }
}

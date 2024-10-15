import pool from "../db";
import { User } from "../schemas/userSchema";

export class UserModel {

    findUserByUsername = async (username: string): Promise<User | null> => {
        const result = await pool.query('SELECT * FROM usersasd WHERE username = $1', [username])

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
        console.log(result.rows[0]);

        return result.rows[0];
    }
}

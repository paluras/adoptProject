import pool from "../db";

export const findUserByUsername = async (username: string) => {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    return result.rows[0];
}

export const createUser = async (username: string, password: string, isAdmin: boolean) => {
    const result = await pool.query('INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *',
        [username, password, isAdmin]
    )
    return result.rows[0];
}
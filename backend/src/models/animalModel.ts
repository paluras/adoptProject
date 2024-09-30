import pool from "../db"

export const getAllAnimals = async () => {
    const result = await pool.query(`SELECT * FROM animals`);
    return result.rows
}

export const getAnimalById = async (id: number) => {
    const result = await pool.query(`SELECT * from animals WHERE id = $1`, [id]);
    return result.rows[0];
};

export const addAnimal = async (name: string,
    species: string,
    age: number,
    breed: string,
    status: string,
    imageUrls: string[],
    sex: string,
    description: string,
    userId: number
) => {
    const result = await pool.query(
        'INSERT INTO animals (name, species, age, breed, status, image_url, sex, description, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
        [name, species, age, breed, status, imageUrls, sex, description, userId]
    );
    return result.rows[0];
};

export const updateAnimal = async (id: number,
    name: string,
    species: string,
    age: number,
    breed: string,
    status: string,
    imageUrls: string[],
    sex: string,
    description: string
) => {
    const result = await pool.query(
        'UPDATE animals SET name = $1, species = $2, age = $3, breed = $4, status = $5, image_url = $6,sex = $7, description = $8  WHERE id = $9 RETURNING *',
        [name, species, age, breed, status, imageUrls, sex, description, id]
    );
    return result.rows[0];
};

export const deleteAnimal = async (id: number) => {
    const result = await pool.query(
        'DELETE FROM animals WHERE id = $1', [id]
    )
    return result.rows[0]
}

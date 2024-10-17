import { Pool } from 'pg';
import dotenv from 'dotenv';


dotenv.config(); // This loads .env by default


const pool = new Pool({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string, 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.DB_NAME_TEST : process.env.DB_NAME,
});

export default pool;

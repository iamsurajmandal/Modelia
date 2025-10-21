import pool from '../db/db';
import { signupSchema } from '../models/authSchema';
import { z } from 'zod';

type SignupData = z.infer<typeof signupSchema>;

export const createUser = async (userData: SignupData) => {
    const { email, password } = userData;
    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, password]
    );
    return result.rows[0];
};

export const findUserByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

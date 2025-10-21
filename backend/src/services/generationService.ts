import pool from '../db/db';
import { createGenerationSchema } from '../models/generationSchema';
import { z } from 'zod';

type CreateGenerationData = z.infer<typeof createGenerationSchema>;

export const createGenerationInDb = async (
    userId: number,
    data: CreateGenerationData,
    imageUrl: string,
) => {
    const { prompt, style } = data;
    const result = await pool.query(
        'INSERT INTO generations ("userId", prompt, style, "imageUrl", status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, prompt, style, imageUrl, 'completed']
    );
    return result.rows[0];
};

export const getGenerationsByUserId = async (userId: number, limit: number) => {
    const result = await pool.query(
        'SELECT * FROM generations WHERE "userId" = $1 ORDER BY "createdAt" DESC LIMIT $2',
        [userId, limit]
    );
    return result.rows;
};

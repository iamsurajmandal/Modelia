import { Request, Response } from 'express';
import { createGenerationInDb, getGenerationsByUserId } from '../services/generationService';

export const createGeneration = async (req: Request, res: Response) => {
    try {
        const { prompt, style } = req.body;
        const userId = (req as any).user.userId;
        const imageUrl = `/uploads/${(req.file as any).filename}`;

        const generation = await createGenerationInDb(
            userId,
            { prompt, style },
            imageUrl
        );
        res.status(201).json(generation);
    } catch (error) {
        res.status(400).json({ message: 'Invalid input' });
    }
};

export const getGenerations = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const limit = parseInt(req.query.limit as string) || 10;
        const generations = await getGenerationsByUserId(userId, limit);
        res.status(200).json(generations);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching generations' });
    }
};

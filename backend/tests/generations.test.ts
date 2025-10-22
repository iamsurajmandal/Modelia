import request from 'supertest';
import express from 'express';
import generationsRouter from '../src/routes/generations';
import * as generationService from '../src/services/generationService';
import { authMiddleware } from '../src/middlewares/authMiddleware';

jest.mock('../src/services/generationService');
jest.mock('../src/middlewares/authMiddleware', () => ({
    authMiddleware: jest.fn((req, res, next) => {
        (req as any).user = { userId: 1 };
        next();
    }),
}));

global.Math.random = () => 0.5;

const app = express();
app.use(express.json());
app.use('/generations', generationsRouter);

describe('Generations Routes', () => {
    describe('POST /generations', () => {
        it('should create a new generation', async () => {
            (generationService.createGenerationInDb as jest.Mock).mockResolvedValue({ id: 1 });

            const res = await request(app)
                .post('/generations')
                .field('prompt', 'a test prompt')
                .field('style', 'test-style')
                .attach('imageUpload', Buffer.from('test'), 'test.jpg');

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('id');
        });

    });

    describe('GET /generations', () => {
        it('should return a list of generations', async () => {
            (generationService.getGenerationsByUserId as jest.Mock).mockResolvedValue([{ id: 1 }]);

            const res = await request(app).get('/generations');

            expect(res.status).toBe(200);
            expect(res.body).toBeInstanceOf(Array);
        });
    });
});

import request from 'supertest';
import express from 'express';
import authRouter from '../src/routes/auth';
import * as userService from '../src/services/userService';

jest.mock('../src/services/userService');

const app = express();
app.use(express.json());
app.use('/auth', authRouter);

describe('Auth Routes', () => {
    describe('POST /auth/signup', () => {
        it('should create a new user and return a token', async () => {
            (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);
            (userService.createUser as jest.Mock).mockResolvedValue({ id: 1 });

            const res = await request(app)
                .post('/auth/signup')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 409 if user already exists', async () => {
            (userService.findUserByEmail as jest.Mock).mockResolvedValue({ id: 1 });

            const res = await request(app)
                .post('/auth/signup')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(409);
            expect(res.body).toEqual({ message: 'User already exists' });
        });
    });

    describe('POST /auth/login', () => {
        it('should login a user and return a token', async () => {
            (userService.findUserByEmail as jest.Mock).mockResolvedValue({ id: 1, password: '$2b$10$veryhashedpassword' });
            const bcrypt = require('bcrypt');
            bcrypt.compare = jest.fn().mockResolvedValue(true);

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
        });

        it('should return 401 for invalid credentials', async () => {
            (userService.findUserByEmail as jest.Mock).mockResolvedValue(null);

            const res = await request(app)
                .post('/auth/login')
                .send({ email: 'test@example.com', password: 'password123' });

            expect(res.status).toBe(401);
            expect(res.body).toEqual({ message: 'Invalid credentials' });
        });
    });
});

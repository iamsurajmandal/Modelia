import { Request, Response } from 'express';
import { signupSchema, loginSchema } from '../models/authSchema';
import { createUser, findUserByEmail } from '../services/userService';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwt';

export const signup = async (req: Request, res: Response) => {
    try {
        const { email, password } = signupSchema.parse(req.body);

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({ email, password: hashedPassword });

        const token = generateToken({ userId: user.id });
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Invalid input' });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = loginSchema.parse(req.body);

        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken({ userId: user.id });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ message: 'Invalid input' });
    }
};

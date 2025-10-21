import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
import generationsRouter from './routes/generations';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/auth', authRouter);
app.use('/generations', generationsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

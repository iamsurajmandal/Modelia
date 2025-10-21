import { Router } from 'express';
import { createGeneration, getGenerations } from '../controllers/generationsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createGeneration);
router.get('/', authMiddleware, getGenerations);

export default router;

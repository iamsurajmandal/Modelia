import { Router } from 'express';
import { createGeneration, getGenerations } from '../controllers/generationsController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

import upload from '../middlewares/uploadMiddleware';

router.post('/', authMiddleware, upload.single('imageUpload'), createGeneration);
router.get('/', authMiddleware, getGenerations);

export default router;

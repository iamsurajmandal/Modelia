import { z } from 'zod';

export const createGenerationSchema = z.object({
    prompt: z.string(),
    style: z.string(),
});

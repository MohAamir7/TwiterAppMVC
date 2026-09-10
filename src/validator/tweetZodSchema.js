import {z} from 'zod';

export const zodSchema = z.object({
    body: z.string().min(1).max(300)
})
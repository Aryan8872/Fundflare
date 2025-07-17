import { z } from 'zod';

export const createCampaignSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    goalAmount: z.number().positive(),
    duration: z.number().int().positive(), // in days
    category: z.string().min(1),
    coverImage: z.string().optional(),
});

export const updateCampaignSchema = createCampaignSchema.partial(); 
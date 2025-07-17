import { z } from 'zod';

export const donationSchema = z.object({
    campaignId: z.string().uuid(),
    amount: z.number().positive(),
    type: z.enum(['ONE_TIME', 'RECURRING'])
}); 
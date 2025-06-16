import { z } from 'zod';

export const historyQuerySchema = z.object({
  days: z.coerce
    .number()
    .min(1)
    .max(30)
    .default(7)
    .describe('Number of days of history to fetch (1-30 days)'),
});

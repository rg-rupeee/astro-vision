import { z } from 'zod';

export const historyQuerySchema = z.object({
  days: z
    .number()
    .min(1)
    .max(30)
    .default(7)
    .describe('Number of days of history to fetch (1-30 days)'),
});

export const todayQuerySchema = z.object({});

export const schemas = {
  '/history': {
    get: {
      query: historyQuerySchema,
    },
  },
  '/today': {
    get: {
      query: todayQuerySchema,
    },
  },
};

import { z } from 'zod';

export const CreateGameSchema = z
  .object({
    title: z.string().min(2),
    description: z.string().min(10),
    genre: z.string(),
    platform: z.string(),
    releaseDate: z.string().datetime(),
    price: z.number().positive(),
  })
  .strict();

export const UpdateGameSchema = CreateGameSchema.partial();

export const GameIdParamSchema = z
  .object({
    gameId: z.string().uuid(),
  })
  .strict();

export const GameQuerySchema = z
  .object({
    genre: z.string().optional(),
    platform: z.string().optional(),
    minPrice: z.number().optional(),
    maxPrice: z.number().optional(),
    sortBy: z.enum(['title', 'releaseDate', 'price']).optional(),
    order: z.enum(['asc', 'desc']).optional(),
    page: z.number().int().positive().optional(),
    limit: z.number().int().positive().optional(),
  })
  .strict();

export type CreateGameDTO = z.infer<typeof CreateGameSchema>;
export type UpdateGameDTO = z.infer<typeof UpdateGameSchema>;
export type GameIdParamDTO = z.infer<typeof GameIdParamSchema>;
export type GameQueryDTO = z.infer<typeof GameQuerySchema>;

import { z } from 'zod';
import { objectIdSchema } from '@util/validation';
import { Types } from 'mongoose';

// Path parameter schemas
export const CityIdSchema = z.object({
  id: objectIdSchema,
});

export const ClueIdSchema = z.object({
  id: objectIdSchema,
});

// Request body schemas
export const CreateCitySchema = z.object({
  name: z.string().min(1),
  country: z.string().min(1),
  continent: z.string().min(1),
  funFact: z.array(z.string()),
  trivia: z.array(z.string()),
});

export const UpdateCitySchema = CreateCitySchema.partial();

export const CreateClueSchema = z.object({
  city: objectIdSchema,
  clue: z.string().min(1),
  difficulty: z.number().min(1).max(10),
  options: z.array(z.string()),
});

export const UpdateClueSchema = z
  .object({
    clue: z.string().min(1),
    difficulty: z.number().min(1).max(10),
    options: z.array(z.string()),
  })
  .partial();

export const RandomCitiesSchema = z.object({
  count: z
    .string()
    .transform(val => parseInt(val, 10))
    .pipe(z.number().min(1).max(10))
    .refine(val => !isNaN(val), {
      message: 'Count must be a valid number',
    }),
});

// Request body DTOs
export interface CreateCityDto {
  name: string;
  country: string;
  continent: string;
  funFact?: string[];
  trivia: string[];
}

export interface UpdateCityDto extends Partial<CreateCityDto> {}

export interface CreateClueDto {
  city: Types.ObjectId | string;
  clue: string;
  difficulty: number;
  options: string[];
}

export interface UpdateClueDto extends Omit<Partial<CreateClueDto>, 'city'> {}

export interface RandomCitiesDto {
  count: number;
}

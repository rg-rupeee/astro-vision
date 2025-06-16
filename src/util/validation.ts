import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { z } from 'zod';
import { Types } from 'mongoose';

export const validationPipe = async (
  schema: new () => {},
  requestObject: object,
) => {
  const transformedClass: any = plainToInstance(schema, requestObject);
  const errors = await validate(transformedClass);
  if (errors.length > 0) {
    return errors;
  }
  return true;
};

export const objectIdSchema = z
  .string()
  .refine(value => Types.ObjectId.isValid(value), {
    message: 'Invalid ObjectId format',
    path: ['id'], // path of error
  });

// Common parameter schemas
export const commonParams = {
  id: z.object({
    id: objectIdSchema,
  }),
} as const;

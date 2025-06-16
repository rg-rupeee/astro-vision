import { z } from 'zod';

export const SignupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
    birthdate: z
      .string()
      .refine(
        val => {
          const date = new Date(val);
          return !isNaN(date.getTime());
        },
        {
          message: 'Invalid date format',
        },
      )
      .transform(val => new Date(val))
      .refine(date => date <= new Date(), {
        message: 'Date of birth cannot be in the future',
      }),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export type SignupDTO = z.infer<typeof SignupSchema>;

export type LoginDTO = z.infer<typeof LoginSchema>;

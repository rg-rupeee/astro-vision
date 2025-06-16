import { z } from 'zod';

export const SignupSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4),
  })
  .strict();

export const LoginSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .strict();

export const GuestRegisterSchema = z
  .object({
    name: z.string().min(2),
  })
  .strict();

export const UsernameCheckSchema = z
  .object({
    name: z.string().min(2),
  })
  .strict();

export type SignupDTO = z.infer<typeof SignupSchema>;

export type LoginDTO = z.infer<typeof LoginSchema>;

export type GuestRegisterDTO = z.infer<typeof GuestRegisterSchema>;

export type UsernameCheckDTO = z.infer<typeof UsernameCheckSchema>;

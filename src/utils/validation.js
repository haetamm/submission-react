import { z } from 'zod';
import { stripHtml } from './helper';

export const name = z
  .string()
  .trim()
  .min(1, { message: 'Name must be at least 1 characters long' });

export const email = z.string().email({ message: 'Invalid email address' });

export const passwordLogin = z.string().trim().min(1, 'Password is required');

export const password =  z
  .string()
  .trim()
  .min(6, 'Minimum 6 characters')
  .max(8, 'Maximum 8 characters')
  .regex(
    /^[a-zA-Z0-9]+$/,
    'Password must contain only alphanumeric characters'
  );

export const title = z
  .string()
  .trim()
  .min(1, { message: 'Title must be at least 1 characters long' });

export const category = z
  .string()
  .trim()
  .optional();

export const body = z
  .string()
  .trim()
  .min(1, { message: ' must be at least 1 characters' })
  .refine(
    (value) => {
      const plainText = stripHtml(value);
      return plainText.length > 0;
    },
    { message: ' cannot be empty or just whitespace' }
  );

export const registerSchema = z
  .object({
    name,
    email,
    password,
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  });

export const loginSchema = z.object({
  email,
  password: passwordLogin
});

export const threadSchema = z.object({
  title,
  category,
  body
});

export const commentSchema = z.object({
  content: body
});
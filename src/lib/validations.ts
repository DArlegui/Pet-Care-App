import { z } from 'zod';
import { DEFAULT_PET_IMAGE } from './constants';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z.string().trim().min(3, { message: 'Name is required' }).max(18),
    ownerName: z.string().trim().min(3, { message: 'Owner name is required' }).max(18),
    imageUrl: z.union([z.literal(''), z.string().trim().url({ message: 'Invalid URL' })]),
    age: z.coerce.number().int().positive().max(100),
    notes: z.union([z.literal(''), z.string().trim().max(100)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100).min(8),
});

export type TAuth = z.infer<typeof authSchema>;

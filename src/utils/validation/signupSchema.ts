import * as z from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(5,'Invalid email address'),//for now i will put it like this, i will update it in other assigments
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
    .min(7, 'Phone number too short'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

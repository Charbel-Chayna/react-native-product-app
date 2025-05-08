import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(1, { message: 'Username is required' }), //i will change it in other assignement to .email validation
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

import { z } from 'zod';

export const OrderValidationSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  product: z
    .string()
    .min(1, { message: 'Product name is required' })
    .trim(),
  quantity: z
    .number()
    .int({ message: 'Quantity must be an integer' })
    .min(1, { message: 'Quantity must be at least 1' }),
  totalPrice: z
    .number()
    .min(0, { message: 'Total price cannot be negative' })
});

export type OrderValidationType = z.infer<typeof OrderValidationSchema>;

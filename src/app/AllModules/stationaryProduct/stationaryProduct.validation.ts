import { z } from 'zod';

export const StationaryProductValidationSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters")
        .trim(),
    brand: z.string()
        .min(2, "Brand must be at least 2 characters")
        .max(50, "Brand cannot exceed 50 characters")
        .trim(),
    price: z.number()
        .min(0, "Price cannot be negative"),
    category: z.enum(["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], {
        errorMap: () => ({ message: 'Invalid category.' }) 
    }),
    description: z.string()
        .min(10, "Description must be at least 10 characters")
        .trim(),
    quantity: z.number()
        .min(0, "Quantity cannot be negative")
        .int("Quantity must be an integer"), 
    inStock: z.boolean(),
    isDeleted:z.boolean().default(false)
});


import { z } from 'zod';

const createStationaryProductValidationSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name cannot exceed 100 characters")
            .trim(),
        photo: z.string()
            .url({ message: "Photo should be a url." })
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
        isDeleted: z.boolean().default(false)
    })
});

const getStationaryProductsQuerySchema = z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
    searchQuery: z.string().optional(),
    sort: z.coerce.number().int().min(-1).max(1).default(-1),
    categories: z.union([
        z.string().transform(val => val.split(',')),
        z.array(z.string())
    ]).optional(),
    priceSort: z.coerce.number().int().min(-1).max(1).optional(),
    minPrice: z.coerce.number().positive().optional(),
    maxPrice: z.coerce.number().positive().optional()
});

const getSingleProductQuerySchema = z.object({
    params: z.object({
        productId: z.string().min(1, { message: "Product ID is required" }),
    }),
});

const updateProductValidationSchema = z.object({
    body: z.object({
        name: z.string()
            .min(2, "Name must be at least 2 characters")
            .max(100, "Name cannot exceed 100 characters")
            .trim().optional(),
        photo: z.string()
            .url({ message: "Photo should be a url." })
            .trim().optional(),
        brand: z.string()
            .min(2, "Brand must be at least 2 characters")
            .max(50, "Brand cannot exceed 50 characters")
            .trim().optional(),
        price: z.number()
            .min(0, "Price cannot be negative").optional(),
        category: z.enum(["Writing", "Office Supplies", "Art Supplies", "Educational", "Technology"], {
            errorMap: () => ({ message: 'Invalid category.' })
        }).optional(),
        description: z.string()
            .min(10, "Description must be at least 10 characters")
            .trim().optional(),
        quantity: z.number()
            .min(0, "Quantity cannot be negative")
            .int("Quantity must be an integer").optional(),
        inStock: z.boolean().optional(),
        isDeleted: z.boolean().default(false)
    })
});

const deleteProductValidationSchema = z.object({
    params: z.object({
        productId: z.string().min(1, { message: "Product ID is required" }),
    }),
});

export const StationaryProductValidation = { createStationaryProductValidationSchema, getStationaryProductsQuerySchema, getSingleProductQuerySchema,updateProductValidationSchema,deleteProductValidationSchema }

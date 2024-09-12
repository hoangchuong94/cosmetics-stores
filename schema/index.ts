import { z } from 'zod';

export const LoginSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: z
        .string({ required_error: 'Password is required' })
        .min(1, 'Password is required')
        .min(6, 'Password must be more than 6 characters')
        .max(32, 'Password must be less than 32 characters'),
});

export const RegisterSchema = z
    .object({
        name: z
            .string({ required_error: 'Name is required' })
            .min(1, 'Name is required')
            .min(6, 'Name must be more than 6 characters')
            .max(32, 'Name must be less than 32 characters'),
        email: z
            .string({ required_error: 'Email is required' })
            .min(1, 'Email is required')
            .email('Invalid email'),
        password: z
            .string({ required_error: 'Password is required' })
            .min(1, 'Password is required')
            .min(6, 'Password must be more than 6 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: z
            .string({
                required_error: 'Please confirm your password',
            })
            .min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Password confirmation is incorrect',
    });

export const EmailSchema = z.object({
    email: z
        .string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
});

export const ForgotPasswordSchema = z
    .object({
        password: z
            .string({ required_error: 'Password is required' })
            .min(1, 'Password is required')
            .min(6, 'Password must be more than 6 characters')
            .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: z
            .string({
                required_error: 'Please confirm your password',
            })
            .min(1, 'Please confirm your password'),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Password confirmation is incorrect',
    });

export const ProductSchema = z.object({
    name: z
        .string({ required_error: 'Product name is required' })
        .min(6, 'Product name must be more than 6 characters')
        .max(32, 'Product name must be less than 32 characters'),

    description: z
        .string({ required_error: 'Product description is required' })
        .min(1, 'Product description is required')
        .max(150, 'Product description must be less than 150 characters'),

    type: z
        .string({ required_error: 'Type product description is required' })
        .min(1, 'Type product description is required')
        .max(50, 'Type product description must be less than 50 characters'),

    price: z.coerce.number().positive('Price must be a positive number'),

    quantity: z.coerce
        .number()
        .positive('Price must be a positive number')
        .int('Quantity must be an integer'),

    // thumbnail: z.string({
    //     required_error: 'Type product description is required',
    // }),

    capacity: z.coerce
        .number()
        .positive('Price must be a positive number')
        .int('Quantity must be an integer'),

    colors: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                code: z.string(),
                createdAt: z.date(),
                updatedAt: z.date(),
            }),
        )
        .nonempty('At least one color must be selected'),

    images: z.array(z.string()),

    category: z
        .object({
            id: z.string(),
            name: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
        .nullable(),

    subCategory: z
        .object({
            id: z.string(),
            name: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            categoryId: z.string(),
        })
        .nullable(),

    detailCategory: z
        .object({
            id: z.string(),
            name: z.string(),
            createdAt: z.date(),
            updatedAt: z.date(),
            subCategoryId: z.string(),
        })
        .nullable(),
});

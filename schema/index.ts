import { z } from 'zod';

export const ImagesSchema = z
    .array(
        z.object({
            file: z.union([z.instanceof(File), z.string()]),
            key: z.string(),
            progress: z.union([
                z.literal('PENDING'),
                z.literal('COMPLETE'),
                z.literal('ERROR'),
                z.number(),
            ]),
        }),
    )
    .min(1, 'At least one image must be selected')
    .refine(
        (arr) =>
            arr.every(
                (item) => item.progress !== 'ERROR' || item === undefined,
            ),
        {
            message: 'Please check image uploader ',
        },
    );

export const ThumbnailSchema = z.preprocess(
    (input) => {
        if (input instanceof File || typeof input === 'string') return input;
        return undefined;
    },
    z.union([
        z.instanceof(File, { message: 'Thumbnail is required' }),
        z.string().min(1, { message: 'Thumbnail is required' }),
    ]),
);

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
    id: z.string(),
    name: z
        .string({ required_error: 'Product name is required' })
        .min(1, 'Product name is required')
        .min(6, 'Product name must be more than 6 characters')
        .max(32, 'Product name must be less than 32 characters'),

    description: z
        .string({ required_error: 'Product description is required' })
        .min(1, 'Product description is required')
        .min(6, 'Product description must be more than 6 characters')
        .max(150, 'Product description must be less than 150 characters'),

    type: z
        .string({ required_error: 'Type product is required' })
        .min(1, 'Type product is required')
        .min(3, 'Product type must be more than 3 characters')
        .max(50, 'Type product must be less than 50 characters'),

    price: z.coerce
        .number()
        .min(1, 'Price is required')
        .positive('Price must be a positive number'),

    quantity: z.coerce
        .number()
        .min(1, 'Quantity is required')
        .positive('Quantity must be a positive number')
        .int('Quantity must be an integer'),

    capacity: z.coerce
        .number()
        .min(1, 'Capacity is required')
        .positive('Capacity must be a positive number')
        .int('Capacity must be an integer'),

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

    promotions: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            description: z.string(),
            startDay: z.date(),
            endDay: z.date(),
            createdAt: z.date(),
            updatedAt: z.date(),
        }),
    ),

    thumbnailFile: ThumbnailSchema,

    imageFiles: ImagesSchema,

    category: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
    }),

    subCategory: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        categoryId: z.string(),
    }),

    detailCategory: z.object({
        id: z.string(),
        name: z.string(),
        createdAt: z.date(),
        updatedAt: z.date(),
        subCategoryId: z.string(),
    }),
});

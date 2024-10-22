import { z } from 'zod';

// export const UpdateProductSchema = z.object({
//     thumbnailUrl: z
//         .string({ required_error: 'Thumbnail is required' })
//         .min(1, 'Thumbnail is required'),
//     imageUrls: z
//         .array(z.string({ required_error: 'image is required' }))
//         .min(1, 'image is required'),
// });

// export const UpdateProductSchema = z.object({
//     thumbnail: z
//         .object({
//             urlConfirm: z.string().optional(),
//             file: z.instanceof(File).optional(),
//         })
//         .superRefine((data, ctx) => {
//             const { urlConfirm, file } = data;

//             // Kiểm tra nếu cả hai đều là undefined hoặc null
//             if (!urlConfirm && !file) {
//                 ctx.addIssue({
//                     path: ['urlConfirm'],
//                     code: z.ZodIssueCode.custom,
//                     message: 'Either a URL or a file is required.',
//                 });
//                 ctx.addIssue({
//                     path: ['file'],
//                     code: z.ZodIssueCode.custom,
//                     message: 'Either a URL or a file is required.',
//                 });
//             }
//         }),
// });

export const FileStateSchema = z.object({
    file: z.union([z.instanceof(File), z.string()]),
    key: z.string(),
    progress: z.union([
        z.literal('PENDING'),
        z.literal('COMPLETE'),
        z.literal('ERROR'),
        z.number(),
    ]),
});

export const FileStateArraySchema = z.array(FileStateSchema);

export const UpdateProductSchema = z.object({
    images: z.object({
        urlsConfirm: z.array(z.string()),
        fileStates: z.array(FileStateSchema),
    }),
});

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
        .string({ required_error: 'Type product is required' })
        .min(1, 'Type product is required')
        .max(50, 'Type product must be less than 50 characters'),

    price: z.coerce.number().positive('Price must be a positive number'),

    quantity: z.coerce
        .number()
        .positive('Quantity must be a positive number')
        .int('Quantity must be an integer'),

    thumbnailUrl: z.string({
        required_error: 'ThumbnailUrl product is required',
    }),

    capacity: z.coerce
        .number()
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

    promotions: z
        .array(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
                startDay: z.date(),
                endDay: z.date().nullable(),
                createdAt: z.date(),
                updatedAt: z.date(),
            }),
        )
        .optional(),

    imageUrls: z.array(z.string()),

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

'use server';
import prisma from '@/lib/prisma';
import z from 'zod';
import { ProductSchema } from '@/schema/index';
import { ProductWithDetails, CategoryWithDetails } from '@/types';

const handleError = (
    error: unknown,
    message: string,
    returnEmptyArray = true,
) => {
    console.error(`${message}:`, error);
    if (returnEmptyArray) {
        return [];
    }
    throw error;
};

export const getColors = async () => {
    try {
        return await prisma.color.findMany();
    } catch (error) {
        return handleError(error, 'Error fetching colors');
    }
};

export const getCategories = async (): Promise<CategoryWithDetails[]> => {
    try {
        return await prisma.category.findMany({
            include: {
                subCategories: {
                    include: {
                        detailCategories: true,
                    },
                },
            },
        });
    } catch (error) {
        return handleError(error, 'Error fetching categories');
    }
};

export const getSubCategories = async () => {
    try {
        return await prisma.subCategory.findMany();
    } catch (error) {
        return handleError(error, 'Error fetching subCategories');
    }
};

export const getDetailCategories = async () => {
    try {
        return await prisma.detailCategory.findMany();
    } catch (error) {
        return handleError(error, 'Error fetching detailCategories');
    }
};

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
    try {
        const imagePromises = values.imagesUrl.map((url) =>
            prisma.image.create({
                data: { url },
            }),
        );

        const images = await Promise.allSettled(imagePromises);

        const successfulImages = images
            .filter((result) => result.status === 'fulfilled')
            .map(
                (result) =>
                    (result as PromiseFulfilledResult<{ id: string }>).value,
            );

        const imageIds = successfulImages.map((image) => ({ id: image.id }));

        const newProduct = await prisma.product.create({
            data: {
                name: values.name,
                description: values.description,
                type: values.type,
                price: values.price,
                quantity: values.quantity,
                capacity: values.capacity,
                thumbnail: values.thumbnailUrl,
                detailCategories: {
                    create: {
                        detailCategory: {
                            connect: { id: values.detailCategory.id },
                        },
                    },
                },
                images: {
                    create: imageIds.map((imageId) => ({
                        image: { connect: imageId },
                    })),
                },
                colors: {
                    create: values.colors.map((color) => ({
                        color: {
                            connect: { id: color.id },
                        },
                    })),
                },
            },
        });
        return newProduct;
    } catch (error) {
        handleError(error, 'Error creating product');
    }
};

export const getProducts = async (): Promise<ProductWithDetails[]> => {
    try {
        return await prisma.product.findMany({
            include: {
                images: {
                    include: {
                        image: true,
                    },
                },
                colors: {
                    include: {
                        color: true,
                    },
                },
                detailCategories: {
                    include: {
                        detailCategory: true,
                    },
                },
                promotions: {
                    include: {
                        promotion: true,
                    },
                },
            },
        });
    } catch (error) {
        return handleError(error, 'Error fetching products');
    }
};

export const getProductById = async (productId: string) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: productId,
            },
            include: {
                images: {
                    include: {
                        image: true,
                    },
                },
                colors: {
                    include: {
                        color: true,
                    },
                },
                detailCategories: {
                    include: {
                        detailCategory: true,
                    },
                },
                promotions: {
                    include: {
                        promotion: true,
                    },
                },
            },
        });

        return product;
    } catch (error) {
        console.error('Error retrieving product:', error);
        throw error;
    }
};

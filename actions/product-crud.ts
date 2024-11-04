'use server';

import prisma from '@/lib/prisma';
import { backendClient } from '@/lib/edgestore-server';
import { Product } from '@/types';

export const updateProduct = async (values: Product) => {
    try {
        const newProduct = await prisma.$transaction(async (prisma) => {
            await prisma.productImage.deleteMany({
                where: { productId: values.id },
            });

            const imagePromises = values.imageUrls.map((url) =>
                prisma.image.create({
                    data: { url },
                }),
            );
            const images = await Promise.allSettled(imagePromises);
            const successfulImages = images
                .filter((result) => result.status === 'fulfilled')
                .map(
                    (result) =>
                        (result as PromiseFulfilledResult<{ id: string }>)
                            .value,
                );

            if (successfulImages.length === 0) {
                throw new Error('No images were successfully created.');
            }

            const imageIds = successfulImages.map((image) => ({
                id: image.id,
            }));

            const product = await prisma.product.update({
                where: { id: values.id },
                data: {
                    name: values.name,
                    description: values.description,
                    type: values.type,
                    price: values.price,
                    quantity: values.quantity,
                    capacity: values.capacity,
                    thumbnail: values.thumbnailUrl,
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

                    detailCategory: {
                        connect: { id: values.detailCategoryId },
                    },
                },
            });

            await Promise.all(
                values.imageUrls.map(async (item) => {
                    try {
                        await backendClient.publicImages.confirmUpload({
                            url: item,
                        });
                    } catch (error) {
                        console.error(error);
                        throw new Error('Failed to confirm upload');
                    }
                }),
            );

            return product;
        });

        return newProduct;
    } catch (error) {
        return handleError(error, 'Error creating product');
    }
};

export const createProduct = async (values: Product) => {
    try {
        const newProduct = await prisma.$transaction(async (prisma) => {
            const imagePromises = values.imageUrls.map((url) =>
                prisma.image.create({
                    data: { url },
                }),
            );
            const images = await Promise.allSettled(imagePromises);
            const successfulImages = images
                .filter((result) => result.status === 'fulfilled')
                .map(
                    (result) =>
                        (result as PromiseFulfilledResult<{ id: string }>)
                            .value,
                );

            if (successfulImages.length === 0) {
                throw new Error('No images were successfully created.');
            }

            const imageIds = successfulImages.map((image) => ({
                id: image.id,
            }));

            const product = await prisma.product.create({
                data: {
                    name: values.name,
                    description: values.description,
                    type: values.type,
                    price: values.price,
                    quantity: values.quantity,
                    capacity: values.capacity,
                    thumbnail: values.thumbnailUrl,
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
                    promotions: {
                        create: values.promotions.map((promotion) => ({
                            promotion: {
                                connect: { id: promotion.id },
                            },
                        })),
                    },
                    detailCategory: {
                        connect: { id: values.detailCategoryId },
                    },
                },
            });

            await Promise.all(
                values.imageUrls.map(async (item) => {
                    try {
                        await backendClient.publicImages.confirmUpload({
                            url: item,
                        });
                    } catch (error) {
                        console.error(error);
                        throw new Error('Failed to confirm upload');
                    }
                }),
            );

            return product;
        });

        return newProduct;
    } catch (error) {
        return handleError(error, 'Error creating product');
    }
};

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

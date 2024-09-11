'use server';

import prisma from '@/lib/prisma';
import z from 'zod';
import { ProductSchema } from '@/schema/index';
import { ProductWithDetails, CategoryWithDetails } from '@/types';

export const getColors = async () => {
    try {
        const colors = await prisma.color.findMany();
        return colors;
    } catch (error) {
        console.error('Error fetching colors:', error);
        return [];
    }
};

export const getCategories = async (): Promise<CategoryWithDetails[]> => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                subCategories: {
                    include: {
                        detailCategories: true,
                    },
                },
            },
        });
        return categories;
    } catch (error) {
        console.error('Error fetching colors:', error);
        return [];
    }
};

export const getSubCategories = async () => {
    try {
        const subCategories = await prisma.subCategory.findMany();
        return subCategories;
    } catch (error) {
        console.error('Error fetching colors:', error);
        return [];
    }
};

export const getDetailCategories = async () => {
    try {
        const detailCategories = await prisma.detailCategory.findMany();
        return detailCategories;
    } catch (error) {
        console.error('Error fetching detailCategories:', error);
        return [];
    }
};

export const createProduct = async (values: z.infer<typeof ProductSchema>) => {
    const imagePromises = values.images.map((url) =>
        prisma.image.create({
            data: { url },
        }),
    );
    const images = await Promise.all(imagePromises);
    const imageIds = images.map((image) => ({ id: image.id }));

    try {
        const newProduct = await prisma.product.create({
            data: {
                name: values.name,
                description: values.description,
                type: values.type,
                price: values.price,
                quantity: values.quantity,
                capacity: values.capacity,
                thumbnail: values.thumbnail,
                detailCategories: {
                    create: {
                        detailCategory: {
                            connect: { id: values.detailCategory!.id },
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
        console.error('Error creating product:', error);
    } finally {
        await prisma.$disconnect();
    }
};

export const getProducts = async (): Promise<ProductWithDetails[]> => {
    try {
        const products = await prisma.product.findMany({
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

        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

'use server';
import prisma from '@/lib/prisma';
import { ProductWithDetails, CategoryWithDetails } from '@/types';
import { Color } from '@prisma/client';

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

export const fetchColors = async (): Promise<Color[] | null> => {
    try {
        return await prisma.color.findMany();
    } catch (error) {
        return handleError(error, 'Error fetching colors');
    }
};

export const fetchCategories = async (): Promise<CategoryWithDetails[]> => {
    try {
        return await prisma.category.findMany({
            include: {
                subCategories: {
                    include: {
                        detailCategories: {
                            include: {
                                products: true,
                            },
                        },
                    },
                },
            },
        });
    } catch (error) {
        return handleError(error, 'Error fetching categories');
    }
};

export const fetchSubCategories = async () => {
    try {
        return await prisma.subCategory.findMany();
    } catch (error) {
        return handleError(error, 'Error fetching subCategories');
    }
};

export const fetchDetailCategories = async () => {
    try {
        return await prisma.detailCategory.findMany();
    } catch (error) {
        return handleError(error, 'Error fetching detailCategories');
    }
};

export const fetchAllProduct = async (): Promise<
    ProductWithDetails[] | null
> => {
    try {
        const products = await prisma.product.findMany({
            include: {
                detailCategory: true,
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
                promotions: {
                    include: {
                        promotion: true,
                    },
                },
            },
        });

        return products;
    } catch (error) {
        return handleError(error, 'Error fetching products');
    }
};

export const fetchProductById = async (productId: string) => {
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
                detailCategory: true,
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

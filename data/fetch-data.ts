'use server';
import prisma from '@/lib/prisma';
import { ProductWithDetails, DataToCreateAndUpdateProduct } from '@/types';

const handleError = (
    error: unknown,
    message: string,
    returnEmptyArray = true,
) => {
    let err = '';

    if (error instanceof Error) {
        err = error.message;
        console.error(`${message}:`, err);
    } else {
        err = message;
        console.error(`${message}:`, err);
    }

    if (returnEmptyArray) {
        return [];
    }
    throw error;
};

export const fetchDataToCreateAndUpdateProducts = async (): Promise<
    DataToCreateAndUpdateProduct | never[]
> => {
    try {
        const [colors, categories, subCategories, detailCategories] =
            await Promise.all([
                prisma.color.findMany(),
                prisma.category.findMany({}),
                prisma.subCategory.findMany(),
                prisma.detailCategory.findMany(),
            ]);

        return {
            colors,
            categories,
            subCategories,
            detailCategories,
        };
    } catch (error) {
        return handleError(
            error,
            'Error fetching all data create and update product',
            false,
        );
    }
};
export const fetchCategories = async () => {
    try {
        const listCategory = prisma.category.findMany({});
        return listCategory;
    } catch (error) {
        return handleError(
            error,
            'Error fetching all data create and update product',
            false,
        );
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

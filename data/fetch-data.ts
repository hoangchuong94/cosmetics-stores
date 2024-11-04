'use server';
import prisma from '@/lib/prisma';
import { ProductDetail, ProductActionData } from '@/types';

export const fetchProductActionData = async (): Promise<
    ProductActionData | never[]
> => {
    try {
        const [
            colors,
            categories,
            subCategories,
            detailCategories,
            promotions,
        ] = await Promise.all([
            prisma.color.findMany(),
            prisma.category.findMany(),
            prisma.subCategory.findMany(),
            prisma.detailCategory.findMany(),
            prisma.promotion.findMany(),
        ]);

        return {
            colors,
            categories,
            subCategories,
            detailCategories,
            promotions,
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

export const fetchAllProduct = async (): Promise<ProductDetail[] | null> => {
    try {
        const products = await prisma.product.findMany({
            include: {
                detailCategory: {
                    include: {
                        subCategory: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
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

        const formattedProducts: ProductDetail[] = products.map((product) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            type: product.type,
            price: product.price,
            quantity: product.quantity,
            capacity: product.capacity,
            thumbnail: product.thumbnail,
            images: product.images.map((img) => img.image),
            colors: product.colors.map((color) => color.color),
            promotions: product.promotions.map(
                (promotion) => promotion.promotion,
            ),
            detailCategory: product.detailCategory,
            subCategory: product.detailCategory.subCategory,
            category: product.detailCategory.subCategory.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        }));

        return formattedProducts;
    } catch (error) {
        return handleError(error, 'Error fetching products');
    }
};

export const fetchProductById = async (
    productId: string,
): Promise<ProductDetail | null | never[]> => {
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
                detailCategory: {
                    include: {
                        subCategory: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
                promotions: {
                    include: {
                        promotion: true,
                    },
                },
            },
        });

        if (!product) {
            return null;
        }

        const formattedProduct: ProductDetail = {
            id: product.id,
            name: product.name,
            description: product.description,
            type: product.type,
            price: product.price,
            quantity: product.quantity,
            capacity: product.capacity,
            thumbnail: product.thumbnail,
            images: product.images.map((img) => img.image),
            colors: product.colors.map((color) => color.color),
            promotions: product.promotions.map(
                (promotion) => promotion.promotion,
            ),
            detailCategory: product.detailCategory,
            subCategory: product.detailCategory.subCategory,
            category: product.detailCategory.subCategory.category,
            createdAt: product.createdAt,
            updatedAt: product.updatedAt,
        };

        return formattedProduct;
    } catch (error) {
        return handleError(error, 'Error fetching products');
    }
};

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

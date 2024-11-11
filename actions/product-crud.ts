'use server';

import prisma from '@/lib/prisma';
import { backendClient } from '@/lib/edgestore-server';
import { ProductCreate, ProductUpdate } from '@/types';

export const updateProduct = async (data: ProductUpdate) => {
    try {
        await prisma.$transaction(async (prisma) => {
            // const updatedProduct = await prisma.product.update({
            //     where: { id: data.id },
            //     data: {
            //         name: data.name,
            //         description: data.description,
            //         type: data.type,
            //         price: data.price,
            //         quantity: data.quantity,
            //         capacity: data.capacity,
            //         thumbnail: data.thumbnailUrl,
            //         detailCategory: {
            //             connect: { id: data.detailCategoryId },
            //         },
            //         images: {
            //             deleteMany: {},
            //             create: data.imageUrls.map((url) => ({
            //                 image: {
            //                     connectOrCreate: {
            //                         where: { url },
            //                         create: { url },
            //                     },
            //                 },
            //             })),
            //         },
            //         // Cập nhật màu sắc nếu có
            //         colors: {
            //             deleteMany: {}, // Xóa các màu hiện tại của Product
            //             create: data.colors.map((colorId) => ({
            //                 color: { connect: { id: colorId } },
            //             })),
            //         },
            //         // Cập nhật các chương trình khuyến mãi nếu có
            //         promotions: {
            //             deleteMany: {}, // Xóa các khuyến mãi hiện tại của Product
            //             create: data.promotions.map((promotionId) => ({
            //                 promotion: { connect: { id: promotionId } },
            //             })),
            //         },
            //     },
            // });
        });
    } catch (error) {
        return handleError(error, 'Error creating product');
    }
};

export const deleteImagesByProductId = async (productId: string) => {
    await prisma.productImage.deleteMany({
        where: {
            productId: productId,
        },
    });

    await prisma.image.deleteMany({
        where: {
            id: {
                notIn: (
                    await prisma.productImage.findMany({
                        select: { imageId: true },
                    })
                ).map((relation) => relation.imageId),
            },
        },
    });
};

export const createProduct = async (data: ProductCreate) => {
    try {
        const productSuccess = await prisma.$transaction(async (prisma) => {
            const product = await prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    type: data.type,
                    price: data.price,
                    quantity: data.quantity,
                    capacity: data.capacity,
                    thumbnail: data.thumbnailUrl,
                    images: {
                        create: data.imageUrls.map((url) => ({
                            image: { create: { url } },
                        })),
                    },
                    colors: {
                        create: data.colors.map((color) => ({
                            color: {
                                connect: { id: color.id },
                            },
                        })),
                    },
                    promotions:
                        data.promotions.length > 0
                            ? {
                                  create: data.promotions.map((promotion) => ({
                                      promotion: {
                                          connect: { id: promotion.id },
                                      },
                                  })),
                              }
                            : undefined,
                    detailCategory: {
                        connect: { id: data.detailCategoryId },
                    },
                },
            });

            const allTemporaryStorageImageUrls = [
                ...data.imageUrls,
                data.thumbnailUrl,
            ];

            await Promise.all(
                allTemporaryStorageImageUrls.map(async (item) => {
                    await backendClient.publicImages.confirmUpload({
                        url: item,
                    });
                }),
            );

            return product;
        });
        return productSuccess;
    } catch (error) {
        return handleError(error, 'Error creating product', false);
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
    throw new Error(`${message}: ${error}`);
};

'use server';
import prisma from '@/lib/prisma';

export const createProduct = async (values: any) => {
    try {
        // const imagePromises = values.imageUrls.map((item) =>
        //     prisma.image.create({
        //         data: { url },
        //     }),
        // );
        // const images = await Promise.allSettled(imagePromises);
        // const successfulImages = images
        //     .filter((result) => result.status === 'fulfilled')
        //     .map(
        //         (result) =>
        //             (result as PromiseFulfilledResult<{ id: string }>).value,
        //     );
        // if (successfulImages.length === 0) {
        //     throw new Error('No images were successfully created.');
        // }
        // const imageIds = successfulImages.map((image) => ({ id: image.id }));
        // const newProduct = await prisma.product.create({
        //     data: {
        //         name: values.name,
        //         description: values.description,
        //         type: values.type,
        //         price: values.price,
        //         quantity: values.quantity,
        //         capacity: values.capacity,
        //         thumbnail: values.thumbnailUrl,
        //         images: {
        //             create: imageIds.map((imageId) => ({
        //                 image: { connect: imageId },
        //             })),
        //         },
        //         colors: {
        //             create: values.colors.map((color) => ({
        //                 color: {
        //                     connect: { id: color.id },
        //                 },
        //             })),
        //         },
        //         detailCategory: { connect: { id: values.detailCategory.id } },
        //     },
        // });
        // return newProduct;
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

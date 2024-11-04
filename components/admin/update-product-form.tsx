'use client';
import React, { useState, useTransition } from 'react';
import {
    CheckboxField,
    ImageField,
    ImagesField,
    InputField,
    NumericInputField,
    SelectField,
    TextAreaField,
} from '@/components/custom-field';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Color,
    Category,
    SubCategory,
    DetailCategory,
    Promotion,
} from '@prisma/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProductSchema } from '@/schema';

import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { useFilteredCategories } from '@/hooks/use-filtered-categories';
import { updateProduct } from '@/actions/product-crud';
import { Product, ProductActionData, ProductDetail } from '@/types';
import { FileState } from '@/components/edgestore/multi-image-dropzone';

interface UpdateProductFormProps {
    product: ProductDetail;
    productActionData: ProductActionData;
}

const UpdateProductForm = ({
    product,
    productActionData,
}: UpdateProductFormProps) => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [imageUrls, setImageUrls] = useState<string[]>(
        product.images.map((item) => item.url),
    );
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(product.thumbnail);

    const convertImageFromUrlsProduct: FileState[] = product.images.map(
        (item) => ({
            file: item.url,
            key: item.id,
            progress: 'COMPLETE',
        }),
    );

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            id: product.id,
            name: product.name,
            description: product.description,
            type: product.type,
            price: product.price,
            quantity: product.quantity,
            capacity: product.capacity,
            thumbnailFile: product.thumbnail,
            colors: product.colors,
            promotions: product.promotions,
            category: product.category,
            subCategory: product.subCategory,
            detailCategory: product.detailCategory,
            imageFiles: convertImageFromUrlsProduct,
        },
    });

    const { watch, resetField, handleSubmit, control } = form;
    const selectedCategory = watch('category');
    const selectedSubCategory = watch('subCategory');

    const { filteredSubCategories, filteredDetailCategories } =
        useFilteredCategories(
            selectedCategory,
            selectedSubCategory,
            productActionData.subCategories,
            productActionData.detailCategories,
            resetField,
        );

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        const now = new Date();
        const formattedDate = new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeStyle: 'short',
        }).format(now);

        startTransition(async () => {
            console.log(values);
            try {
                // const newProduct = {
                //     id: values.id,
                //     name: values.name,
                //     description: values.description,
                //     type: values.type,
                //     price: values.price,
                //     quantity: values.quantity,
                //     capacity: values.capacity,
                //     colors: values.colors,
                //     promotions: values.promotions,
                //     detailCategoryId: values.detailCategory.id,
                //     thumbnailUrl: thumbnailUrl,
                //     imageUrls: imageUrls,
                // };
                // const product = await updateProduct(newProduct);
                // if (!product || Array.isArray(product)) {
                //     throw new Error('Product update failed');
                // }
                // toast({
                //     title: 'The product has been successfully updated',
                //     description: formattedDate,
                // });
            } catch (error) {
                toast({
                    title: 'Update Error',
                    description: 'Failed to update product. Please try again.',
                });
            }
        });
    };

    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center bg-slate-100 p-4">
            <div className="mb-6 w-full">
                <LinkHierarchy />
            </div>
            <div className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <div className="grid grid-cols-2 gap-2">
                            <InputField
                                control={control}
                                className="bg-white"
                                name="name"
                                label="Name"
                                placeholder="Enter your product name"
                            />
                            <InputField
                                control={control}
                                className="bg-white"
                                name="type"
                                label="Type"
                                placeholder="Enter your product type"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <NumericInputField
                                className="bg-white"
                                control={control}
                                name="price"
                                label="Price"
                                placeholder="Enter your product price"
                            />
                            <NumericInputField
                                className="bg-white"
                                control={control}
                                name="quantity"
                                label="Quantity"
                                placeholder="Enter your product quantity"
                            />
                            <NumericInputField
                                className="bg-white"
                                control={control}
                                name="capacity"
                                label="Capacity"
                                placeholder="Enter your product capacity"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <SelectField
                                name="category"
                                label="Category"
                                items={productActionData.categories}
                                renderItem={(item) => item.name}
                                getItemKey={(item) => item.id}
                            />
                            <SelectField
                                name="subCategory"
                                label="Sub Category"
                                items={filteredSubCategories}
                                renderItem={(item) => item.name}
                                getItemKey={(item) => item.id}
                                disabled={!selectedCategory}
                            />
                            <SelectField
                                name="detailCategory"
                                label="Detail Category"
                                items={filteredDetailCategories}
                                renderItem={(item) => item.name}
                                getItemKey={(item) => item.id}
                                disabled={!selectedSubCategory}
                            />
                        </div>

                        <CheckboxField
                            control={control}
                            name="colors"
                            label="Colors"
                            items={productActionData.colors}
                            getItemKey={(color) => color.id}
                            renderItem={(color) => color.name}
                        />

                        <CheckboxField
                            control={control}
                            name="promotions"
                            label="Promotions"
                            items={productActionData.promotions}
                            getItemKey={(promotion) => promotion.id}
                            renderItem={(promotion) => promotion.name}
                        />

                        <TextAreaField
                            className="h-[154px] bg-white"
                            control={control}
                            name="description"
                            label="Description"
                            placeholder="Enter your product description"
                        />

                        <ImageField
                            control={form.control}
                            name="thumbnailFile"
                            label="Thumbnail"
                            setUrl={setThumbnailUrl}
                        />

                        <ImagesField
                            control={form.control}
                            name="imageFiles"
                            label="Images"
                            setUrls={setImageUrls}
                        />

                        <Button disabled={isPending} className="w-full">
                            {isPending && <LoadingSpinner />}
                            Update Product
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProductForm;

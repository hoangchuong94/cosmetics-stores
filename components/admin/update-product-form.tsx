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
import { Color, Category, SubCategory, DetailCategory } from '@prisma/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProductSchema } from '@/schema';

import { useFilteredCategories } from '@/hooks/use-filtered-categories';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { ProductWithDetails, UploadedImage } from '@/types';
import { FileState } from '@/components/edgestore/multi-image-dropzone';

interface ProductUpdate extends ProductWithDetails {
    subCategory: SubCategory;
    category: Category;
}

interface UpdateProductFormProps {
    product: ProductUpdate;
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
}

const UpdateProductForm = ({
    product,
    colors,
    categories,
    subCategories,
    detailCategories,
}: UpdateProductFormProps) => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>();

    const convertImageFromUrlsProduct: FileState[] = product.images.map(
        (item) => ({
            file: item.image.url,
            key: item.image.id,
            progress: 'COMPLETE',
        }),
    );

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            type: product.type,
            price: product.price,
            quantity: product.quantity,
            capacity: product.capacity,
            thumbnailFile: product.thumbnail,
            colors: product.colors.map((item) => item.color),
            imageFiles: convertImageFromUrlsProduct,
            promotions: product.promotions.map((item) => item.promotion),
            category: product.category,
            subCategory: product.subCategory,
            detailCategory: product.detailCategory,
        },
    });

    const { watch, resetField, handleSubmit, control } = form;
    const selectedCategory = watch('category');
    const selectedSubCategory = watch('subCategory');

    const { filteredSubCategories, filteredDetailCategories } =
        useFilteredCategories(
            selectedCategory,
            selectedSubCategory,
            subCategories,
            detailCategories,
            resetField,
        );

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        startTransition(async () => {
            try {
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
                                items={categories}
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
                            label="Select Colors"
                            items={colors}
                            getItemKey={(color) => color.id}
                            renderItem={(color) => color.name}
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
                            Create Product
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProductForm;

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
import { useEdgeStore } from '@/lib/edgestore';
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
import { useFilteredCategories } from '@/hooks/use-filtered-categories';
import { ProductActionData, Product } from '@/types';
import { createProduct } from '@/actions/product-crud';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';

interface CreateProductFormProps {
    productActionData: ProductActionData;
}

const CreateProductForm = ({ productActionData }: CreateProductFormProps) => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            type: '',
            thumbnailFile: '',
            price: 0,
            quantity: 0,
            capacity: 0,
            colors: [],
            promotions: [],
            imageFiles: [],
            category: undefined,
            subCategory: undefined,
            detailCategory: undefined,
        },
    });

    const { watch, resetField, handleSubmit, control, formState } = form;

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

        if (imageUrls.length === 0 || !thumbnailUrl) {
            toast({
                title: 'upload images failed',
                description: formattedDate,
            });
        } else {
            startTransition(async () => {
                try {
                    // const newProduct: Product = {
                    //     name: values.name,
                    //     description: values.description,
                    //     type: values.type,
                    //     price: values.price,
                    //     quantity: values.quantity,
                    //     capacity: values.capacity,
                    //     colors: values.colors,
                    //     thumbnailUrl: thumbnailUrl,
                    //     imageUrls: imageUrls,
                    //     promotions: values.promotions,
                    //     detailCategoryId: values.detailCategory.id,
                    // };
                    // const product = await createProduct(newProduct);
                    // if (!product || Array.isArray(product)) {
                    //     throw new Error('Product creation failed');
                    // }
                    // toast({
                    //     title: 'The product has been successfully created',
                    //     description: formattedDate,
                    // });
                    // form.reset();
                } catch (error) {
                    console.error(error);
                    toast({
                        title: 'An error occurred during the product creation process',
                        description: formattedDate,
                    });
                }
            });
        }
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

                        <Button
                            disabled={!formState.isValid || isPending}
                            className="w-full"
                        >
                            {isPending && <LoadingSpinner />}
                            Create Product
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateProductForm;

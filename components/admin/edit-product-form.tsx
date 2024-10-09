'use client';
import React, { useEffect, useState, useTransition } from 'react';
import {
    CheckboxField,
    InputField,
    NumericInputField,
    SelectField,
} from '@/components/custom-field';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { useEdgeStore } from '@/lib/edgestore';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color, Category, SubCategory, DetailCategory } from '@prisma/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProductSchema } from '@/schema';

import { useFilteredCategories } from '@/hooks/use-filtered-categories';
import { createProduct } from '@/actions/controller-product';
import { useImageUploader } from '@/hooks/use-upload-images';
import UploadImages from '@/components/upload-images';
import UploadThumbnail from '@/components/upload-thumbnail';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { ProductWithDetails } from '@/types';
import { FileState } from '../multi-image-dropzone';

interface ProductEdit extends ProductWithDetails {
    subCategory: SubCategory;
    category: Category;
}

interface EditProductFormProps {
    product: ProductEdit;
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
}

const EditProductForm = ({
    product,
    colors,
    categories,
    subCategories,
    detailCategories,
}: EditProductFormProps) => {
    const { toast } = useToast();
    const { edgestore } = useEdgeStore();
    const [isPending, startTransition] = useTransition();

    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
        undefined,
    );
    const { fileStates, setFileStates, uploadImages, updateFileProgress } =
        useImageUploader();
    const [file, setFile] = useState<File | undefined>(undefined);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: product.name,
            description: product.description,
            type: product.type,
            price: product.price,
            quantity: product.quantity,
            capacity: product.capacity || undefined,
            thumbnailUrl: product.thumbnail,
            colors: product.colors.map((item) => item.color),
            imagesUrl: product.images.map((item) => item.image.url),
            promotions: product.promotions.map((item) => item.promotion),
            category: product.category,
            subCategory: product.subCategory,
            detailCategory: product.detailCategories[0].detailCategory,
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
        if (imageUrls.length > 0 && thumbnailUrl !== undefined) {
            try {
                await Promise.all(
                    imageUrls.map((url) =>
                        edgestore.publicFiles.confirmUpload({ url }),
                    ),
                );

                await edgestore.publicFiles.confirmUpload({
                    url: thumbnailUrl,
                });

                startTransition(async () => {
                    const newProduct = {
                        ...values,
                        imagesUrl: imageUrls,
                        thumbnailUrl: thumbnailUrl,
                    };

                    const productUploaded = await createProduct(newProduct);
                    if (productUploaded) {
                        toast({
                            title: 'Product Created',
                            description:
                                'The product has been successfully created.',
                        });
                        form.reset();
                        setFileStates([]);
                        setFile(undefined);
                    } else {
                        throw new Error('Product creation failed.');
                    }
                });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    toast({
                        title: 'Error Occurred',
                        description:
                            error.message ||
                            'An error occurred during the product creation process.',
                    });
                } else {
                    throw Error(
                        'An error occurred during the product creation process.',
                    );
                }
            }
        } else {
            toast({
                title: 'Missing Images',
                description:
                    'Please ensure you have uploaded images and a thumbnail.',
            });
        }
    };

    useEffect(() => {
        if (product.images.length > 0) {
            const initialImagesUploaded = product.images.map((item) => ({
                file: item.image.url,
                key: item.image.id,
                progress: 'PENDING',
            })) as FileState[];

            setFileStates(initialImagesUploaded);
        }
    }, [product.images, setFileStates]);

    useEffect(() => {
        const loadImageFromUrl = async () => {
            if (product.thumbnail) {
                try {
                    const response = await fetch(product.thumbnail);
                    const blob = await response.blob();

                    const currentFile = new File([blob], 'thumbnail.jpg', {
                        type: blob.type,
                    });

                    setFile(currentFile);
                } catch (error) {
                    console.error('Error loading image:', error);
                }
            }
        };

        loadImageFromUrl();
    }, [product.thumbnail]);

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

                        <div className="flex flex-row justify-center space-x-2">
                            <UploadThumbnail
                                file={file}
                                setFile={setFile}
                                thumbnailUrl={thumbnailUrl}
                                setThumbnailUrl={setThumbnailUrl}
                            />
                            <div className="w-full">
                                <InputField
                                    className="h-[154px] bg-white"
                                    control={control}
                                    name="description"
                                    label="Description"
                                    placeholder="Enter your product description"
                                    type="text-area"
                                />
                            </div>
                        </div>

                        <UploadImages
                            uploadImages={uploadImages}
                            setImageUrls={setImageUrls}
                            imageUrls={imageUrls}
                            fileStates={fileStates}
                            setFileStates={setFileStates}
                            updateFileProgress={updateFileProgress}
                        />

                        <Button
                            type="submit"
                            className="mt-4"
                            disabled={isPending}
                        >
                            {isPending ? <LoadingSpinner /> : 'Submit'}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default EditProductForm;

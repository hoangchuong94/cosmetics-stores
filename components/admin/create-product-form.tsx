'use client';
import React, { useState, useTransition } from 'react';
import {
    CheckboxField,
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
import { Color, Category, SubCategory, DetailCategory } from '@prisma/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProductSchema } from '@/schema';

import { useFilteredCategories } from '@/hooks/use-filtered-categories';
import { createProduct } from '@/actions/product-crud';
import { useImageUploader } from '@/hooks/use-upload-images';
import UploadImages from '@/components/upload-image/upload-images';
import UploadThumbnail from '@/components/upload-image/upload-thumbnail';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';

interface CreateProductFormProps {
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
}

const CreateProductForm = ({
    colors,
    categories,
    subCategories,
    detailCategories,
}: CreateProductFormProps) => {
    const { toast } = useToast();
    const { edgestore } = useEdgeStore();
    const [isPending, startTransition] = useTransition();

    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(
        undefined,
    );

    const { fileStates, setFileStates, uploadImages } = useImageUploader();

    const [thumbnailFile, setThumbnailFile] = useState<
        File | string | undefined
    >(undefined);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            type: '',
            price: 0,
            quantity: 0,
            capacity: 0,
            thumbnailUrl: '',
            colors: [],
            imageUrls: [],
            promotions: [],
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
            subCategories,
            detailCategories,
            resetField,
        );
    const confirmUploadImages = async (urls: string[], edgestore: any) => {
        const confirmPromises = urls.map(async (item) => {
            try {
                await edgestore.publicImages.confirmUpload({
                    url: item,
                });
            } catch (error) {
                console.error(error);
            }
        });

        await Promise.all(confirmPromises);
    };

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        try {
            if (imageUrls.length > 0 && thumbnailUrl !== undefined) {
                startTransition(async () => {
                    const newProduct = {
                        ...values,
                        imageUrls,
                        thumbnailUrl,
                    };

                    const productUploaded = await createProduct(newProduct);
                    const now = new Date();
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        dateStyle: 'long',
                        timeStyle: 'short',
                    }).format(now);
                    if (productUploaded) {
                        await confirmUploadImages(
                            [...imageUrls, thumbnailUrl],
                            edgestore,
                        );
                        toast({
                            title: 'The product has been successfully created',
                            description: formattedDate,
                        });
                        form.reset();
                        setFileStates([]);
                        setThumbnailFile(undefined);
                    } else {
                        toast({
                            title: 'An error occurred during the product creation process',
                            description: formattedDate,
                        });
                    }
                });
            }
        } catch (error) {
            toast({
                title: 'Upload Error',
                description: 'Failed to upload product. Please try again.',
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

                        {/* <UploadThumbnail
                            thumbnailFile={thumbnailFile}
                            setThumbnailFile={setThumbnailFile}
                            thumbnailUrl={thumbnailUrl}
                            setThumbnailUrl={setThumbnailUrl}
                        /> */}

                        <UploadImages
                            fileStates={fileStates}
                            setFileStates={setFileStates}
                            uploadImages={uploadImages}
                            imageUrls={imageUrls}
                            setImageUrls={setImageUrls}
                        />

                        <Button
                            disabled={
                                !formState.isValid ||
                                thumbnailUrl === '' ||
                                imageUrls.length === 0 ||
                                isPending
                            }
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

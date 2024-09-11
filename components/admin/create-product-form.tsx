'use client';
import React, { useEffect, useMemo, useState, useTransition } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Color, Category, SubCategory, DetailCategory } from '@prisma/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';

import LinkHierarchy from '@/components/admin/link-hierarchy';
import { ProductSchema } from '@/schema';
import { FormError } from '@/components/form-error';
import { createProduct } from '@/actions/controller-product';
import {
    CheckboxField,
    InputField,
    NumericInputField,
    SelectField,
} from '@/components/custom-field-create-product-form';

interface CreateProductFormProps {
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
}

interface UploadedImageResponse {
    url: string;
}

const CreateProductForm = ({
    colors,
    categories,
    subCategories,
    detailCategories,
}: CreateProductFormProps) => {
    const [thumbnailFile, setThumbnailFile] = React.useState<FileState>();
    const [imagesFileState, setImagesFileState] = React.useState<FileState[]>(
        [],
    );
    const [isPending, startTransition] = useTransition();
    const { edgestore } = useEdgeStore();
    const [error, setError] = useState<string | undefined>('');

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
            type: '',
            price: 0,
            quantity: 0,
            capacity: 0,
            thumbnail: '',
            colors: [],
            images: [],
            category: undefined,
            subCategory: undefined,
            detailCategory: undefined,
        },
    });

    const { watch, resetField } = form;

    const selectedCategory = watch('category');
    const selectedSubCategory = watch('subCategory');

    const filteredSubCategories = useMemo(() => {
        if (selectedCategory) {
            return subCategories.filter(
                (subCat) => subCat.categoryId === selectedCategory.id,
            );
        }
        return [];
    }, [selectedCategory, subCategories]);

    const filteredDetailCategories = useMemo(() => {
        if (selectedSubCategory) {
            return detailCategories.filter(
                (detailCat) =>
                    detailCat.subCategoryId === selectedSubCategory.id,
            );
        }
        return [];
    }, [selectedSubCategory, detailCategories]);

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setImagesFileState((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        startTransition(async () => {
            try {
                if (imagesFileState.length > 0) {
                    const uploadedImages = await Promise.all(
                        imagesFileState.map(async (fileState) => {
                            if (fileState.file instanceof File) {
                                const res = await edgestore.publicImages.upload(
                                    {
                                        file: fileState.file,
                                        input: { type: 'product' },
                                        onProgressChange: async (progress) => {
                                            updateFileProgress(
                                                fileState.key,
                                                progress,
                                            );
                                            if (progress === 100) {
                                                await new Promise((resolve) =>
                                                    setTimeout(resolve, 1000),
                                                );
                                                updateFileProgress(
                                                    fileState.key,
                                                    'COMPLETE',
                                                );
                                            }
                                        },
                                    },
                                );
                                return res as UploadedImageResponse;
                            }
                            return null;
                        }),
                    );

                    if (uploadedImages) {
                        const imageUrls = uploadedImages
                            .filter((res): res is { url: string } => !!res)
                            .map((res) => res.url);

                        const finalValues = {
                            ...values,
                            images: imageUrls,
                        };

                        await createProduct(finalValues);
                    }
                } else {
                    setError('No images were uploaded!');
                    return;
                }
            } catch (err) {
                console.error('Error uploading images', err);
                setError('There is an error, please try again later');
            }
        });
    };

    useEffect(() => {
        resetField('subCategory');
        resetField('detailCategory');
    }, [selectedCategory, resetField]);

    useEffect(() => {
        resetField('detailCategory');
    }, [selectedSubCategory, resetField]);

    return (
        <div className="">
            <LinkHierarchy />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Enter your product name"
                        />

                        <InputField
                            control={form.control}
                            name="type"
                            label="Type"
                            placeholder="Enter your product type"
                        />
                    </div>

                    <InputField
                        control={form.control}
                        name="description"
                        label="Description"
                        placeholder="Enter your product description"
                        type="text-aria"
                    />

                    <div className="grid grid-cols-3 gap-2">
                        <NumericInputField
                            control={form.control}
                            name="price"
                            label="Price"
                            placeholder="Enter your product price"
                        />
                        <NumericInputField
                            control={form.control}
                            name="quantity"
                            label="Quantity"
                            placeholder="Enter your product quantity"
                        />

                        <NumericInputField
                            control={form.control}
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
                        control={form.control}
                        name="colors"
                        label="Select Colors"
                        items={colors}
                        getItemKey={(color) => color.id}
                        renderItem={(color) => color.name}
                    />

                    <MultiImageDropzone
                        value={imagesFileState}
                        dropzoneOptions={{
                            maxFiles: 6,
                        }}
                        onChange={(files) => {
                            setError('');
                            setImagesFileState(files);
                        }}
                        onFilesAdded={async (addedFiles) => {
                            setError('');
                            setImagesFileState([
                                ...imagesFileState,
                                ...addedFiles,
                            ]);
                        }}
                    />
                    <FormError message={error} />

                    <Button disabled={isPending}>
                        Create Product
                        {isPending && (
                            <span
                                className="spinner-border spinner-border-sm ml-2 text-primary"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateProductForm;

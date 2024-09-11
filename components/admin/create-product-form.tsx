'use client';
import React, { useEffect, useMemo, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProductSchema } from '@/schema';
import { Color, Category, SubCategory, DetailCategory } from '@prisma/client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import LinkHierarchy from '@/components/admin/link-hierarchy';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { FormError } from '@/components/form-error';
import { createProduct } from '@/actions/controller-product';
import PopoverSelect from '@/components/popover-select';
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
    const [imagesFileState, setImagesFileState] = React.useState<FileState[]>(
        [],
    );
    const [isPending, startTransition] = useTransition();
    const { edgestore } = useEdgeStore();

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null,
    );
    const [selectedSubCategory, setSelectedSubCategory] =
        useState<SubCategory | null>(null);
    const [selectedDetailCategory, setSelectedDetailCategory] =
        useState<DetailCategory | null>(null);

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

    const filteredSubCategories = useMemo(() => {
        return subCategories.filter(
            (subCategory) => subCategory.categoryId === selectedCategory?.id,
        );
    }, [selectedCategory, subCategories]);

    const filteredDetailCategories = useMemo(() => {
        return detailCategories.filter(
            (detailCategory) =>
                detailCategory.subCategoryId === selectedSubCategory?.id,
        );
    }, [selectedSubCategory, detailCategories]);

    useEffect(() => {
        setSelectedSubCategory(null);
        setSelectedDetailCategory(null);
    }, [selectedCategory]);

    useEffect(() => {
        setSelectedDetailCategory(null);
    }, [selectedSubCategory]);

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

    return (
        <div className="h-full w-full p-10">
            <LinkHierarchy />
            <div className="mt-4 flex-1 rounded-2xl border border-gray-200 bg-slate-50 p-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <InputField
                            control={form.control}
                            name="name"
                            label="Name"
                            placeholder="Enter your product name"
                        />

                        <InputField
                            control={form.control}
                            name="description"
                            label="Description"
                            placeholder="Enter your product description"
                        />

                        <div className="flex justify-start space-x-2">
                            <div className="md:w-6/12">
                                <InputField
                                    control={form.control}
                                    name="type"
                                    label="Type"
                                    placeholder="Enter your product type"
                                />
                            </div>
                            <div className="md:w-6/12">
                                <NumericInputField
                                    control={form.control}
                                    name="capacity"
                                    label="Capacity"
                                    placeholder="Enter your product capacity"
                                />
                            </div>
                        </div>

                        <div className="flex justify-start space-x-2">
                            <div className="md:w-6/12">
                                <NumericInputField
                                    control={form.control}
                                    name="price"
                                    label="Price"
                                    placeholder="Enter your product price"
                                />
                            </div>
                            <div className="md:w-6/12">
                                <NumericInputField
                                    control={form.control}
                                    name="quantity"
                                    label="Quantity"
                                    placeholder="Enter your product quantity"
                                />
                            </div>
                        </div>

                        <div className="flex justify-start space-x-2">
                            <div className="w-2/6">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => {
                                        console.log(field.value);

                                        return (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>
                                                    Category :
                                                </FormLabel>
                                                <FormControl>
                                                    <PopoverSelect<Category>
                                                        items={categories}
                                                        renderItem={(item) =>
                                                            item.name
                                                        }
                                                        getItemKey={(item) =>
                                                            item.id
                                                        }
                                                        value={selectedCategory}
                                                        onChange={(value) => {
                                                            setSelectedCategory(
                                                                value,
                                                            );
                                                            field.onChange(
                                                                value?.id,
                                                            );
                                                        }}
                                                        placeholder="Select a category"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            </div>
                            <div className="w-2/6">
                                <FormField
                                    control={form.control}
                                    name="subCategory"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Sub Category :
                                            </FormLabel>
                                            <FormControl>
                                                <PopoverSelect<SubCategory>
                                                    items={
                                                        filteredSubCategories
                                                    }
                                                    renderItem={(item) =>
                                                        item.name
                                                    }
                                                    getItemKey={(item) =>
                                                        item.id
                                                    }
                                                    value={selectedSubCategory}
                                                    onChange={(value) => {
                                                        setSelectedSubCategory(
                                                            value,
                                                        );
                                                        field.onChange(
                                                            value?.id,
                                                        );
                                                    }}
                                                    placeholder={
                                                        selectedCategory
                                                            ? 'Select a subcategory'
                                                            : 'Select a category first'
                                                    }
                                                    disabled={!selectedCategory}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="w-2/6">
                                <FormField
                                    control={form.control}
                                    name="detailCategory"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Detail Category :
                                            </FormLabel>
                                            <FormControl>
                                                <PopoverSelect<DetailCategory>
                                                    items={
                                                        filteredDetailCategories
                                                    }
                                                    renderItem={(item) =>
                                                        item.name
                                                    }
                                                    getItemKey={(item) =>
                                                        item.id
                                                    }
                                                    value={
                                                        selectedDetailCategory
                                                    }
                                                    onChange={(value) => {
                                                        setSelectedDetailCategory(
                                                            value,
                                                        );
                                                        field.onChange(
                                                            value?.id,
                                                        );
                                                    }}
                                                    placeholder={
                                                        selectedSubCategory
                                                            ? 'Select a detail category'
                                                            : 'Select a subcategory first'
                                                    }
                                                    disabled={
                                                        !selectedSubCategory
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
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
        </div>
    );
};

export default CreateProductForm;

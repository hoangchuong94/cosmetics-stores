'use client';
import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from 'react';
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
import PageTitle from '@/components/page-title';
import { ProductSchema } from '@/schema';
import { FormError } from '@/components/form-error';
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
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, any>;
    path: {
        type: string;
    };
    pathOrder: string[];
}

const CreateProductForm = ({
    colors,
    categories,
    subCategories,
    detailCategories,
}: CreateProductFormProps) => {
    const [imagesFileState, setImagesFileState] = useState<FileState[]>([]);
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
            colors: [],
            images: [],
            category: undefined,
            subCategory: undefined,
            detailCategory: undefined,
        },
    });

    const { watch, resetField, handleSubmit, control } = form;

    const selectedCategory = watch('category');
    const selectedSubCategory = watch('subCategory');

    const filteredSubCategories = useMemo(() => {
        return selectedCategory
            ? subCategories.filter(
                  (subCat) => subCat.categoryId === selectedCategory.id,
              )
            : [];
    }, [selectedCategory, subCategories]);

    const filteredDetailCategories = useMemo(() => {
        return selectedSubCategory
            ? detailCategories.filter(
                  (detailCat) =>
                      detailCat.subCategoryId === selectedSubCategory.id,
              )
            : [];
    }, [selectedSubCategory, detailCategories]);

    const updateFileProgress = useCallback(
        (key: string, progress: FileState['progress']) => {
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
        },
        [],
    );

    const onSubmit = useCallback(
        async (values: z.infer<typeof ProductSchema>) => {
            startTransition(async () => {
                try {
                    if (imagesFileState.length > 0) {
                        const uploadPromises = imagesFileState.map(
                            (fileState) => {
                                if (fileState.file instanceof File) {
                                    return edgestore.publicImages.upload({
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
                                    });
                                }
                                return Promise.resolve(null);
                            },
                        );

                        const uploadResults =
                            await Promise.allSettled(uploadPromises);

                        const imageUrls = uploadResults
                            .filter(
                                (result) =>
                                    result.status === 'fulfilled' &&
                                    result.value !== null,
                            )
                            .map(
                                (result) =>
                                    (
                                        result as PromiseFulfilledResult<UploadedImageResponse>
                                    ).value.url,
                            );

                        if (imageUrls.length > 0) {
                            const finalValues = {
                                ...values,
                                images: imageUrls,
                                thumbnail: imageUrls[0],
                            };
                            console.log(finalValues);
                        } else {
                            setError('No images were uploaded!');
                        }
                    } else {
                        setError('No images were uploaded!');
                    }
                } catch (err) {
                    console.error('Error uploading images', err);
                    setError('There is an error, please try again later');
                }
            });
        },
        [imagesFileState, edgestore, updateFileProgress],
    );

    useEffect(() => {
        resetField('subCategory');
        resetField('detailCategory');
    }, [selectedCategory, resetField]);

    useEffect(() => {
        resetField('detailCategory');
    }, [selectedSubCategory, resetField]);

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                        <InputField
                            control={control}
                            name="name"
                            label="Name"
                            placeholder="Enter your product name"
                        />
                        <InputField
                            control={control}
                            name="type"
                            label="Type"
                            placeholder="Enter your product type"
                        />
                    </div>
                    <InputField
                        control={control}
                        name="description"
                        label="Description"
                        placeholder="Enter your product description"
                        type="text-aria"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <NumericInputField
                            control={control}
                            name="price"
                            label="Price"
                            placeholder="Enter your product price"
                        />
                        <NumericInputField
                            control={control}
                            name="quantity"
                            label="Quantity"
                            placeholder="Enter your product quantity"
                        />
                        <NumericInputField
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
                    <div>
                        <MultiImageDropzone
                            className="w-[200px]"
                            value={imagesFileState}
                            dropzoneOptions={{ maxFiles: 6 }}
                            onChange={(files) => {
                                setError('');
                                setImagesFileState(files);
                            }}
                            onFilesAdded={async (addedFiles) => {
                                setError('');
                                setImagesFileState((prevFiles) => [
                                    ...prevFiles,
                                    ...addedFiles,
                                ]);
                            }}
                        />
                    </div>
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

'use client';
import React, { useCallback, useEffect, useState, useTransition } from 'react';
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
import { useImageUploader } from '@/hooks/use-upload-images';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { ProductWithDetails, UploadedImage } from '@/types';
import {
    FileState,
    MultiImageDropzone,
} from '@/components/multi-image-dropzone';
import { FormError } from '@/components/form-error';
import { SingleImageDropzone } from '../single-image-dropzone';
import { updateProduct } from '@/actions/controller-product';

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
    const { edgestore } = useEdgeStore();
    const [isUploading, setIsUploading] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { fileStates, setFileStates, uploadImages } = useImageUploader();
    const [fileThumbnail, setFileThumbnail] = useState<File | undefined>();
    const [errorMessageUpdateThumbnail, setErrorMessageUpdateThumbnail] =
        useState<string | undefined>();
    const [errorMessageUploadImages, setErrorMessageUploadImages] = useState<
        string | undefined
    >();

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
            imageUrls: product.images.map((item) => item.image.url),
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

    const handleOnChange = (files: FileState[]) => {
        setFileStates(files);
    };

    const createFileFromUrl = async (url: string, fileName: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: blob.type });
        return file;
    };

    const handleUpdateThumbnail = useCallback(
        async (file: File) => {
            if (file) {
                try {
                    const res = await edgestore.publicImages.upload({
                        file,
                        input: { type: 'product' },
                        options: {
                            temporary: true,
                        },
                        onProgressChange: (progress) => {
                            console.log(progress);
                        },
                    });
                    return res.url;
                } catch (error: unknown) {
                    console.error('Upload failed:', error);
                    setErrorMessageUpdateThumbnail(
                        'Thumbnail image failed to upload',
                    );
                    return null;
                }
            } else {
                setErrorMessageUpdateThumbnail('Invalid file error');
                return null;
            }
        },
        [edgestore.publicImages],
    );

    const handleUpdateImages = async (files: FileState[]) => {
        try {
            const imageUploader = await uploadImages(files);
            const validImages = imageUploader.filter(
                (img): img is UploadedImage =>
                    img !== null && img !== undefined,
            );
            if (validImages.length === files.length) {
                return validImages.map((item) => item?.url);
            } else {
                return null;
            }
        } catch (error) {
            setErrorMessageUploadImages(
                'Update images error . please try again',
            );
            return null;
        }
    };

    const handleDeleteImage = async (urls: string[], edgestore: any) => {
        const deletePromises = urls.map(async (item) => {
            try {
                await edgestore.publicImages.delete({
                    url: item,
                });
            } catch (error) {
                console.error(error);
            }
        });

        await Promise.all(deletePromises);
    };

    useEffect(() => {
        const hasError = fileStates.some((item) => item.progress === 'ERROR');
        setErrorMessageUploadImages(
            hasError ? 'Error uploading images' : undefined,
        );
    }, [fileStates]);

    useEffect(() => {
        const loadImagesForUrls = async () => {
            if (product.images.length > 0) {
                const initialImagesUploaded = await Promise.all(
                    product.images.map(async (item) => {
                        const fileName = item.image.url.split('/').pop();
                        const file = await createFileFromUrl(
                            item.image.url,
                            fileName!,
                        );

                        return {
                            file: file,
                            key: item.image.id,
                            progress: 'PENDING',
                        } as FileState;
                    }),
                );

                setFileStates(initialImagesUploaded);
            }
        };
        loadImagesForUrls();
    }, [product.images, setFileStates]);

    useEffect(() => {
        const loadThumbnailFromUrl = async () => {
            try {
                if (product.thumbnail) {
                    const fileName = product.thumbnail.split('/').pop();
                    const currentThumbnail = await createFileFromUrl(
                        product.thumbnail,
                        fileName!,
                    );

                    setFileThumbnail(currentThumbnail);
                }
            } catch (error) {
                console.error('Error loading thumbnail:', error);
            }
        };

        loadThumbnailFromUrl();
    }, [product.thumbnail]);

    const onSubmit = async (values: z.infer<typeof ProductSchema>) => {
        try {
            setIsUploading(true);
            if (fileStates.length > 0 && fileThumbnail !== undefined) {
                const updateImageUrls = await handleUpdateImages(fileStates);
                const updateThumbnailUrls =
                    await handleUpdateThumbnail(fileThumbnail);
                if (updateImageUrls && updateThumbnailUrls) {
                    await handleDeleteImage(
                        [
                            ...product.images.map((item) => item.image.url),
                            product.thumbnail,
                        ],
                        edgestore,
                    );

                    startTransition(async () => {
                        const newProduct = {
                            ...values,
                            imageUrls: updateImageUrls,
                            thumbnailUrl: updateThumbnailUrls,
                        };

                        const productUploaded = await updateProduct(
                            product.id,
                            newProduct,
                        );
                        const now = new Date();
                        const formattedDate = new Intl.DateTimeFormat('en-US', {
                            dateStyle: 'long',
                            timeStyle: 'short',
                        }).format(now);
                        if (productUploaded) {
                            const uploadPromises = updateImageUrls.map((url) =>
                                edgestore.publicImages.confirmUpload({ url }),
                            );
                            await Promise.all(uploadPromises);

                            await edgestore.publicImages.confirmUpload({
                                url: updateThumbnailUrls,
                            });
                            toast({
                                title: 'The product has been successfully update',
                                description: formattedDate,
                            });
                        } else {
                            toast({
                                title: 'An error occurred during the product updating process',
                                description: formattedDate,
                            });
                        }
                    });
                }
            }
        } catch (error) {
            toast({
                title: 'Update Error',
                description: 'Failed to update product. Please try again.',
            });
        } finally {
            setIsUploading(false);
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

                        <div>
                            <p className="mb-2 text-sm">Thumbnail :</p>
                            <div className="flex min-w-full items-center justify-center rounded-md bg-white shadow-md">
                                <SingleImageDropzone
                                    className="mt-2 bg-white"
                                    width={200}
                                    height={200}
                                    value={fileThumbnail}
                                    onChange={(newFile) => {
                                        setFileThumbnail(newFile);
                                        setErrorMessageUpdateThumbnail(
                                            undefined,
                                        );
                                    }}
                                />
                            </div>
                            <p className="mt-3 text-xs text-red-600">
                                {errorMessageUpdateThumbnail}
                            </p>
                        </div>

                        <div>
                            <p className="mb-2 text-sm">Images :</p>
                            <MultiImageDropzone
                                className={`${!(fileStates.length > 0) && 'h-[150px] w-[150px]'} bg-white`}
                                value={fileStates}
                                dropzoneOptions={{
                                    maxFiles: 6,
                                }}
                                onChange={handleOnChange}
                            />
                            <FormError message={errorMessageUploadImages} />
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isUploading || isPending}
                        >
                            {isPending || isUploading ? (
                                <LoadingSpinner />
                            ) : (
                                'Update Product'
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProductForm;

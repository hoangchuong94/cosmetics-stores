'use client';
import React, { useEffect, useTransition } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, SubCategory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { UpdateProductSchema } from '@/schema';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { ProductWithDetails, UploadedImage } from '@/types';
import {
    MultiImageDropzone,
    FileState,
} from '@/components/upload-image/multi-image-dropzone';
import { useImageUploader } from '@/hooks/use-upload-images';

interface ProductUpdate extends ProductWithDetails {
    subCategory: SubCategory;
    category: Category;
}

interface ImagesType {
    urlsConfirm: string[];
    fileStates: FileState[];
}

interface UpdateProductProps {
    product: ProductUpdate;
}

const UpdateProduct = ({ product }: UpdateProductProps) => {
    const [isPending, startTransition] = useTransition();
    const { fileStates, setFileStates, uploadImages } = useImageUploader();

    const loadImagesForUrls = () => {
        if (product.images.length > 0) {
            const initialImagesUploaded = product.images.map((item) => {
                const fileState: FileState = {
                    file: item.image.url,
                    key: item.image.id,
                    progress: 'PENDING',
                };
                return fileState;
            });

            return initialImagesUploaded;
        }
        return [];
    };

    const form = useForm<z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            images: {
                urlsConfirm: product.images.map((item) => item.image.url),
                fileStates: loadImagesForUrls(),
            },
        },
    });

    const handleOnChange = (
        filesAdd: FileState[],
        onChange: (...event: any[]) => void,
    ) => {
        if (filesAdd) {
            const urlFilesAdd = filesAdd.reduce<string[]>((acc, item) => {
                if (typeof item.file === 'string') {
                    acc.push(item.file);
                }
                return acc;
            }, []);
            const object: ImagesType = {
                urlsConfirm: urlFilesAdd,
                fileStates: filesAdd,
            };
            onChange(object);
        } else {
            const object: ImagesType = {
                urlsConfirm: [],
                fileStates: [],
            };
            onChange(object);
        }
    };

    const handleOnFilesAdded = async (
        addedFiles: FileState[],
        onChange: (...event: any[]) => void,
    ) => {
        // setFileStates((prevFileStates) => [...prevFileStates, ...addedFiles]);
        const imageUploader = await uploadImages(addedFiles);
        console.log(addedFiles);
        // try {
        //     const imageUploader = await uploadImages(addedFiles);
        //     const validImages = imageUploader.filter(
        //         (img): img is UploadedImage =>
        //             img !== null && img !== undefined,
        //     );
        //     const imageUrlsUploaded = validImages.map((item) => item.url);
        //     const object: ImagesType = {
        //         urlsConfirm: imageUrlsUploaded,
        //         fileStates: fileStates,
        //     };
        //     console.log(object);
        // } catch (error) {
        //     console.error('Failed to upload images:', error);
        // }
    };

    const onSubmit = async (values: z.infer<typeof UpdateProductSchema>) => {
        startTransition(async () => {
            console.log(values);
        });
    };

    return (
        <div className="flex min-h-full w-full flex-col items-start justify-start bg-slate-100 p-4">
            <div className="mb-6 w-full">
                <LinkHierarchy />
            </div>
            <div className="w-full">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-2"
                    >
                        <FormField
                            control={form.control}
                            name="images"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Thumbnail :</FormLabel>
                                        <FormControl>
                                            <MultiImageDropzone
                                                className={`${!(field.value.fileStates.length > 0) && 'h-[200px] w-[200px]'} bg-white`}
                                                value={field.value.fileStates}
                                                dropzoneOptions={{
                                                    maxFiles: 6,
                                                }}
                                                onChange={(filesAdd) =>
                                                    handleOnChange(
                                                        filesAdd,
                                                        field.onChange,
                                                    )
                                                }
                                                onFilesAdded={(filesAdd) => {
                                                    // const files = [
                                                    //     ...field.value
                                                    //         .fileStates,
                                                    //     ...filesAdd,
                                                    // ];
                                                    handleOnFilesAdded(
                                                        filesAdd,
                                                        field.onChange,
                                                    );
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <Button disabled={isPending}>
                            {isPending && <LoadingSpinner />}
                            Update Product
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default UpdateProduct;

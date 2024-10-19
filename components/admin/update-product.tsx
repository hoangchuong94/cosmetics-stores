'use client';
import React, { useState, useTransition } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, SubCategory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { UpdateProductSchema } from '@/schema';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { ProductWithDetails } from '@/types';
import { SingleImageDropzone } from '@/components/upload-image/single-image-dropzone';
import UploadImage from '@/components/upload-image/upload-image';
interface ProductUpdate extends ProductWithDetails {
    subCategory: SubCategory;
    category: Category;
}

interface UpdateProductProps {
    product: ProductUpdate;
}

const UpdateProduct = ({ product }: UpdateProductProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof UpdateProductSchema>>({
        resolver: zodResolver(UpdateProductSchema),
        defaultValues: {
            thumbnailUrl: product.thumbnail,
        },
    });

    const [thumbnailFile, setThumbnailFile] = React.useState<
        string | undefined | File
    >(product.thumbnail);

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
                            name="thumbnailUrl"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Thumbnail :</FormLabel>
                                        <FormControl>
                                            <UploadImage
                                                file={thumbnailFile}
                                                setFile={setThumbnailFile}
                                                setUrl={field.onChange}
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

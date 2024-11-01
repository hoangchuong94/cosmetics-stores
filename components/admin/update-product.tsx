'use client';
import {
    MultiImageDropzone,
    FileState,
} from '@/components/edgestore/multi-image-dropzone';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import React, { useEffect, useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Category, SubCategory } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Image } from '@/schema';
import LinkHierarchy from '@/components/link-hierarchy';
import LoadingSpinner from '@/components/loading-and-stream/loading-spinner';
import { ProductWithDetails } from '@/types';
import UploadImages from '@/components/edgestore/uploader-images';

interface ProductUpdate extends ProductWithDetails {
    subCategory: SubCategory;
    category: Category;
}

interface UpdateProductProps {
    product: ProductUpdate;
}

const UpdateProduct = ({ product }: UpdateProductProps) => {
    const [isPending, startTransition] = useTransition();

    const initialFileStates: FileState[] = product.images.map((item) => ({
        file: item.image.url,
        key: item.image.id,
        progress: 'COMPLETE',
    }));

    const initialUrls = product.images.map((item) => item.image.url);

    const [urls, setUrls] = useState<string[]>(initialUrls);

    const form = useForm<z.infer<typeof Image>>({
        resolver: zodResolver(Image),
        defaultValues: {
            images: initialFileStates,
        },
    });

    console.log(urls);

    const onSubmit = async (values: z.infer<typeof Image>) => {
        startTransition(async () => {
            console.log('Form submitted with values:', {
                ...values,
            });
            form.reset();
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
                                console.log(field.value);
                                return (
                                    <FormItem>
                                        <FormLabel>Images</FormLabel>
                                        <FormControl>
                                            <UploadImages
                                                setUrls={setUrls}
                                                initialFileStates={field.value}
                                                onChange={field.onChange}
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

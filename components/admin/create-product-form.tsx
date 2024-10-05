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
import { useEdgeStore } from '@/lib/edgestore';

import { zodResolver } from '@hookform/resolvers/zod';
import { Color, Category, SubCategory, DetailCategory } from '@prisma/client';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProductSchema } from '@/schema';

import {
    CheckboxField,
    InputField,
    NumericInputField,
    SelectField,
} from '@/components/custom-field';
import { useFilteredCategories } from '@/hooks/use-filtered-categories';
import UploadImages from '@/components/upload-images';
import UploadThumbnail from '@/components/upload-thumbnail';
import { createProduct } from '@/actions/controller-product';
import { useToast } from '@/hooks/use-toast';
import LinkHierarchy from '@/components/link-hierarchy';
import { useImageUploader } from '@/hooks/use-upload-images';
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

    const { fileStates, setFileStates, uploadImages, updateFileProgress } =
        useImageUploader();

    const [file, setFile] = useState<File | undefined>(undefined);

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
            type: '',
            price: 0,
            quantity: 0,
            capacity: 0,
            thumbnailUrl: '',
            colors: [],
            imagesUrl: [],
            category: undefined,
            subCategory: undefined,
            detailCategory: undefined,
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
            console.log(thumbnailUrl);
            imageUrls.forEach(async (url) => {
                await edgestore.publicFiles.confirmUpload({
                    url: url,
                });
            });

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
                        title: 'The product has been successfully created',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                    });
                    form.reset();
                    setFileStates([]);
                    setFile(undefined);
                } else {
                    toast({
                        title: 'An error occurred during the product creation process',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
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
                                    type="text-aria"
                                />
                            </div>
                        </div>

                        <UploadImages
                            fileStates={fileStates}
                            setFileStates={setFileStates}
                            updateFileProgress={updateFileProgress}
                            uploadImages={uploadImages}
                            imageUrls={imageUrls}
                            setImageUrls={setImageUrls}
                        />

                        <Button disabled={isPending} className="w-full">
                            Create Product
                            {isPending && <LoadingSpinner />}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default CreateProductForm;

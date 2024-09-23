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
import { ProductSchema } from '@/schema';
import {
    CheckboxField,
    InputField,
    NumericInputField,
    SelectField,
} from '@/components/custom-field';
import { useFilteredCategories } from '@/hooks/use-filtered-categories';

import { FileState } from '@/components/multi-image-dropzone';
import { useImageUploader } from '@/hooks/use-upload-images';
import UploadThumbnail from '@/components/upload-thumbnail';
import UploadImages from '@/components/upload-images';

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
    const [isPending, startTransition] = useTransition();
    const [urlsImage, setUrlsImage] = useState<string[] | undefined>();

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
            images: [],
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
        startTransition(async () => {});
    };

    return (
        <div className="min-h-full bg-slate-100 p-4">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

                    {/* <div className="flex flex-row space-x-2">
                        <UploadThumbnail />
                        <div className="w-full">
                            <InputField
                                className="h-[202px] bg-white"
                                control={control}
                                name="description"
                                label="Description"
                                placeholder="Enter your product description"
                                type="text-aria"
                            />
                        </div>
                    </div> */}

                    <UploadImages
                        urlsImage={urlsImage}
                        setUrlsImage={setUrlsImage}
                    />

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

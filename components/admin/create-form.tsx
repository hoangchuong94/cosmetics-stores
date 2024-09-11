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
import { Input } from '@/components/ui/input';
import { CustomSelect } from '@/components/custom-select';

interface CreateProductFormProps {
    colors: Color[];
    categories: Category[];
    subCategories: SubCategory[];
    detailCategories: DetailCategory[];
}

const CreateForm = ({
    colors,
    categories,
    subCategories,
    detailCategories,
}: CreateProductFormProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            category: null,
            subCategory: null,
            detailCategory: null,
        },
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        startTransition(async () => {
            console.log(values);
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
                        <div className="grid grid-cols-3 space-x-1">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Category :</FormLabel>
                                            <FormControl></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="subCategory"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Sub category :
                                            </FormLabel>
                                            <FormControl></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name="detailCategory"
                                render={({ field }) => {
                                    return (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>
                                                Detail category :
                                            </FormLabel>
                                            <FormControl></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>

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

export default CreateForm;

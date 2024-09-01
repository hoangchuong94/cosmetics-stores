'use client';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProductSchema } from '@/schema';
import { Color, Category } from '@prisma/client';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LinkHierarchy from '@/components/admin/link-hierarchy';
import Select from '@/components/select';

interface CreateProductFormProps {
    colors: Color[];
    categories: Category[];
}

interface Product {
    name: string;
    description: string;
    type: string;
    price: number;
    colors: Color[];
    categories: Category[];
}

const CreateProductForm = ({ colors, categories }: CreateProductFormProps) => {
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
            type: '',
            price: '',
            colors: [],
            categories: [],
        },
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        startTransition(async () => {
            console.log(values);
        });
    };

    return (
        <div className="flex h-full w-full flex-col p-10">
            <LinkHierarchy />
            <div className="mt-4 flex-1 rounded-2xl border border-gray-200 bg-slate-50 p-4">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter your product name"
                                            type="text"
                                            className="border border-gray-300 bg-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter your product description"
                                            type="text"
                                            className="border border-gray-300 bg-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Type :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter your type product"
                                            type="text"
                                            className="border border-gray-300 bg-white"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price :</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            placeholder="Enter your product price"
                                            type="number"
                                            pattern="[0-9]*"
                                            inputMode="numeric"
                                            className="border border-gray-300 bg-white"
                                            step="0.01"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="colors"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Color :</FormLabel>
                                        <FormControl>
                                            <Select<Color>
                                                items={colors}
                                                getItemKey={(color) => color.id}
                                                renderItem={(color) =>
                                                    color.name
                                                }
                                                field={field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="categories"
                            render={({ field }) => {
                                return (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Category :</FormLabel>
                                        <FormControl>
                                            <Select<Category>
                                                items={categories}
                                                getItemKey={(Category) =>
                                                    Category.id
                                                }
                                                renderItem={(Category) =>
                                                    Category.name
                                                }
                                                field={field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
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
        </div>
    );
};

export default CreateProductForm;

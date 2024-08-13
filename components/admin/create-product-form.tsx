'use client';
import Modal from '@/components/modal';
import React, { useTransition } from 'react';
import useSWR from 'swr';
import fetcher from '@/lib/fetcher';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProductSchema } from '@/schema';
import { Color } from '@prisma/client';
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
import { ComboboxDemo } from '../check-box';

interface CreateProductFormProps {
    listColor: Color[];
}

const CreateProductForm = () => {
    const [isPending, startTransition] = useTransition();
    const { data, error, isValidating } = useSWR<Color[]>(
        '/api/color',
        fetcher,
    );

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        startTransition(async () => {
            alert('submit create products');
        });
    };

    return (
        <Modal label="Create" title={'Create Product Form'}>
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
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter your name product"
                                        type="text"
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
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter your product description"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ComboboxDemo />
                    {/* <ProductChoice listColor={listColor} /> */}

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
        </Modal>
    );
};

export default CreateProductForm;

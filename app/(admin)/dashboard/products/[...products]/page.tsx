'use client';
import React, { useTransition } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ProductSchema } from '@/schema';
import LinkHierarchy from '@/components/admin/link-hierarchy';
import Search from '@/components/search';
import { Separator } from '@/components/ui/separator';
import ColorPicker from '@/components/color-picker';
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

export default function CreateProduct() {
    const [isPending, startTransition] = useTransition();
    const [fileStates, setFileStates] = React.useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    const form = useForm<z.infer<typeof ProductSchema>>({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    const onSubmit = (values: z.infer<typeof ProductSchema>) => {
        startTransition(async () => {
            if (fileStates) {
                await Promise.all(
                    fileStates.map(async (addedFileState) => {
                        if (addedFileState.file instanceof File) {
                            try {
                                const res = await edgestore.publicImages.upload(
                                    {
                                        file: addedFileState.file,
                                        input: { type: 'product' },
                                        onProgressChange: async (progress) => {
                                            updateFileProgress(
                                                addedFileState.key,
                                                progress,
                                            );
                                            if (progress === 100) {
                                                // wait 1 second to set it to complete
                                                // so that the user can see the progress bar at 100%
                                                await new Promise((resolve) =>
                                                    setTimeout(resolve, 1000),
                                                );
                                                updateFileProgress(
                                                    addedFileState.key,
                                                    'COMPLETE',
                                                );
                                            }
                                        },
                                    },
                                );
                                console.log(res);
                            } catch (err) {
                                updateFileProgress(addedFileState.key, 'ERROR');
                            }
                        }
                    }),
                );
            }
        });
    };

    return (
        <div className="flex flex-col rounded-3xl bg-white">
            <div className="flex flex-row items-center justify-between p-5">
                <LinkHierarchy />
                <Search />
            </div>
            <Separator />
            <div className="p-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
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
                                            placeholder="Enter your name product "
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

                        {/* <MultiImageDropzone
                            value={fileStates}
                            dropzoneOptions={{
                                maxFiles: 6,
                            }}
                            onChange={(files) => {
                                setFileStates(files);
                            }}
                            onFilesAdded={async (addedFiles) => {
                                setFileStates([...fileStates, ...addedFiles]);
                            }}
                        /> */}

                        <Button
                            className={`mt-6 w-full uppercase ${isPending && 'bg-gray-700'}`}
                            aria-disabled={isPending}
                            disabled={isPending}
                            type="submit"
                        >
                            Create a new product
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}

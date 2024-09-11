'use client';
import React, {
    startTransition,
    useEffect,
    useMemo,
    useState,
    useTransition,
} from 'react';
import * as z from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useEdgeStore } from '@/lib/edgestore';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';

import { ImageSchema } from '@/schema';
import { FormError } from '@/components/form-error';
import { uploadFiles } from '@/actions/upload-images';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
const TestUploadFile = () => {
    const [imagesFileState, setImagesFileState] = React.useState<FileState[]>(
        [],
    );
    const { edgestore } = useEdgeStore();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | undefined>('');

    const form = useForm({
        resolver: zodResolver(ImageSchema),
        defaultValues: {},
    });

    const onSubmit = async () => {
        startTransition(async () => {
            if (imagesFileState.length > 0) {
                const imageUrls = await uploadFiles(
                    imagesFileState,
                    edgestore,
                    setImagesFileState,
                );
                console.log(imageUrls);
            }
        });
    };
    return (
        <div className="p-10">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-3">
                        <MultiImageDropzone
                            value={imagesFileState}
                            dropzoneOptions={{
                                maxFiles: 6,
                            }}
                            onChange={(files) => {
                                setError('');
                                setImagesFileState(files);
                            }}
                            onFilesAdded={async (addedFiles) => {
                                setError('');
                                setImagesFileState([
                                    ...imagesFileState,
                                    ...addedFiles,
                                ]);
                            }}
                        />
                    </div>
                    <FormError message={error} />

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

export default TestUploadFile;

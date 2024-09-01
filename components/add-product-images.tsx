'use client';
import * as z from 'zod';
import React, { useTransition } from 'react';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { ProductSchema } from '@/schema';

const AddProductImages = () => {
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
        <MultiImageDropzone
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
        />
    );
};

export default AddProductImages;

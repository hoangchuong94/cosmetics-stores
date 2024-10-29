'use client';

import { useCallback, useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { type FileState } from '@/components/edgestore/multi-image-dropzone';

export function useImageUploader() {
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    const updateFileProgress = useCallback(
        (key: string, progress: FileState['progress']) => {
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
        },
        [],
    );

    const uploadImages = useCallback(
        async (addedFiles: FileState[]) => {
            const data = await Promise.all(
                addedFiles.map(async (fileState) => {
                    if (fileState.file instanceof File) {
                        try {
                            const res = await edgestore.publicImages.upload({
                                file: fileState.file,
                                input: { type: 'product' },
                                options: {
                                    temporary: true,
                                },
                                onProgressChange: async (progress) => {
                                    updateFileProgress(fileState.key, progress);
                                    if (progress === 100) {
                                        await new Promise((resolve) =>
                                            setTimeout(resolve, 1000),
                                        );
                                        console.log(progress);
                                        updateFileProgress(
                                            fileState.key,
                                            'COMPLETE',
                                        );
                                    }
                                },
                            });
                            return res;
                        } catch (err: any) {
                            updateFileProgress(fileState.key, 'ERROR');
                        }
                    } else {
                        updateFileProgress(fileState.key, 'ERROR');
                    }
                }),
            );
            return data;
        },
        [edgestore, updateFileProgress],
    );

    return {
        fileStates,
        setFileStates,
        uploadImages,
    };
}

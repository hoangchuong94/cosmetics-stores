import { useCallback, useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { type FileState } from '@/components/multi-image-dropzone';

export function useImageUploader() {
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
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
                                        updateFileProgress(
                                            fileState.key,
                                            'COMPLETE',
                                        );
                                    }
                                },
                            });
                            return res;
                        } catch (err) {
                            updateFileProgress(fileState.key, 'ERROR');
                            console.error(
                                `update image upload field ${fileState.key}`,
                            );
                            return undefined;
                        }
                    } else {
                        console.error(`Invalid file type for ${fileState.key}`);
                        updateFileProgress(fileState.key, 'ERROR');
                        return undefined;
                    }
                }),
            );

            const hasError = data.some((item) => item === undefined);
            if (hasError) {
                setErrorMessage('error images upload');
                return [];
            }

            const urlsImageUploadAllComplete = data.filter(
                (item) => item !== undefined && item !== null,
            );

            return urlsImageUploadAllComplete;
        },
        [edgestore, updateFileProgress],
    );

    return {
        errorMessage,
        fileStates,
        setErrorMessage,
        setFileStates,
        uploadImages,
        updateFileProgress,
    };
}

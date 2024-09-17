import { useState } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { type FileState } from '@/components/multi-image-dropzone';

interface UploadResponse {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: { type: string };
    pathOrder: 'type'[];
}

export function useImageUploader() {
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    const updateFileProgress = (
        key: string,
        progress: FileState['progress'],
    ) => {
        setFileStates((prevState) =>
            prevState.map((fileState) =>
                fileState.key === key && fileState.progress !== progress
                    ? { ...fileState, progress }
                    : fileState,
            ),
        );
    };

    const handleUpload = async (addedFiles: FileState[]): Promise<string[]> => {
        addedFiles.forEach((item) => console.log('addedFiles', item));
        try {
            setFileStates((prev) => [...prev, ...addedFiles]);

            const uploadResults = await Promise.allSettled(
                addedFiles.map(async (fileState) => {
                    if (!(fileState.file instanceof File))
                        throw new Error(`Invalid file: ${fileState.key}`);

                    try {
                        const res = await edgestore.publicImages.upload({
                            file: fileState.file,
                            input: { type: 'product' },
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
                    } catch (error) {
                        updateFileProgress(fileState.key, 'ERROR');
                    }
                }),
            );

            const allSuccess = uploadResults.every(
                (result): result is PromiseFulfilledResult<UploadResponse> =>
                    result.status === 'fulfilled',
            );

            if (allSuccess) {
                const imageUrls = uploadResults
                    .filter(
                        (
                            result,
                        ): result is PromiseFulfilledResult<UploadResponse> =>
                            result.status === 'fulfilled',
                    )
                    .map((result) => result.value.thumbnailUrl)
                    .filter((url): url is string => url !== null);

                return imageUrls;
            } else {
                return [];
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error('Error uploading files:', err.message);
                console.error('Stack trace:', err.stack);
            } else {
                console.error('Unknown error:', err);
            }
            return [];
        }
    };

    return {
        fileStates,
        setFileStates,
        handleUpload,
    };
}

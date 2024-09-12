import { useState, useCallback } from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import type { FileState } from '@/components/multi-image-dropzone';

export const useImageUploader = () => {
    const [imagesFileState, setImagesFileState] = useState<FileState[]>([]);
    const [error, setError] = useState<string | undefined>('');
    const { edgestore } = useEdgeStore();

    const updateFileProgress = useCallback(
        (key: string, progress: FileState['progress']) => {
            setImagesFileState((prevState) =>
                prevState.map((fileState) =>
                    fileState.key === key && fileState.progress !== progress
                        ? { ...fileState, progress }
                        : fileState,
                ),
            );
        },
        [],
    );

    const uploadImages = useCallback(async () => {
        if (!imagesFileState.length) {
            setError('No images to upload!');
            return [];
        }
        try {
            const uploadPromises = imagesFileState.map(async (fileState) => {
                if (!(fileState.file instanceof File))
                    throw new Error(`Invalid file: ${fileState.key}`);

                const result = await edgestore.publicImages.upload({
                    file: fileState.file,
                    input: { type: 'product' },
                    onProgressChange: (progress) =>
                        updateFileProgress(fileState.key, progress),
                });
                updateFileProgress(fileState.key, 'COMPLETE');
                return result.url;
            });

            const imageUrls = await Promise.all(uploadPromises);

            return imageUrls;
        } catch (err) {
            console.error('Upload failed:', err);
            setError('Failed to upload all images. Please try again.');
            return [];
        }
    }, [imagesFileState, edgestore, updateFileProgress]);

    return {
        imagesFileState,
        setImagesFileState,
        uploadImages,
        error,
        setError,
    };
};

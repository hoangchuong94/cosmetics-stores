import { type FileState } from '@/components/multi-image-dropzone';

interface UploadedImagesResponse {
    url: string;
    thumbnailUrl: string | null;
    size: number;
    uploadedAt: Date;
    metadata: Record<string, never>;
    path: {
        type: string;
    };
    pathOrder: 'type'[];
}

function updateFileProgress(
    key: string,
    progress: FileState['progress'],
    setImagesFileState: React.Dispatch<React.SetStateAction<FileState[]>>,
) {
    setImagesFileState((fileStates) => {
        const index = fileStates.findIndex(
            (fileState) => fileState.key === key,
        );
        if (index !== -1) {
            const updatedFileState = { ...fileStates[index], progress };
            const newFileStates = [
                ...fileStates.slice(0, index),
                updatedFileState,
                ...fileStates.slice(index + 1),
            ];
            return newFileStates;
        }
        return fileStates;
    });
}

export async function uploadImages(
    fileStates: FileState[],
    edgestore: any,
    setImagesFileState: React.Dispatch<React.SetStateAction<FileState[]>>,
): Promise<UploadedImagesResponse[] | null> {
    const uploadedImages = await Promise.all(
        fileStates.map(async (fileState) => {
            if (fileState.file instanceof File) {
                try {
                    const res: UploadedImagesResponse | null =
                        await edgestore.publicImages.upload({
                            file: fileState.file,
                            input: { type: 'product' },
                            onProgressChange: async (progress: number) => {
                                updateFileProgress(
                                    fileState.key,
                                    progress,
                                    setImagesFileState,
                                );
                                if (progress === 100) {
                                    await new Promise((resolve) =>
                                        setTimeout(resolve, 1000),
                                    );
                                    updateFileProgress(
                                        fileState.key,
                                        'COMPLETE',
                                        setImagesFileState,
                                    );
                                }
                            },
                        });
                    console.log(res);
                    return res;
                } catch (error) {
                    console.error(
                        `Error uploading file ${fileState.key}`,
                        error,
                    );
                    return null;
                }
            }
            return null;
        }),
    );

    return uploadedImages.filter((res): res is UploadedImagesResponse => !!res);
}

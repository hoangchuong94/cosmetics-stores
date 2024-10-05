'use client';

import React, {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';
import { useImageUploader } from '@/hooks/use-upload-images';
import { FormError } from '@/components/form-error';

interface UploadedImage {
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

interface UploadImagesProps {
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    fileStates: FileState[];
    setFileStates: Dispatch<SetStateAction<FileState[]>>;
    uploadImages: (
        addedFiles: FileState[],
    ) => Promise<(UploadedImage | undefined)[]>;
    updateFileProgress: (key: string, progress: FileState['progress']) => void;
}

export default function UploadImages({
    imageUrls,
    setImageUrls,
    fileStates,
    setFileStates,
    uploadImages,
    updateFileProgress,
}: UploadImagesProps) {
    const [imageUploaded, setImageUploaded] = useState<UploadedImage[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const handleOnFilesAdded = useCallback(
        async (addedFiles: FileState[]) => {
            const imageUploader = await uploadImages(addedFiles);

            const validImages = imageUploader.filter(
                (img): img is UploadedImage =>
                    img !== null && img !== undefined,
            );

            setImageUploaded((prev) => [...prev, ...validImages]);
        },
        [uploadImages, setImageUploaded],
    );

    const handleOnChange = (files: FileState[]) => {
        setFileStates(files);
    };

    useEffect(() => {
        const hasError = fileStates.some((item) => item.progress === 'ERROR');
        setErrorMessage(hasError ? 'Error uploading images' : undefined);
    }, [fileStates]);

    useEffect(() => {
        if (fileStates.length === imageUploaded.length) {
            setImageUrls(imageUploaded.map((item) => item.url));
        }
    }, [imageUploaded, setImageUrls, fileStates]);

    return (
        <div>
            <p className="mb-1 text-sm">Images :</p>
            <MultiImageDropzone
                className={`${!(fileStates.length > 0) && 'h-[150px] w-[150px]'} bg-white`}
                value={fileStates}
                dropzoneOptions={{
                    maxFiles: 6,
                }}
                onChange={handleOnChange}
                onFilesAdded={handleOnFilesAdded}
            />
            <FormError message={errorMessage} />
        </div>
    );
}

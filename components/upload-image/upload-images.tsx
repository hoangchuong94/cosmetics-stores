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
} from '@/components/upload-image/multi-image-dropzone';
import { FormError } from '@/components/form-error';
import { UploadedImage } from '@/types';

interface UploadImagesProps {
    imageUrls: string[];
    setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
    fileStates: FileState[];
    setFileStates: Dispatch<SetStateAction<FileState[]>>;
    uploadImages: (
        addedFiles: FileState[],
    ) => Promise<(UploadedImage | undefined)[]>;
}

export default function UploadImages({
    imageUrls,
    setImageUrls,
    fileStates,
    setFileStates,
    uploadImages,
}: UploadImagesProps) {
    const [errorMessage, setErrorMessage] = useState<string | undefined>();

    const handleOnFilesAdded = useCallback(
        async (addedFiles: FileState[]) => {
            setFileStates((prevFileStates) => [
                ...prevFileStates,
                ...addedFiles,
            ]);

            try {
                const imageUploader = await uploadImages(addedFiles);

                const validImages = imageUploader.filter(
                    (img): img is UploadedImage =>
                        img !== null && img !== undefined,
                );
                const imageUrlsUploaded = validImages.map((item) => item.url);
                setImageUrls((prev) => [...prev, ...imageUrlsUploaded]);
            } catch (error) {
                console.error('Failed to upload images:', error);
                setErrorMessage('Failed to upload images. Please try again.');
            }
        },
        [uploadImages, setImageUrls, setFileStates],
    );

    const handleOnChange = (files: FileState[]) => {
        const listFilename = files.map((item) => {
            if (item.file instanceof File) {
                return item.file.name;
            }
        });
        const imageUrlsAfterChange = imageUrls.filter((url) => {
            const imageName = url.split('/').pop();
            return listFilename.includes(imageName);
        });
        setImageUrls(imageUrlsAfterChange);
        setFileStates(files);
    };

    useEffect(() => {
        const hasError = fileStates.some((item) => item.progress === 'ERROR');
        setErrorMessage(hasError ? 'Error uploading images' : undefined);
    }, [fileStates]);

    return (
        <div>
            <p className="mb-1 text-sm">Images :</p>
            <MultiImageDropzone
                className={`${!(fileStates.length > 0) && 'h-[200px] w-[200px]'} bg-white`}
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

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';
import { useImageUploader } from '@/hooks/use-upload-images';
import { FormError } from '@/components/form-error';

interface UploadImagesProps {
    urlsImage: string[] | undefined;
    setUrlsImage: React.Dispatch<React.SetStateAction<string[] | undefined>>;
}

export default function UploadImages({
    urlsImage,
    setUrlsImage,
}: UploadImagesProps) {
    const {
        fileStates,
        setFileStates,
        uploadImages,
        errorMessage,
        setErrorMessage,
    } = useImageUploader();

    const handleFilesAdded = useCallback(
        async (addedFiles: FileState[]) => {
            const preFileUpload = [...fileStates, ...addedFiles];
            setFileStates(preFileUpload);
            console.log(fileStates);
            const urlsImageUploader = await uploadImages(preFileUpload);
            console.log(urlsImageUploader);
        },
        [fileStates, uploadImages, setFileStates],
    );

    return (
        <>
            <p className="mb-1 text-sm">Images :</p>
            <MultiImageDropzone
                className={`${!(fileStates.length > 0) && 'h-[200px] w-[200px]'} bg-white`}
                value={fileStates}
                dropzoneOptions={{
                    maxFiles: 6,
                }}
                onChange={(files) => {
                    setFileStates(files);
                }}
                onFilesAdded={handleFilesAdded}
            />
            <FormError message={errorMessage} />
        </>
    );
}

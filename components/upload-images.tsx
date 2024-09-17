'use client';
import React, { useEffect, useState } from 'react';
import {
    MultiImageDropzone,
    type FileState,
} from '@/components/multi-image-dropzone';
import { useImageUploader } from '@/hooks/use-upload-images';
import { FormError } from './form-error';

interface UploadImagesProps {
    urlsImage: string[];
    setUrlsImage: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function UploadImages({
    urlsImage,
    setUrlsImage,
}: UploadImagesProps) {
    const { fileStates, setFileStates, handleUpload } = useImageUploader();

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
                onFilesAdded={async (addedFiles: FileState[]) => {
                    const urls = await handleUpload(addedFiles);
                }}
            />
        </>
    );
}

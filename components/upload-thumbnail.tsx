'use client';

import {
    useEffect,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import { SingleImageDropzone } from '@/components/single-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { FileState } from './multi-image-dropzone';

interface UploadThumbnailProps {
    thumbnailUrl: string | undefined;
    setThumbnailUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;
}

export default function UploadThumbnail({
    thumbnailUrl,
    setThumbnailUrl,
    file,
    setFile,
}: UploadThumbnailProps) {
    const { edgestore } = useEdgeStore();

    const handleUploadImage = useCallback(async () => {
        if (file) {
            try {
                const res = await edgestore.publicImages.upload({
                    file,
                    input: { type: 'product' },
                    options: {
                        temporary: true,
                    },
                    onProgressChange: (progress) => {
                        console.log('Progress:', progress);
                    },
                });
                return res;
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    }, [file, edgestore]);

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                const thumbnailUploaded = await handleUploadImage();
                if (thumbnailUploaded && thumbnailUploaded.url) {
                    setThumbnailUrl(thumbnailUploaded.url);
                }
            }
        };
        uploadImage();
    }, [file, handleUploadImage, setThumbnailUrl]);

    return (
        <div>
            <p className="mb-1 text-sm">Thumbnail :</p>
            <SingleImageDropzone
                className="bg-white"
                width={150}
                height={150}
                value={file}
                onChange={(newFile) => setFile(newFile)}
            />
        </div>
    );
}

'use client';

import { useEffect, useState, useCallback } from 'react';
import { SingleImageDropzone } from '@/components/single-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';

export default function UploadThumbnail() {
    const [file, setFile] = useState<File | undefined>(undefined);

    const { edgestore, state, reset } = useEdgeStore();

    const handleUploadImage = useCallback(async () => {
        if (file) {
            try {
                const res = await edgestore.publicImages.upload({
                    file,
                    input: { type: 'product' },
                    onProgressChange: (progress) => {
                        console.log('Progress:', progress);
                    },
                });
            } catch (error) {
                console.error('Upload failed:', error);
            }
        }
    }, [file, edgestore]);

    useEffect(() => {
        const uploadImage = async () => {
            if (file) {
                await handleUploadImage();
            }
        };
        uploadImage();
    }, [file, handleUploadImage]);

    return (
        <div>
            <p className="mb-1 text-sm">Thumbnail :</p>
            <SingleImageDropzone
                className="bg-white"
                width={200}
                height={200}
                value={file}
                onChange={(newFile) => setFile(newFile)}
            />
        </div>
    );
}

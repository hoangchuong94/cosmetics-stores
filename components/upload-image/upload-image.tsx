'use client';

import { useEffect, useState, useCallback } from 'react';
import { SingleImageDropzone } from '@/components/upload-image/single-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';

interface UploadImageProps {
    file: File | string | undefined;
    onChange: (...event: any[]) => void;
}

export default function UploadImage({ file, onChange }: UploadImageProps) {
    const { edgestore } = useEdgeStore();
    const [isAutoUpdate, setIsAutoUpdate] = useState<boolean>(true);

    const handleUpload = useCallback(
        async (file: File) => {
            try {
                const res = await edgestore.publicImages.upload({
                    file,
                    input: { type: 'thumbnail' },
                    options: {
                        temporary: true,
                    },
                    onProgressChange: (progress) => {
                        console.log(`Upload Progress: ${progress}%`);
                    },
                });
                return res;
            } catch (error) {
                console.error('Image upload failed', error);
                return null;
            } finally {
                setIsAutoUpdate(false);
            }
        },
        [edgestore],
    );

    useEffect(() => {
        const uploadImage = async () => {
            if (isAutoUpdate && file instanceof File) {
                const imageUploaded = await handleUpload(file);
                if (imageUploaded) {
                    // onChange({
                    //     urlConfirm: imageUploaded.url,
                    //     file,
                    // });
                }
            }

            return;
        };
        uploadImage();
    }, [file, onChange, isAutoUpdate, handleUpload]);

    return (
        <div className="flex min-w-full items-center justify-center rounded-md bg-white shadow-sm">
            <SingleImageDropzone
                className="mt-2 bg-white"
                width={200}
                height={200}
                value={file}
                onChange={(fileAdd) => {
                    setIsAutoUpdate(true);
                    onChange({
                        urlConfirm: undefined,
                        file: fileAdd,
                    });
                }}
            />
        </div>
    );
}

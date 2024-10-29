'use client';

import { useEffect, useState, useCallback } from 'react';
import { SingleImageDropzone } from '@/components/edgestore/single-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { Progress } from '@/components/ui/progress';

interface UploadImageProps {
    file: File | string;
    onChange: (...event: any[]) => void;
    setUploadThumbnailUrl: React.Dispatch<
        React.SetStateAction<string | undefined>
    >;
}

export default function UploadImage({
    file,
    setUploadThumbnailUrl,
    onChange,
}: UploadImageProps) {
    const { edgestore } = useEdgeStore();
    const [isAutoUpdate, setIsAutoUpdate] = useState<boolean>(true);
    const [process, setProgress] = useState<number>(0);
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
                        setProgress(progress);
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
                    setUploadThumbnailUrl(imageUploaded.url);
                }
                // chưa xử lý lỗi chi tiết khi edgestore bị failed
            }
            return;
        };
        uploadImage();
    }, [file, isAutoUpdate, handleUpload, setUploadThumbnailUrl]);

    return (
        <div className="flex w-auto flex-col items-center justify-center rounded-md bg-white py-2 shadow-sm">
            <SingleImageDropzone
                className="mt-2 bg-white"
                width={200}
                height={200}
                value={file}
                onChange={(fileAdd) => {
                    setIsAutoUpdate(true);
                    setProgress(0);
                    !fileAdd ? onChange('') : onChange(fileAdd);
                }}
            />
            <Progress className="h-3 w-[200px]" value={process} />
        </div>
    );
}

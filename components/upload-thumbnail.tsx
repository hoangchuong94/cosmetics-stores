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

interface UploadThumbnailProps {
    thumbnailUrl: string | undefined;
    setThumbnailUrl: React.Dispatch<React.SetStateAction<string | undefined>>;
    thumbnailFile: File | string | undefined;
    setThumbnailFile: Dispatch<SetStateAction<File | string | undefined>>;
}

export default function UploadThumbnail({
    thumbnailUrl,
    setThumbnailUrl,
    thumbnailFile,
    setThumbnailFile,
}: UploadThumbnailProps) {
    const { edgestore } = useEdgeStore();
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [statusUploaded, setStatusUploaded] = useState<boolean>(false);

    const handleUploadThumbnail = useCallback(
        async (file: File) => {
            if (!statusUploaded && file instanceof File) {
                try {
                    const res = await edgestore.publicImages.upload({
                        file,
                        input: { type: 'product' },
                        options: {
                            temporary: true,
                        },
                        onProgressChange: (progress) => {
                            if (progress === 100) {
                                console.log(progress);
                                setStatusUploaded(true);
                            }
                        },
                    });
                    return res;
                } catch (error: unknown) {
                    console.error('Upload failed:', error);
                    setErrorMessage('Thumbnail image failed to upload');
                }
            }
        },
        [edgestore, statusUploaded],
    );

    useEffect(() => {
        const uploadImage = async () => {
            if (thumbnailFile && thumbnailFile instanceof File) {
                const thumbnailUploaded =
                    await handleUploadThumbnail(thumbnailFile);
                if (thumbnailUploaded && thumbnailUploaded.url) {
                    setThumbnailUrl(thumbnailUploaded.url);
                }
            }
            return;
        };
        uploadImage();
    }, [thumbnailFile, thumbnailUrl, handleUploadThumbnail, setThumbnailUrl]);

    return (
        <>
            <div className="flex min-w-full items-center justify-center rounded-md bg-white shadow-sm">
                <SingleImageDropzone
                    className="mt-2 bg-white"
                    width={200}
                    height={200}
                    value={thumbnailFile}
                    onChange={(newFile) => {
                        console.log(thumbnailFile);
                        setThumbnailFile(newFile);
                        setStatusUploaded(false);
                        setErrorMessage(undefined);
                        setThumbnailUrl(undefined);
                    }}
                />
            </div>
            <p className="mt-3 text-xs text-red-500">{errorMessage}</p>
        </>
    );
}

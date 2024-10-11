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
import { FormError } from './form-error';

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
    const [errorMessage, setErrorMessage] = useState<string | undefined>();
    const [statusUploaded, setStatusUploaded] = useState<boolean>(false);

    const handleUploadThumbnail = useCallback(
        async (file: File) => {
            if (!statusUploaded) {
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
            if (file && file instanceof File) {
                const thumbnailUploaded = await handleUploadThumbnail(file);
                if (thumbnailUploaded && thumbnailUploaded.url) {
                    setThumbnailUrl(thumbnailUploaded.url);
                }
            }
        };
        uploadImage();
    }, [file, thumbnailUrl, handleUploadThumbnail, setThumbnailUrl]);

    return (
        <>
            <p className="text-sm">Thumbnail :</p>
            <div className="flex min-w-full items-center justify-center rounded-md bg-white shadow-sm">
                <SingleImageDropzone
                    className="mt-2 bg-white"
                    width={200}
                    height={200}
                    value={file}
                    onChange={(newFile) => {
                        setStatusUploaded(false);
                        setFile(newFile);
                        setErrorMessage(undefined);
                    }}
                />
            </div>
            <p className="mt-3 text-xs text-red-600">{errorMessage}</p>
        </>
    );
}

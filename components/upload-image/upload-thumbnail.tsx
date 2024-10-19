'use client';

import {
    useEffect,
    useState,
    useCallback,
    Dispatch,
    SetStateAction,
} from 'react';
import { SingleImageDropzone } from '@/components/upload-image/single-image-dropzone';
import { useEdgeStore } from '@/lib/edgestore';

interface UploadThumbnailProps {
    file: File | string | undefined;
    setFile: Dispatch<SetStateAction<File | string | undefined>>;
    setUrl: Dispatch<React.SetStateAction<string | undefined>>;
    setErrorMessage: Dispatch<SetStateAction<string | undefined>>;
}

export default function UploadThumbnail({
    file,
    setFile,
    setUrl,
    setErrorMessage,
}: UploadThumbnailProps) {
    const { edgestore } = useEdgeStore();
    const [isAutoUpdate, setIsAutoUpdate] = useState<boolean>(true);

    const handleUpload = useCallback(
        async (file: File) => {
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
                        }
                    },
                });
                return res;
            } catch (error: unknown) {
                if (error instanceof Error) {
                    setErrorMessage(
                        `Thumbnail image failed to upload: ${error.message}`,
                    );
                } else {
                    setErrorMessage(
                        `Thumbnail image failed to upload: Unknown error please try again later .`,
                    );
                }
            }
        },
        [edgestore, setErrorMessage],
    );

    useEffect(() => {
        const uploadImage = async () => {
            if (isAutoUpdate && file && file instanceof File) {
                const imageUploaded = await handleUpload(file);
                if (imageUploaded) {
                    setUrl(imageUploaded.url);
                }
                setIsAutoUpdate(false);
            }
            return;
        };
        uploadImage();
    }, [file, isAutoUpdate, setErrorMessage, handleUpload, setUrl]);

    return (
        <>
            <div className="flex min-w-full items-center justify-center rounded-md bg-white shadow-sm">
                <SingleImageDropzone
                    className="mt-2 bg-white"
                    width={200}
                    height={200}
                    value={file}
                    onChange={(newFile) => {
                        setFile(newFile);
                        setErrorMessage(undefined);
                        setUrl(undefined);
                        setIsAutoUpdate(true);
                    }}
                />
            </div>
        </>
    );
}

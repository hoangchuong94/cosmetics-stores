'use client';
import React from 'react';
import { useEdgeStore } from '@/lib/edgestore';
import { SingleImageDropzone } from '@/components/single-imge-dropzone';
import { Button } from '@/components/ui/button';

export default function ProductAdmin() {
  const [file, setFile] = React.useState<File>();
  const [progress, setProgress] = React.useState<number>();
  const { edgestore } = useEdgeStore();
  return (
    <div className="h-full w-full bg-slate-500/50 p-3">
      <div className="h-full w-full rounded-3xl bg-white p-10">
        <h1>Upload Your Avatar</h1>
        <div className="flex flex-col">
          <SingleImageDropzone
            width={200}
            height={200}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
          <Button
            className="mt-2"
            onClick={async () => {
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    setProgress(progress);
                  },
                });
                console.log(res);
              }
            }}
          >
            Upload
          </Button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const VerificationSkeleton = () => {
    return (
        <div className="h-full">
            <Skeleton className="h-[inherit] rounded-r-xl">
                <div className="flex h-[256px] flex-col space-y-4 p-6">
                    <Skeleton className="h-[80px] w-[566px]" />
                    <Skeleton className="h-[80px] w-[566px]" />
                    <Skeleton className="h-[80px] w-[566px]" />
                </div>
            </Skeleton>
        </div>
    );
};

export default VerificationSkeleton;

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const LoginSkeleton = () => {
    return (
        <div className="h-full">
            <Skeleton className="h-[inherit] rounded-r-3xl">
                <div className="flex h-[170px] flex-col p-6">
                    <Skeleton className="h-[52px] w-[112px]" />
                    <div className="flex justify-center">
                        <Skeleton className="h-[60px] w-[120px]" />
                    </div>
                    <Skeleton className="mt-2 h-[2px] w-full" />
                </div>

                <div className="flex h-[388px] w-[478px] flex-col p-6">
                    <Skeleton className="h-[68px] w-[430px]" />
                    <Skeleton className="mt-2 h-[68px] w-[430px]" />
                    <Skeleton className="mt-2 h-[68px] w-[430px]" />
                    <Skeleton className="mt-6 h-[2px] w-full" />
                    <div className="mt-6 flex space-x-3">
                        <Skeleton className="h-[68px] w-[211px]" />
                        <Skeleton className="h-[68px] w-[211px]" />
                    </div>
                </div>

                <div className=" px-6">
                    <Skeleton className="mt-5 h-[20px] w-full" />
                </div>
            </Skeleton>
        </div>
    );
};

export default LoginSkeleton;

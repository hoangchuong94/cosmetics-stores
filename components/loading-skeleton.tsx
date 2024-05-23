import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingSkeletonAuth = () => {
  return (
    <div className="min-h-full flex justify-center h-screen bg-white rounded-lg min-w-[90%] items-center p-4 sm:min-w-[60%] md:min-w-[50%] lg:min-w-[40%]">
      <Skeleton className="w-[372px] h-[650px]"></Skeleton>
    </div>
  );
};

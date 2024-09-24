import React from 'react';
import { Skeleton } from "@/components/ui/skeleton";

const LoadingScreen = () => {
  return (
    <div className="flex">
      <div className="w-full">
        <Skeleton className="h-16 w-full mb-20 rounded-none" />
        <div className="px-4 w-full">
          <div className="grid grid-cols-4 gap-4 w-full">
            <Skeleton className="h-28 mb-5" />
            <Skeleton className="h-28 mb-5" />
            <Skeleton className="h-28 mb-5" />
            <Skeleton className="h-28 mb-5" />
          </div>
          <Skeleton className="h-40 w-full mb-5" />
          <Skeleton className="h-40 w-full mb-5" />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

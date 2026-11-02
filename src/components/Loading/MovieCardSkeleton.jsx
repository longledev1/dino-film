import React from "react";

export const MovieCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl bg-gray-800/60 animate-pulse">
      <div className="aspect-[2/3] w-full rounded-t-xl bg-gray-700/60"></div>
      <div className="p-3">
        <div className="h-4 w-3/4 rounded bg-gray-700/60"></div>
        <div className="mt-3 flex items-center justify-between">
          <div className="h-3 w-1/3 rounded bg-gray-700/40"></div>
          <div className="h-3 w-8 rounded bg-gray-700/40"></div>
        </div>
      </div>
    </div>
  );
};

export const SectionSkeleton = ({ count = 6 }) => {
  return (
    <div className="w-full">
      <div className="mb-4 h-6 w-48 rounded bg-gray-700/50 animate-pulse"></div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: count }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default MovieCardSkeleton;

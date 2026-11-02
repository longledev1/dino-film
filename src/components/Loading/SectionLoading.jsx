import React from "react";
import { SectionSkeleton } from "./MovieCardSkeleton";

const SectionLoading = () => {
  return (
    <div className="py-2">
      <SectionSkeleton count={6} />
    </div>
  );
};

export default SectionLoading;

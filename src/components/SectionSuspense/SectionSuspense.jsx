import React, { Suspense } from "react";
import SectionLoading from "../Loading/SectionLoading";

const SectionSuspense = ({ children }) => {
  return <Suspense fallback={<SectionLoading />}>{children}</Suspense>;
};

export default SectionSuspense;

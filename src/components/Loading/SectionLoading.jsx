import React from "react";
import "./SectionLoading.css"; // file có @keyframes wave

const SectionLoading = () => {
  return (
    <div className="flex h-10 items-end justify-center space-x-1">
      <div
        className="h-5 w-1.5 bg-amber-200"
        style={{ animation: "wave 1.2s ease-in-out infinite" }}
      ></div>
      <div
        className="h-8 w-1.5 bg-amber-200"
        style={{
          animation: "wave 1.2s ease-in-out infinite",
          animationDelay: "-0.2s",
        }}
      ></div>
      <div
        className="h-10 w-1.5 bg-amber-200"
        style={{
          animation: "wave 1.2s ease-in-out infinite",
          animationDelay: "-0.4s",
        }}
      ></div>
      <div
        className="h-8 w-1.5 bg-amber-200"
        style={{
          animation: "wave 1.2s ease-in-out infinite",
          animationDelay: "-0.6s",
        }}
      ></div>
      <div
        className="h-5 w-1.5 bg-amber-200"
        style={{
          animation: "wave 1.2s ease-in-out infinite",
          animationDelay: "-0.8s",
        }}
      ></div>
    </div>
  );
};

export default SectionLoading;

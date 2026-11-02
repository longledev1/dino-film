import React from "react";

const Title = ({ children, className = "" }) => {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-5 w-1 rounded-full bg-gradient-to-b from-primary to-secondary shrink-0" />
      <h2
        className={`text-xl sm:text-2xl font-black tracking-tight text-white ${className}`}
      >
        {children}
      </h2>
    </div>
  );
};

export default Title;

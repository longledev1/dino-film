import React from "react";
import { FaChevronRight } from "react-icons/fa6";

const MoodCard = ({ data }) => {
  return (
    <div
      className="card group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/50"
      style={{ backgroundColor: data.color }}
    >
      <div className="mask"></div>
      <h3 className="text-base sm:text-lg font-bold drop-shadow">
        {data.label}
      </h3>
      <div className="mt-4 flex items-center gap-1 text-xs sm:text-sm font-medium opacity-90 transition-transform duration-200 group-hover:translate-x-1">
        <span>Explore</span>
        <FaChevronRight className="text-[10px]" />
      </div>
    </div>
  );
};

export default MoodCard;

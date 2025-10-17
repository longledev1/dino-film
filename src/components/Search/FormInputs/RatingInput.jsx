import React from "react";

const RatingInput = ({ name, onChange }) => {
  return (
    <div>
      <select
        name={name}
        onChange={onChange}
        className="ml-10 rounded-md border-2 border-gray-200 bg-[#0f1827] p-1"
      >
        <option className="text-white">All</option>
        <option className="text-white">0 - 49</option>
        <option className="text-white">50 - 69</option>
        <option className="text-white">70 - 100</option>
      </select>
    </div>
  );
};

export default RatingInput;

import React from "react";
import { useWatch } from "react-hook-form";

const MediaTypeInput = ({ onChange, control }) => {
  const mediaType = useWatch({ name: "mediaType", control });

  const MEDIA_TYPE = [
    {
      type_id: 1,
      type_name: "movie",
      type_label: "Movies",
    },
    {
      type_id: 2,
      type_name: "tv",
      type_label: "TV Series",
    },
  ];
  return (
    <div className="flex items-center gap-x-2">
      <div className="flex items-center gap-x-2">
        {MEDIA_TYPE &&
          MEDIA_TYPE.map((type) => (
            <button
              key={type.type_id}
              type="button"
              className={`w-fit cursor-pointer rounded-md border-2 bg-[#0f1827] p-1 text-[14px] capitalize outline-none hover:opacity-75 ${mediaType == type.type_name ? "border-amber-200 bg-gray-600" : "border-gray-700"}`}
              onClick={() => onChange(type.type_name)}
            >
              {type.type_label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default MediaTypeInput;

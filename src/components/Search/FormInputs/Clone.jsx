import React from "react";

const MediaTypeInput = ({ onChange, name, value }) => {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <input
          className="h-3 w-3 cursor-pointer appearance-none rounded-full border-2 border-white checked:border-amber-200 checked:bg-amber-200"
          type="radio"
          value="movie"
          name={name}
          onChange={onChange}
          checked={value === "movie"}
          id="sf-type-movie"
        />
        <label htmlFor="sf-type-movie">Movie</label>
      </div>
      <div className="flex items-center gap-x-2">
        <input
          className="h-3 w-3 cursor-pointer appearance-none rounded-full border-2 border-white checked:border-amber-200 checked:bg-amber-200"
          type="radio"
          value="tv"
          name={name}
          onChange={onChange}
          checked={value === "tv"}
          id="sf-type-tv"
        />
        <label htmlFor="sf-type-tv">TV Show</label>
      </div>
    </>
  );
};

export default MediaTypeInput;

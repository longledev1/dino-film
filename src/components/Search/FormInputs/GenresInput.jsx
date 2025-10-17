import { movieFetcher } from "@/services/fetcher";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import useSWR from "swr";

const GenresInput = ({ control, onChange, value = [] }) => {
  const mediaType = useWatch({ name: "mediaType", control });
  const { data } = useSWR(
    mediaType ? [`/genre/${mediaType}/list`] : null,
    movieFetcher,
    { keepPreviousData: true },
  );
  useEffect(() => {
    onChange([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaType]);
  return (
    <div className="ml-10 grid grid-cols-11 gap-2">
      {data?.genres &&
        data?.genres.map((genre) => (
          <button
            key={genre.id}
            type="button"
            className={`cursor-pointer rounded-md border-2 bg-[#0f1827] p-1 text-[14px] outline-none hover:opacity-75 ${value.includes(genre.id) ? "border-amber-200 bg-gray-600" : "border-gray-700"}`}
            onClick={() => {
              const exitsValue = value.includes(genre.id);
              const newValue = exitsValue
                ? value.filter((g) => g !== genre.id)
                : [...value, genre.id];
              onChange(newValue);
            }}
          >
            {genre.name}
          </button>
        ))}
    </div>
  );
};

export default GenresInput;

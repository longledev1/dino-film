import { movieFetcher } from "@/services/fetcher";
import React, { useEffect } from "react";
import { useWatch } from "react-hook-form";
import useSWR from "swr";
import { MEDIA_DATA, POPULAR_REGIONS } from "@/constant";

const CountriesInput = ({ control, onChange }) => {
  const country = useWatch({ name: "country", control });

  const { data } = useSWR(
    MEDIA_DATA.REGION ? [MEDIA_DATA.REGION] : null,
    movieFetcher,
  );

  const filteredCountries = data?.results.filter((c) =>
    POPULAR_REGIONS.includes(c.iso_3166_1),
  );

  return (
    <div className="ml-5 grid grid-cols-10 gap-2">
      {filteredCountries &&
        filteredCountries.map((c) => {
          const isSelected = country === c.iso_3166_1;

          return (
            <button
              key={c.iso_3166_1}
              type="button"
              className={`cursor-pointer rounded-md border-2 bg-[#0f1827] p-1 text-[14px] capitalize outline-none hover:opacity-75 ${
                isSelected ? "border-amber-200 bg-gray-600" : "border-gray-700"
              }`}
              onClick={() => onChange(isSelected ? "" : c.iso_3166_1)}
            >
              {c.native_name}
            </button>
          );
        })}
    </div>
  );
};

export default CountriesInput;

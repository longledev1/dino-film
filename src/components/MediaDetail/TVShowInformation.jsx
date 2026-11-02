import React from "react";
import Title from "@components/Title";

const TVShowInformation = ({ tvInfo }) => {
  if (!tvInfo) return null;

  const hasCountry =
    Array.isArray(tvInfo.origin_country) && tvInfo.origin_country.length > 0;

  return (
    <div className="rounded-2xl bg-gray-850/60 p-5 border border-white/5 backdrop-blur-sm">
      <Title className="text-white mb-4 text-xl">Information</Title>
      <div className="flex flex-col gap-4 text-sm">
        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Original Title
          </p>
          <p className="mt-1 text-gray-200">{tvInfo.original_name || "N/A"}</p>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Original Country
          </p>
          <div className="mt-1 flex items-center gap-x-2 text-white">
            {hasCountry
              ? tvInfo.origin_country.map((countryCode) => (
                  <img
                    key={countryCode}
                    src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                    alt={countryCode}
                    title={countryCode}
                    className="h-4 w-6 rounded object-cover shadow"
                  />
                ))
              : "Unknown"}
          </div>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Status
          </p>
          <p className="mt-1 text-gray-200">{tvInfo.status || "N/A"}</p>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Number of Seasons
          </p>
          <p className="mt-1 text-gray-200">
            {tvInfo.number_of_seasons ?? "N/A"}
          </p>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Number of Episodes
          </p>
          <p className="mt-1 text-gray-200">
            {tvInfo.number_of_episodes ?? "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TVShowInformation;

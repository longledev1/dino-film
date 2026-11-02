import React from "react";
import Title from "../Title";

const SeasonInformation = ({ seasonInfo, tvName, tvCountry = [] }) => {
  const hasCountry = Array.isArray(tvCountry) && tvCountry.length > 0;
  const hasNetworks =
    Array.isArray(seasonInfo?.networks) && seasonInfo.networks.length > 0;

  return (
    <div className="rounded-2xl bg-gray-850/60 p-5 border border-white/5 backdrop-blur-sm">
      <Title className="text-white mb-4 text-xl">Information</Title>
      <div className="flex flex-col gap-4 text-sm">
        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Original Title
          </p>
          <p className="mt-1 text-gray-200">{tvName || "N/A"}</p>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Season Number
          </p>
          <p className="mt-1 text-gray-200">
            {seasonInfo?.season_number ?? "N/A"}
          </p>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Number of Episodes
          </p>
          <p className="mt-1 text-gray-200">
            {seasonInfo?.episodes?.length || 0}
          </p>
        </div>

        <div>
          <p className="font-bold text-xs uppercase tracking-wider text-secondary">
            Original Country
          </p>
          <div className="mt-1 flex items-center gap-x-2 text-white">
            {hasCountry
              ? tvCountry.map((countryCode) => (
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

        {hasNetworks && (
          <div>
            <p className="font-bold text-xs uppercase tracking-wider text-secondary">
              Networks
            </p>
            <div className="mt-1 flex flex-wrap gap-2 text-gray-200">
              {seasonInfo.networks.map((network) => (
                <span key={network.id}>{network.name}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonInformation;

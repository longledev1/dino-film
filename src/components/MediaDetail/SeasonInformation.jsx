import React from "react";
import Title from "../Title";
const SeasonInformation = ({ seasonInfo, tvName, tvCountry }) => {
  return (
    <div>
      <Title className="text-white">Information</Title>
      <div className="mt-4 text-[14px] sm:text-base">
        <div
          className={
            seasonInfo?.credits?.cast != ""
              ? `flex flex-col gap-6`
              : "grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-between"
          }
        >
          <div>
            <p className="font-bold text-amber-200">Original Title:</p>
            <p className="font-thin text-white">{tvName}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Seasons number:</p>
            <p className="font-thin text-white">{seasonInfo?.season_number}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Number of Episodes:</p>
            <p className="font-thin text-white">
              {seasonInfo?.episodes?.length}
            </p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Original Country:</p>
            <div className="flex items-center gap-x-2 text-white">
              {tvCountry != ""
                ? tvCountry?.map((countryCode) => (
                    <img
                      key={countryCode}
                      src={`https://flagcdn.com/48x36/${countryCode.toLowerCase()}.png`}
                      alt={countryCode}
                      className="mt-1 w-5"
                    ></img>
                  ))
                : "Unknow"}
            </div>
          </div>
          <div>
            <p className="font-bold text-amber-200">Networks:</p>
            <div className="font-thin text-white">
              {seasonInfo?.networks != []
                ? seasonInfo?.networks?.map((network) => (
                    <p key={network.id}>{network.name}</p>
                  ))
                : "Unknow"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonInformation;

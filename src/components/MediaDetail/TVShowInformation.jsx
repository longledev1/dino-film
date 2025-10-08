import React from "react";
import Title from "@components/Title";
const TVShowInformation = (props) => {
  const { tvInfo } = props;
  return (
    <div>
      <Title className="text-white">Information</Title>
      <div className="mt-4 text-[14px] sm:text-base">
        <div
          className={
            tvInfo?.credits?.cast != ""
              ? `flex flex-col gap-6`
              : "grid grid-cols-2 gap-6 sm:flex sm:items-center sm:justify-between"
          }
        >
          <div>
            <p className="font-bold text-amber-200">Original Title</p>
            <p className="font-thin text-white">{tvInfo?.original_name}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Original Country</p>
            <div className="flex items-center gap-x-2 text-white">
              {tvInfo?.origin_country != ""
                ? tvInfo?.origin_country.map((countryCode) => (
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
            <p className="font-bold text-amber-200">Status</p>
            <p className="font-thin text-white">{tvInfo?.status}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Number of Seasons</p>
            <p className="font-thin text-white">{tvInfo?.number_of_seasons}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Number of Episodes</p>
            <p className="font-thin text-white">{tvInfo?.number_of_episodes}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVShowInformation;

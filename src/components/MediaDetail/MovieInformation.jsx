import React from "react";
import Title from "@components/Title";
import { currencyFormat } from "@/constant/ultil";
const MovieInformation = (props) => {
  const { movieInfo } = props;
  return (
    <div>
      <Title className="text-white">Information</Title>
      <div className="mt-4">
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-bold text-amber-200">Original Title</p>
            <p className="font-thin text-white">{movieInfo?.original_title}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Original Country</p>
            <div className="flex items-center gap-x-2 text-white">
              {movieInfo?.origin_country != ""
                ? movieInfo?.origin_country.map((countryCode) => (
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
            <p className="font-thin text-white">{movieInfo?.status}</p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Budget</p>
            <p className="font-thin text-white">
              {currencyFormat(movieInfo.budget)}
            </p>
          </div>
          <div>
            <p className="font-bold text-amber-200">Revenue</p>
            <p className="font-thin text-white">
              {currencyFormat(movieInfo.revenue)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInformation;

import React from "react";
import { formatRuntime } from "@/constant/ultil";
import { IMAGE_BASE_URL } from "@/constant";
import ImageComponent from "../ImageComponent";
const EpisodeCard = ({
  episode_number,
  runtime,
  name,
  image,
  date,
  overview,
}) => {
  return (
    <div className="h-full cursor-pointer bg-gray-800 text-white hover:opacity-75">
      <div className="relative text-[12px]">
        <ImageComponent
          width={250}
          height={140}
          src={`${IMAGE_BASE_URL}/original/${image}`}
          alt=""
          className="object-cover"
        />
        <p className="bg-button absolute top-1 left-1 rounded-md p-1 font-bold text-white">
          Ep {episode_number}
        </p>
      </div>
      <div className="mt-2 p-2">
        <p className="mb-2 text-left text-[14px] font-bold">{name}</p>
        <div className="flex items-center justify-between gap-x-2">
          <div className="items-centerg flex gap-x-2 text-[12px]">
            <p className="font-bold">{formatRuntime(runtime)}</p>
            <div className="h-[20px] w-[1px] rounded-md bg-gray-400 lg:block"></div>
            <p>{date}</p>
          </div>
          <p className="rounded border-1 border-slate-500 p-[2px] text-[12px] text-white">
            HD
          </p>
        </div>
        <p className="mt-2 text-left text-[12px] leading-5 font-thin">
          {overview.slice(0, 250)}
        </p>
      </div>
    </div>
  );
};

export default EpisodeCard;

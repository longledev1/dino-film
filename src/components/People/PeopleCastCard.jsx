import React from "react";
import { Link } from "react-router";
import ImageComponent from "../ImageComponent";
import { IMAGE_BASE_URL } from "@/constant";
import CircularProgress from "../MediaList/CircularProgress";
const PeopleCastCard = ({ id, title, poster, point, type, date }) => {
  return (
    <Link to={type == "tv" ? `/tv/${id}` : `/movie/${id}`}>
      <div className="flex flex-col gap-y-6">
        <div className="relative">
          <ImageComponent
            src={poster && `${IMAGE_BASE_URL}/original/${poster}`}
            alt=""
            className="rounded-lg object-cover hover:opacity-75"
            width={219}
            height={329}
          />
          {type === "tv" ? (
            <div className="bg-button absolute top-1 left-1 rounded-md p-1 text-[14px] text-white">
              TV Show
            </div>
          ) : (
            ""
          )}

          <div className="absolute bottom-0 left-4 translate-y-[50%] transform">
            <CircularProgress
              percent={Math.round(point * 10)}
            ></CircularProgress>
          </div>
        </div>
        <div className="text-center">
          <p className="text-[16px] font-bold text-white hover:cursor-pointer hover:text-amber-200">
            {title}
          </p>
          <p className="font-thin text-gray-500">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default PeopleCastCard;

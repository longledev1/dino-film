import React from "react";
import CircularProgress from "../MediaList/CircularProgress";
import { IMAGE_BASE_URL } from "@/constant";
import { Link } from "react-router-dom";

const RelatedMediaCard = (props) => {
  const { id, title, poster, point } = props;
  return (
    <Link to={`/movie/${id}`}>
      <div className="group flex cursor-pointer flex-col items-center justify-center gap-y-8">
        <div className="relative group-hover:opacity-75">
          <img
            src={`${IMAGE_BASE_URL}/original/${poster}`}
            alt=""
            className="!h-[304px] rounded-lg object-cover"
          />
          <div className="absolute left-5 -translate-y-[50%] transform">
            <CircularProgress
              percent={Math.round(point * 10)}
            ></CircularProgress>
          </div>
        </div>
        <div className="text-center">
          <p className="w-full text-base font-bold text-amber-200">
            {title.slice(0, 20)}
          </p>
          <p className="text-[14px] font-thin text-white">2025-18-08</p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedMediaCard;

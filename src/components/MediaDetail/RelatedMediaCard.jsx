import React from "react";
import CircularProgress from "../MediaList/CircularProgress";
import { IMAGE_BASE_URL } from "@/constant";
import { Link } from "react-router-dom";
import ImageComponent from "@components/ImageComponent";

const RelatedMediaCard = (props) => {
  const { id, title, poster, point, type, date } = props;

  return (
    <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`}>
      <div className="group t flex cursor-pointer flex-col items-center justify-center gap-y-8">
        <div className="relative group-hover:opacity-75">
          <ImageComponent
            src={`${IMAGE_BASE_URL}/original/${poster}`}
            alt=""
            className="rounded-lg object-cover"
            width={203}
            height={304}
          />
          <div className="absolute left-5 -translate-y-[50%] transform">
            <CircularProgress
              percent={Math.round(point * 10)}
            ></CircularProgress>
          </div>
        </div>
        <div className="text-center text-[14px] sm:text-base">
          <p className="w-full font-bold text-amber-200">
            {title.slice(0, 20)}
          </p>
          <p className="font-thin text-white">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default RelatedMediaCard;

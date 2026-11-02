import React from "react";
import { Link } from "react-router-dom";
import ImageComponent from "../ImageComponent";
import { IMAGE_BASE_URL } from "@/constant";
import CircularProgress from "../MediaList/CircularProgress";

const PeopleCastCard = ({ id, title, poster, point = 0, type, date }) => {
  return (
    <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`} className="block">
      <div className="group flex flex-col gap-y-3 transition-transform duration-300 hover:-translate-y-1.5">
        <div className="relative rounded-xl bg-gray-800 shadow-lg border border-white/5">
          <div className="aspect-[2/3] w-full overflow-hidden rounded-t-xl bg-gray-900">
            <ImageComponent
              src={poster ? `${IMAGE_BASE_URL}/original/${poster}` : null}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {type === "tv" && (
            <div className="absolute top-2 left-2 rounded-md bg-primary/90 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              TV Show
            </div>
          )}

          <div className="absolute bottom-0 left-3 translate-y-1/2 z-20">
            <CircularProgress
              percent={Math.round((point || 0) * 10)}
              strokeColor={
                point >= 7 ? "var(--color-primary)" : point >= 5 ? "var(--color-secondary)" : "#ef4444"
              }
            />
          </div>
        </div>

        <div className="pt-4 text-center">
          <h4
            title={title}
            className="truncate text-sm font-bold text-white transition-colors group-hover:text-secondary"
          >
            {title}
          </h4>
          <p className="mt-1 text-xs text-gray-400">
            {date ? date.slice(0, 4) : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PeopleCastCard;

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
  overview = "",
}) => {
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/90 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-white/5">
      <div className="relative overflow-hidden text-xs">
        <ImageComponent
          width={280}
          height={160}
          src={image ? `${IMAGE_BASE_URL}/original/${image}` : null}
          alt={name}
          className="h-[160px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 rounded-md bg-primary/90 px-2 py-0.5 text-xs font-bold text-white backdrop-blur-sm">
          Ep {episode_number}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h4 className="mb-1 text-sm font-bold text-white group-hover:text-secondary transition-colors line-clamp-1">
          {name}
        </h4>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-x-2">
            <span className="font-medium text-gray-300">
              {formatRuntime(runtime)}
            </span>
            {date && (
              <>
                <span className="h-3 w-px bg-gray-600" />
                <span>{date}</span>
              </>
            )}
          </div>
          <span className="rounded border border-gray-600 px-1 py-0.2 text-[10px] font-semibold text-gray-300">
            HD
          </span>
        </div>

        <p className="mt-2 text-xs text-gray-300 leading-relaxed line-clamp-3">
          {overview || "No episode overview available."}
        </p>
      </div>
    </div>
  );
};

export default EpisodeCard;

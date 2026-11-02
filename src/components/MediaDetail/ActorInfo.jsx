import React from "react";
import { IMAGE_BASE_URL } from "@constants";
import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const ActorInfo = ({ id, name, image, character }) => {
  return (
    <Link to={`/people/${id}`} className="block h-full">
      <div className="group flex h-full flex-col overflow-hidden rounded-xl bg-gray-800/80 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-white/5 hover:border-secondary/40">
        <div className="relative overflow-hidden">
          <ImageComponent
            src={image ? `${IMAGE_BASE_URL}/w276_and_h350_face${image}` : null}
            alt={name}
            className="h-[220px] sm:h-[240px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            width={200}
            height={240}
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-3 text-xs sm:text-sm">
          <p className="font-bold text-white transition-colors group-hover:text-secondary line-clamp-1">
            {name}
          </p>
          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
            {character || "Actor"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ActorInfo;

import React from "react";
import { IMAGE_BASE_URL } from "@constants";
import ImageComponent from "@components/ImageComponent";
import { Link } from "react-router-dom";

const ActorInfo = ({ id, name, image, character }) => {
  return (
    <Link to={`/people/${id}`}>
      <div className="h-full cursor-pointer overflow-hidden rounded-lg border-3 border-gray-900 shadow-sm transition duration-200 hover:border-amber-200 md:h-[350px]">
        <div className="relative">
          <ImageComponent
            src={image && `${IMAGE_BASE_URL}/w276_and_h350_face${image}`}
            alt=""
            className="hover: !w-full object-cover hover:opacity-50"
            width={197}
            height={250}
          />
        </div>

        <div className="flex h-full flex-col gap-y-2 bg-[#1e2a3a] p-2 text-[14px] lg:text-base">
          <p className="mt-2 font-bold text-amber-200">{name}</p>
          <p className="font-thin">{character}</p>
        </div>
      </div>
    </Link>
  );
};

export default ActorInfo;

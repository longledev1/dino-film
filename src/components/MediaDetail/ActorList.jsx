import { useState } from "react";
import Title from "@components/Title";
import ActorInfo from "./ActorInfo";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { IoMdArrowDropupCircle } from "react-icons/io";

const ActorList = ({ title, actors }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const currentActors = isShowMore ? actors.slice(0, 12) : actors.slice(0, 5);
  return (
    <div className="text-white">
      <Title>{title}</Title>
      <div className="mt-4 mb-4 grid grid-cols-3 gap-x-4 gap-y-4 sm:grid-cols-5">
        {currentActors &&
          currentActors.map((actor, index) => (
            <ActorInfo
              key={actor.id}
              index={index}
              id={actor.id}
              name={actor?.name}
              character={actor?.character}
              image={actor?.profile_path}
            ></ActorInfo>
          ))}
      </div>
      <div
        onClick={() => setIsShowMore(!isShowMore)}
        className="group flex w-fit cursor-pointer items-center gap-x-2 rounded-md"
      >
        {isShowMore ? (
          <IoMdArrowDropupCircle className="text-3xl text-amber-200 group-hover:opacity-80" />
        ) : (
          <IoMdArrowDropdownCircle className="text-3xl text-amber-200 group-hover:opacity-80" />
        )}
        <p className="cursor-pointer transition duration-200 group-hover:text-amber-200">
          {isShowMore ? "Show less" : "Show more"}
        </p>
      </div>
    </div>
  );
};

export default ActorList;

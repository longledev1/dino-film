import { useState } from "react";
import Title from "@components/Title";
import ActorInfo from "./ActorInfo";
import ShowMoreButton from "@components/ShowMoreButton";

const ActorList = ({ title, actors }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const currentActors = isShowMore ? actors?.slice(0, 12) : actors?.slice(0, 5);
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
      <ShowMoreButton
        setIsShowMore={setIsShowMore}
        isShowMore={isShowMore}
        currentData={actors.length}
        visibleLimit={4}
      ></ShowMoreButton>
    </div>
  );
};

export default ActorList;

import React, { useState } from "react";
import Title from "@/components/Title";
// Component
import ImageComponent from "@components/ImageComponent";
import CircularProgress from "../MediaList/CircularProgress";
import ShowMoreButton from "@components/ShowMoreButton";
import { IMAGE_BASE_URL } from "@/constant";
const SeasonList = ({ seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const currentSeason = isShowMore
    ? seasons.slice(0, seasons.length)
    : seasons.slice(0, 2);
  return (
    <div>
      <Title className="text-white">Seasons</Title>
      <div className="mt-4 mb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentSeason &&
            currentSeason.map((season) => (
              <div
                key={season.id}
                className="rounded-lg border-2 border-gray-900 bg-gray-800 text-[14px] text-white hover:opacity-75 sm:text-[16px]"
              >
                <div className="flex items-center gap-x-6 p-2">
                  <div className="h-[300px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
                    <ImageComponent
                      src={`${IMAGE_BASE_URL}/original/${season.poster_path}`}
                      alt={season.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div>
                      <p className="text-xl font-bold">{season.name}</p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold text-amber-200">Rating</p>
                      {season.vote_average !== 0 ? (
                        <CircularProgress
                          percent={`${Math.round(season.vote_average * 10)}`}
                        ></CircularProgress>
                      ) : (
                        "No rating available"
                      )}
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold text-amber-200">Release date:</p>
                      <p className="font-thin">
                        {season.air_date != null
                          ? season.air_date
                          : "No date available"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-bold text-amber-200">Episodes:</p>
                      <p className="font-thin">
                        {season.episode_count != ""
                          ? season.episode_count
                          : "No episode available"}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-amber-200">Overview: </p>
                      <p className="leading-6 font-thin">
                        {season.overview?.length > 200
                          ? `${season.overview.slice(0, 150)}...`
                          : season.overview || "No overview available."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <ShowMoreButton
        setIsShowMore={setIsShowMore}
        isShowMore={isShowMore}
        currentData={currentSeason}
        visibleLimit={2}
      ></ShowMoreButton>
    </div>
  );
};

export default SeasonList;

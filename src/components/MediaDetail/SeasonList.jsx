import React, { useState } from "react";
import Title from "@/components/Title";
// Component
import ImageComponent from "@components/ImageComponent";
import CircularProgress from "../MediaList/CircularProgress";
import ShowMoreButton from "@components/ShowMoreButton";
// Constant
import { IMAGE_BASE_URL } from "@/constant";
// Router
import { Link } from "react-router-dom";
const SeasonList = ({ id, seasonNumber, seasons = [] }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  if (!seasons || seasons.length === 0) return null;

  const currentSeason = seasonNumber || null;

  const filteredSeasons = seasons.filter((season) => {
    if (!currentSeason) {
      return season.season_number !== 1;
    }

    return season.season_number !== currentSeason;
  });

  const visibleSeasons = isShowMore
    ? filteredSeasons
    : filteredSeasons.slice(0, 2);

  return (
    <div>
      <Title className="text-white">Seasons</Title>
      <div className="mt-4 mb-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visibleSeasons.map((season) => (
            <Link
              key={season.id}
              to={`${season.season_number === 1 ? `/tv/${id}` : `/tv/${id}/season/${season.season_number}`}`}
            >
              <div className="cursor-pointer rounded-lg border-2 border-gray-900 bg-gray-800 text-[14px] text-white hover:opacity-75 sm:text-[16px]">
                <div className="flex items-center gap-x-6 p-2">
                  <div className="h-[300px] w-[200px] flex-shrink-0 overflow-hidden rounded-md">
                    {season.poster_path ? (
                      <ImageComponent
                        src={
                          season.poster_path &&
                          `${IMAGE_BASE_URL}/original/${season.poster_path}`
                        }
                        alt={season.name || "Season poster"}
                        width={200}
                        height={300}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-700 text-sm">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-3">
                    <p className="text-xl font-bold">{season.name}</p>

                    <div className="flex items-center gap-x-2">
                      <p className="font-bold text-amber-200">Rating</p>
                      {season.vote_average ? (
                        <CircularProgress
                          percent={Math.round(season.vote_average * 10)}
                        />
                      ) : (
                        "No rating available"
                      )}
                    </div>

                    <div className="flex items-center gap-x-2">
                      <p className="font-bold text-amber-200">Release date:</p>
                      <p className="font-thin">
                        {season.air_date ?? "No date available"}
                      </p>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <p className="font-bold text-amber-200">Episodes:</p>
                      <p className="font-thin">
                        {season.episode_count != null
                          ? season.episode_count
                          : "No episode available"}
                      </p>
                    </div>

                    <div>
                      <p className="font-bold text-amber-200">Overview:</p>
                      <p className="leading-6 font-thin">
                        {season.overview?.length > 200
                          ? `${season.overview.slice(0, 150)}...`
                          : season.overview || "No overview available."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <ShowMoreButton
        setIsShowMore={setIsShowMore}
        isShowMore={isShowMore}
        currentData={seasons.filter((s) => s.season_number !== 1).length}
        visibleLimit={2}
      />
    </div>
  );
};

export default SeasonList;

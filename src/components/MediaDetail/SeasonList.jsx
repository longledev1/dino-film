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
      <Title className="text-white mb-4">Seasons</Title>
      <div className="mb-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {visibleSeasons.map((season) => (
            <Link
              key={season.id}
              to={
                season.season_number === 1
                  ? `/tv/${id}`
                  : `/tv/${id}/season/${season.season_number}`
              }
              className="block"
            >
              <div className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl bg-gray-800/80 p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-white/5 hover:border-secondary/30">
                <div className="h-[240px] w-[160px] shrink-0 mx-auto sm:mx-0 overflow-hidden rounded-xl shadow-md">
                  <ImageComponent
                    src={
                      season.poster_path
                        ? `${IMAGE_BASE_URL}/original/${season.poster_path}`
                        : null
                    }
                    alt={season.name || "Season poster"}
                    width={160}
                    height={240}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 sm:mt-0 sm:ml-5 flex flex-1 flex-col space-y-2 text-xs sm:text-sm text-gray-300">
                  <h4 className="text-lg font-bold text-white group-hover:text-secondary transition-colors">
                    {season.name}
                  </h4>

                  <div className="flex items-center gap-x-2">
                    <span className="font-bold text-secondary">Rating:</span>
                    {season.vote_average ? (
                      <CircularProgress
                        percent={Math.round(season.vote_average * 10)}
                        strokeColor={
                          season.vote_average >= 7
                            ? "var(--color-primary)"
                            : season.vote_average >= 5
                              ? "var(--color-secondary)"
                              : "#ef4444"
                        }
                      />
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>

                  <div className="flex items-center gap-x-2">
                    <span className="font-bold text-secondary">Air Date:</span>
                    <span>{season.air_date ?? "N/A"}</span>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <span className="font-bold text-secondary">Episodes:</span>
                    <span>{season.episode_count ?? "N/A"} episodes</span>
                  </div>

                  <div>
                    <span className="font-bold text-secondary">Overview:</span>
                    <p className="mt-1 line-clamp-3 leading-relaxed text-gray-300">
                      {season.overview || "No overview available."}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredSeasons.length > 2 && (
          <div className="mt-6 flex justify-center">
            <ShowMoreButton
              setIsShowMore={setIsShowMore}
              isShowMore={isShowMore}
              currentData={filteredSeasons.length}
              visibleLimit={2}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SeasonList;

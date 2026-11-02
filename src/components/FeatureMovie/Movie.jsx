import React from "react";
import { useModalContext } from "@/context/ModalProvider";
import { FaPlayCircle, FaBookmark, FaRegBookmark } from "react-icons/fa";
import TrailerVideo from "@components/TrailerVideo";
import { Link } from "react-router-dom";
import useWatchlist from "@/hooks/useWatchlist";

const Movie = ({ data, categoryMovie, trailerKey }) => {
  const { setContent, setIsModalShowing } = useModalContext();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  if (!data) return null;

  const getCategoryMovie = (data?.genre_ids || [])
    .map((id) => {
      const category = (categoryMovie || []).find((c) => c.id === id);
      return category ? category.name : null;
    })
    .filter(Boolean);

  const handleOpenTrailer = () => {
    setIsModalShowing(true);
    setContent(<TrailerVideo key={trailerKey} trailerKey={trailerKey} />);
  };

  const isSaved = isInWatchlist(data.id);

  const handleToggleWatchlist = () => {
    toggleWatchlist({
      ...data,
      media_type: "movie",
    });
  };

  return (
    <div className="container relative z-20 flex h-full flex-col items-start justify-end pb-16 text-white">
      <div className="max-w-3xl">
        <Link to={`/movie/${data.id}`}>
          <h2 className="mb-3 text-3xl font-extrabold tracking-tight transition-colors duration-200 hover:text-secondary md:text-5xl lg:text-6xl drop-shadow-md">
            {data.title}
          </h2>
        </Link>

        <p className="text-sm font-medium text-gray-300 mb-3">
          {data.release_date ? new Date(data.release_date).getFullYear() : ""}
        </p>

        {getCategoryMovie.length > 0 && (
          <div className="mb-4 flex flex-wrap items-center gap-2">
            {getCategoryMovie.map((name) => (
              <span
                key={name}
                className="rounded-full bg-white/15 backdrop-blur-md px-3 py-1 text-xs font-medium text-gray-200 border border-white/10"
              >
                {name}
              </span>
            ))}
          </div>
        )}

        <p className="mb-2 text-lg font-bold text-secondary">Overview</p>
        <p className="mb-6 line-clamp-3 text-sm text-gray-200 sm:text-base leading-relaxed drop-shadow">
          {data.overview || "No overview available."}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <button
            className="flex cursor-pointer items-center gap-x-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-lg shadow-primary/40 transition-all duration-200 hover:bg-primary-hover hover:scale-105 active:scale-95"
            onClick={handleOpenTrailer}
          >
            <FaPlayCircle className="text-xl" />
            <span>Watch Trailer</span>
          </button>

          <button
            onClick={handleToggleWatchlist}
            className={`flex cursor-pointer items-center gap-x-2 rounded-xl px-6 py-3.5 font-semibold backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 border ${
              isSaved
                ? "bg-secondary text-black border-secondary shadow-lg shadow-secondary/30"
                : "bg-white/15 text-white border-white/20 hover:bg-white hover:text-black"
            }`}
          >
            {isSaved ? (
              <FaBookmark className="text-lg text-black" />
            ) : (
              <FaRegBookmark className="text-lg" />
            )}
            <span>{isSaved ? "Saved to Watchlist" : "Add to Watchlist"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;

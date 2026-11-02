import React, { useEffect } from "react";
import Title from "@/components/Title";
import MovieCard from "@/components/MediaList/MovieCard";
import useWatchlist from "@/hooks/useWatchlist";
import { Link } from "react-router-dom";
import { FaBookmark, FaFilm } from "react-icons/fa6";

const WatchlistPage = () => {
  const { watchlist } = useWatchlist();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-[100px] pb-16 text-white">
      <div className="container">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20 text-secondary">
              <FaBookmark className="text-2xl" />
            </div>
            <div>
              <Title className="text-2xl font-bold sm:text-3xl">My Watchlist</Title>
              <p className="text-sm text-gray-400">
                You have {watchlist.length} saved{" "}
                {watchlist.length === 1 ? "title" : "titles"}
              </p>
            </div>
          </div>
        </div>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 text-gray-500">
              <FaFilm className="text-4xl" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">
              Your watchlist is empty
            </h3>
            <p className="mb-6 max-w-md text-sm text-gray-400">
              Explore thousands of movies and TV shows, and save them to watch
              later anytime!
            </p>
            <Link
              to="/"
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-all hover:bg-primary-hover hover:scale-105 active:scale-95"
            >
              Explore Movies Now
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {watchlist.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title}
                poster={item.poster_path}
                date={item.release_date}
                point={item.vote_average}
                type={item.media_type}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchlistPage;

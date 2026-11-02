import React, { useRef, useState } from "react";
import { IMAGE_BASE_URL } from "@/constant";
import ImageComponent from "../ImageComponent";
import { Link, useNavigate } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
import { IoClose, IoSearch } from "react-icons/io5";

const SearchMovie = ({ searchTodo, handleSearch, mediaData, isLoading }) => {
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);
  const navigate = useNavigate();

  useClickOutside(wrapper, () => setOpen(false));

  const handleSelectMedia = () => {
    setOpen(false);
  };

  const handleClear = () => {
    handleSearch({ target: { value: "" } });
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter" && searchTodo.trim()) {
      setOpen(false);
      navigate("/search", {
        state: { nameMedia: searchTodo.trim(), page: 1 },
      });
    }
  };

  return (
    <div className="relative" ref={wrapper}>
      {/* Search Input Box */}
      <div className="flex h-[42px] w-[200px] sm:w-[280px] md:w-[320px] lg:w-[360px] items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white shadow-lg backdrop-blur-md transition-all duration-300 focus-within:border-primary focus-within:bg-black/60 focus-within:w-[220px] sm:focus-within:w-[300px] md:focus-within:w-[350px]">
        <label htmlFor="search-movie-inp" className="cursor-pointer">
          <IoSearch className="h-5 w-5 text-gray-300" />
        </label>
        <input
          type="text"
          value={searchTodo}
          id="search-movie-inp"
          placeholder="Search movies, TV shows..."
          autoComplete="off"
          className="ml-2.5 flex-1 bg-transparent text-xs sm:text-sm font-normal placeholder-gray-400 outline-none"
          onChange={handleSearch}
          onKeyDown={handleSubmit}
          onFocus={() => setOpen(true)}
        />
        {searchTodo && (
          <button
            type="button"
            onClick={handleClear}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <IoClose className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown Results */}
      {open && (isLoading || (mediaData && mediaData.total_results >= 0)) && (
        <div className="absolute right-0 mt-2 w-[300px] sm:w-[360px] rounded-2xl bg-gray-900/95 p-3 shadow-2xl backdrop-blur-xl border border-white/10 z-50 animate-fadeIn">
          <div className="flex flex-col gap-y-1">
            {isLoading ? (
              <div className="flex items-center justify-center py-6 gap-3">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-xs text-gray-300">Searching titles...</p>
              </div>
            ) : mediaData && mediaData.total_results > 0 ? (
              <>
                <div className="px-2 py-1 text-xs font-semibold text-primary uppercase tracking-wider">
                  Top Results
                </div>

                {mediaData.results.slice(0, 5).map((media) => {
                  const targetUrl =
                    media.media_type === "tv"
                      ? `/tv/${media.id}`
                      : `/movie/${media.id}`;
                  return (
                    <Link
                      to={targetUrl}
                      key={media.id}
                      onClick={handleSelectMedia}
                      className="group flex cursor-pointer items-center gap-x-3 rounded-xl p-2 transition-colors hover:bg-white/10"
                    >
                      <div className="h-[60px] w-[42px] shrink-0 overflow-hidden rounded-md bg-gray-800">
                        <ImageComponent
                          src={
                            media.poster_path
                              ? `${IMAGE_BASE_URL}/original/${media.poster_path}`
                              : null
                          }
                          alt={media.title || media.name}
                          className="h-full w-full object-cover"
                          width={42}
                          height={60}
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-center overflow-hidden text-xs text-white">
                        <p className="truncate font-semibold transition-colors group-hover:text-primary sm:text-sm">
                          {media.title || media.name}
                        </p>

                        <div className="mt-1 flex items-center justify-between text-gray-400">
                          <span>
                            {media.release_date
                              ? media.release_date.slice(0, 4)
                              : media.first_air_date
                                ? media.first_air_date.slice(0, 4)
                                : "N/A"}
                          </span>
                          <span className="rounded bg-white/10 px-1 py-0.5 text-[10px] font-bold text-gray-300">
                            {media.media_type === "tv" ? "TV" : "MOVIE"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}

                <div className="mt-2 border-t border-white/10 pt-2">
                  <Link
                    to="/search"
                    state={{
                      nameMedia: searchTodo,
                      page: 1,
                    }}
                    onClick={handleSelectMedia}
                    className="block rounded-xl bg-white/5 py-2 text-center text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                  >
                    View all {mediaData?.total_results} results &rarr;
                  </Link>
                </div>
              </>
            ) : (
              mediaData && (
                <div className="py-6 text-center text-xs text-gray-400">
                  No movies or TV shows found.
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovie;

import React, { useRef, useState } from "react";
import { IMAGE_BASE_URL } from "@/constant";
import ImageComponent from "../ImageComponent";
import { Link } from "react-router-dom";
import useClickOutside from "@/hooks/useClickOutside";
const SearchMovie = ({ searchTodo, handleSearch, mediaData, isLoading }) => {
  const [open, setOpen] = useState(false);
  const wrapper = useRef(null);

  useClickOutside(wrapper, () => setOpen(false));

  return (
    <div className="relative">
      <div className="flex h-[46px] w-[370px] items-center rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white shadow-lg backdrop-blur-md">
        <label htmlFor="search-movie-inp">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
        </label>
        <input
          type="text"
          value={searchTodo}
          id="search-movie-inp"
          placeholder="Search movie name..."
          className="ml-3 flex-1 bg-transparent text-sm font-thin placeholder-gray-300 outline-none"
          onChange={(e) => {
            handleSearch(e);
          }}
          onFocus={() => setOpen(true)}
        />
      </div>

      {open && (isLoading || (mediaData && mediaData.total_results >= 0)) && (
        <div
          ref={wrapper}
          className="absolute mt-2 w-[370px] rounded-md bg-[#1d2029] p-4"
        >
          <div className="flex flex-col gap-y-1">
            {isLoading ? (
              <div className="flex justify-center py-4">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-200 border-t-transparent"></div>
                <p className="ml-3 text-sm text-white">Loading...</p>
              </div>
            ) : mediaData && mediaData.total_results > 0 ? (
              <>
                <p className="font-bold text-amber-200">Media List</p>

                {mediaData.results.slice(0, 5).map((media) => (
                  <Link
                    to={
                      media.media_type === "tv"
                        ? `/tv/${media.id}`
                        : `/movie/${media.id}`
                    }
                    key={media.id}
                  >
                    <div
                      key={media.id}
                      className="mt-2 flex cursor-pointer gap-x-4 rounded-md p-2 hover:bg-white/5"
                    >
                      <ImageComponent
                        src={`${IMAGE_BASE_URL}/original/${media.poster_path}`}
                        alt=""
                        className="rounded-md border-none"
                        width={50}
                        height={68}
                      />

                      <div className="flex w-full flex-col justify-between gap-y-2 text-[14px] font-thin text-white">
                        <p className="font-bold">{media.title || media.name}</p>

                        <div className="flex items-center justify-between">
                          <p className="text-gray-500">
                            {media.release_date || media.first_air_date}
                          </p>

                          <p className="rounded border border-slate-500 p-[2px] text-[12px] font-bold">
                            HD
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

                <div className="mt-4 cursor-pointer rounded-md border-2 border-gray-500 p-2 text-center text-[14px] font-bold text-white hover:opacity-75 sm:text-base">
                  <Link
                    to="/search?mediaType"
                    state={{
                      nameMedia: searchTodo,
                      page: 1,
                    }}
                  >
                    View more {mediaData?.total_results} results...
                  </Link>
                </div>
              </>
            ) : (
              mediaData && (
                <p className="text-center text-white">Not results found...</p>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchMovie;

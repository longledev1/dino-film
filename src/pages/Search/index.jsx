import React, { useState } from "react";
import Title from "@/components/Title";
import SearchForm from "@/components/Search/SearchForm";
import useSWR from "swr";
import { movieFetcher } from "@/services/fetcher";
import MediaCard from "@/components/People/PeopleCastCard";
import { SEARCH_QUERY } from "@/constant";
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaFilter } from "react-icons/fa";

const SearchPage = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const DEFAULT_FORM_VALUE = {
    mediaType: "movie",
    country: "",
    genres: [],
    rating: "all",
  };
  const [searchFormValue, setSearchFormValue] = useLocalStorage(
    "search-form",
    DEFAULT_FORM_VALUE,
  );
  const [minRating, maxRating] =
    searchFormValue?.rating === "all"
      ? [0, 100]
      : searchFormValue.rating.split(" - ");

  const SEARCH_ENDPOINT = SEARCH_QUERY.DISCOVER(
    searchFormValue.mediaType,
    searchFormValue.genres,
    searchFormValue.country,
    minRating,
    maxRating,
  );
  console.log("🚀 ~ SearchPage ~ SEARCH_ENDPOINT:", SEARCH_ENDPOINT);

  const { data } = useSWR(
    searchFormValue ? [SEARCH_ENDPOINT] : null,
    movieFetcher,
  );

  const filterBtnClick = () => {
    setIsShowFilter(!isShowFilter);
  };
  console.log("🚀 ~ SearchPage ~ data:", data);

  return (
    <div className="relative min-h-screen pt-[108px] text-white">
      <div className="px-[20px] py-[25px]">
        <div
          className={`relative rounded ${isShowFilter ? "border-1 border-gray-700" : ""} `}
        >
          <div
            className={`absolute -top-[20px] flex w-fit cursor-pointer items-center gap-x-2 bg-[#181b24] p-2 hover:opacity-75`}
            onClick={filterBtnClick}
          >
            {isShowFilter ? (
              <FaFilter className="text-base text-amber-200" />
            ) : (
              <FaFilter className="text-base text-white" />
            )}
            <p className="text-[20px] font-bold">Advanced Filter</p>
          </div>
          {isShowFilter && (
            <div className="mt-4">
              <SearchForm
                searchFormValue={searchFormValue}
                setSearchFormValue={setSearchFormValue}
                setIsShowFilter={setIsShowFilter}
              />
            </div>
          )}
        </div>

        <div className="mt-[50px]">
          <div className="">
            <div className="grid grid-cols-7 gap-4">
              {data &&
                data?.results.map((movie, index) => (
                  <MediaCard
                    key={`${movie.id}-${index}`}
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date || movie.first_air_date}
                    point={movie.vote_average}
                    poster={movie.poster_path}
                    type={movie.media_type || searchFormValue.mediaType}
                  ></MediaCard>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

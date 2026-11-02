import React, { useEffect, useState } from "react";
// Component
import Title from "@/components/Title";
import SearchForm from "@/components/Search/SearchForm";
import MovieCard from "@/components/MediaList/MovieCard";
import { MovieCardSkeleton } from "@/components/Loading/MovieCardSkeleton";
// useSWR
import useSWR from "swr";
// Constant & Config
import { movieFetcher } from "@/services/fetcher";
import { SEARCH_QUERY } from "@/constant";
// Icons
import { FaFilter } from "react-icons/fa";
import ReactPaginate from "react-paginate";
// React-router-dom
import { useSearchParams, useLocation } from "react-router-dom";

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const mediaTypeParam = searchParams.get("mediaType");

  const location = useLocation();

  // keywords from state (search by name)
  const keywords = location.state?.nameMedia || "";
  const searchingByName = Boolean(keywords && keywords.trim() !== "");

  // Default form values (advanced filter)
  const [searchFormValue, setSearchFormValue] = useState({
    mediaType: ["movie", "tv"].includes(mediaTypeParam)
      ? mediaTypeParam
      : "movie",
    country: "",
    genres: [],
    rating: "all",
  });

  // Khi param mediaType thay đổi trên URL (ví dụ click menu Movies hoặc TV Show trên header)
  useEffect(() => {
    if (["movie", "tv"].includes(mediaTypeParam)) {
      setSearchFormValue((prev) => ({
        ...prev,
        mediaType: mediaTypeParam,
      }));
      setCurrentPage(1);
    }
  }, [mediaTypeParam]);

  // Reset page khi keywords thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [keywords]);

  const [minRating, maxRating] =
    searchFormValue?.rating === "all"
      ? [0, 100]
      : searchFormValue.rating.split(" - ");

  // Search with form values (advanced filter)
  const SEARCH_ENDPOINT = SEARCH_QUERY.DISCOVER(
    searchFormValue.mediaType,
    searchFormValue.genres,
    searchFormValue.country,
    minRating,
    maxRating,
    currentPage,
  );

  // Search by name
  const SEARCH_BY_NAME_ENDPOINT = SEARCH_QUERY.MULTI_STRING(
    keywords,
    currentPage,
  );

  const endpoint = searchingByName ? SEARCH_BY_NAME_ENDPOINT : SEARCH_ENDPOINT;

  const { data: finalData, isLoading } = useSWR(
    endpoint ? [endpoint] : null,
    movieFetcher,
  );

  const filterBtnClick = () => {
    setIsShowFilter(!isShowFilter);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen pt-[110px] pb-16 text-white">
      <div className="container">
        {keywords ? (
          <div className="mb-6 flex flex-wrap items-baseline gap-2 border-b border-white/10 pb-4">
            <span className="text-xl sm:text-2xl text-gray-400">
              Results for:
            </span>
            <span className="text-2xl sm:text-3xl font-bold text-secondary">
              "{keywords}"
            </span>
          </div>
        ) : (
          <div className="mb-6 border-b border-white/10 pb-4">
            <Title className="text-2xl sm:text-3xl font-bold">
              Explore {searchFormValue.mediaType === "tv" ? "TV Shows" : "Movies"}
            </Title>
          </div>
        )}

        {/* Filter Toggle Button */}
        <div className="mb-8 rounded-2xl bg-gray-800/60 p-4 border border-white/10 backdrop-blur-sm">
          <div
            className="flex w-fit cursor-pointer items-center gap-x-2 text-sm sm:text-base font-semibold text-primary hover:text-primary-hover transition-colors"
            onClick={filterBtnClick}
          >
            <FaFilter className="text-sm" />
            <span>{isShowFilter ? "Hide Filters" : "Filter & Refine Movies"}</span>
          </div>

          {isShowFilter && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <SearchForm
                searchFormValue={searchFormValue}
                setSearchFormValue={setSearchFormValue}
                setIsShowFilter={setIsShowFilter}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>

        {/* Results Grid */}
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {Array.from({ length: 14 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          ) : finalData?.results && finalData.results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                {finalData.results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date || movie.first_air_date}
                    point={movie.vote_average || 0}
                    poster={movie.poster_path}
                    type={movie.media_type || searchFormValue.mediaType}
                  />
                ))}
              </div>

              {/* Pagination */}
              {finalData.total_pages > 1 && (
                <div className="mt-12 flex justify-center">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next &rarr;"
                    previousLabel="&larr; Prev"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={Math.min(finalData.total_pages, 500)}
                    forcePage={currentPage - 1}
                    containerClassName="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm"
                    pageClassName="flex items-center justify-center rounded-xl bg-gray-800/80 px-3.5 py-2 text-gray-300 hover:bg-primary hover:text-white transition-colors cursor-pointer"
                    activeClassName="!bg-primary !text-white font-bold shadow-lg shadow-primary/50"
                    previousClassName="flex items-center justify-center rounded-xl bg-gray-800/80 px-3.5 py-2 text-gray-300 hover:bg-white hover:text-black transition-colors cursor-pointer"
                    nextClassName="flex items-center justify-center rounded-xl bg-gray-800/80 px-3.5 py-2 text-gray-300 hover:bg-white hover:text-black transition-colors cursor-pointer"
                    disabledClassName="opacity-40 cursor-not-allowed hover:bg-gray-800/80 hover:text-gray-300"
                    breakClassName="px-2 text-gray-400"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="py-20 text-center text-gray-400">
              No matching titles found. Try adjusting your filter parameters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

import React, { useEffect, useRef, useState } from "react";
// Component
import Title from "@/components/Title";
import SearchForm from "@/components/Search/SearchForm";
import MediaCard from "@/components/People/PeopleCastCard";
// useSWR
import useSWR from "swr";
// Constant & Config
import { movieFetcher } from "@/services/fetcher";
import { SEARCH_QUERY } from "@/constant";
// Libary
import { useLocalStorage } from "@uidotdev/usehooks";
// Icons
import { FaFilter } from "react-icons/fa";
import ReactPaginate from "react-paginate";
// React-router-dom
import { useSearchParams, useLocation } from "react-router";
import Loading from "@/components/Loading";

const SearchPage = () => {
  const [currentPage, setCurrentPage] = useLocalStorage("page", 1);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [searchParams] = useSearchParams();
  const mediaType = searchParams.get("mediaType");

  const location = useLocation();
  const { pathname, search } = location;
  const fullPath = pathname.replace("/", "") + search;
  const prevFullPath = useRef(fullPath);

  // keywords from state (search by name)
  const keywords = location.state?.nameMedia || "";
  const searchingByName = keywords && keywords.trim() !== "";

  // Default form values (advanced filter)
  const DEFAULT_FORM_VALUE = {
    mediaType: ["movie", "tv"].includes(mediaType) ? mediaType : "movie",
    country: "",
    genres: [],
    rating: "all",
  };

  const [searchFormValue, setSearchFormValue] = useLocalStorage(
    "search-form",
    DEFAULT_FORM_VALUE,
  );

  const isFirstRender = useRef(true);

  useEffect(() => {
    // Bỏ qua lần render đầu tiên (mount)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      prevFullPath.current = fullPath; // lưu fullPath lúc mount
      return;
    }

    // Nếu fullPath khác fullPath trước → reset page
    if (prevFullPath.current !== fullPath) {
      setCurrentPage(1);
    }

    // Cập nhật fullPath cũ
    prevFullPath.current = fullPath;
  }, [fullPath]);

  // rest page when keywords
  const prevKeywords = useRef(keywords);

  useEffect(() => {
    if (isFirstRender.current) return;

    if (keywords !== prevKeywords.current) {
      setCurrentPage(1);
    }

    prevKeywords.current = keywords;
  }, [keywords]);

  const prevMediaType = useRef(searchFormValue.mediaType);

  useEffect(() => {
    if (isFirstRender.current) return;

    if (
      ["movie", "tv"].includes(mediaType) &&
      mediaType !== prevMediaType.current
    ) {
      setSearchFormValue({
        mediaType,
        country: "",
        genres: [],
        rating: "all",
      });
      setCurrentPage(1);
    }

    prevMediaType.current = mediaType;
  }, [mediaType, searchFormValue.mediaType, setSearchFormValue]);

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

  // get data
  // only fetch when endpoint is valid
  const { data: finalData, isLoading } = useSWR(
    endpoint ? [endpoint] : null,
    movieFetcher,
  );

  const filterBtnClick = () => {
    setIsShowFilter(!isShowFilter);
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 230, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen pt-[108px] text-white">
      {keywords && (
        <div className="ml-7 flex items-center gap-x-2 text-xl font-bold">
          <p>Search results for:</p>
          <p className="text-amber-200">{keywords}</p>
        </div>
      )}
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
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>

        <div className="mt-[50px]">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-200 border-t-transparent"></div>
              <p className="ml-3 text-sm text-white">Loading...</p>
            </div>
          ) : (
            <>
              <div className="mb-10 grid grid-cols-7 gap-4">
                {finalData &&
                  finalData?.results.map((movie, index) => (
                    <MediaCard
                      key={`${movie.id}-${index}`}
                      id={movie.id}
                      title={movie.title || movie.name}
                      date={movie.release_date || movie.first_air_date}
                      onPageChange={handlePageChange}
                      point={movie.vote_average}
                      poster={movie.poster_path}
                      type={movie.media_type || searchFormValue.mediaType}
                    ></MediaCard>
                  ))}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                pageCount={Math.min(finalData?.total_pages, 500)}
                forcePage={currentPage - 1}
                previousLabel="<"
                containerClassName="flex gap-2 items-center justify-center mt-6"
                pageClassName="outline-none px-3 py-1 rounded cursor-pointer hover:opacity-75 rounded-full w-fit "
                activeClassName="border-2 bg-amber-200 text-black font-bold"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

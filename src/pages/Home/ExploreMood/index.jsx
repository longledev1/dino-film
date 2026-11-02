import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Title from "@/components/Title";
import { movieFetcher } from "@/services/fetcher";
import useSWR from "swr";
import { MOOD_MEDIA_DATA } from "@/constant";
import MovieCard from "@/components/MediaList/MovieCard";
import { MovieCardSkeleton } from "@/components/Loading/MovieCardSkeleton";
import ReactPaginate from "react-paginate";
import { capitalize } from "@/constant/ultil";
import { FaArrowLeft } from "react-icons/fa6";

const MoodPage = () => {
  const { type } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  // Reset trang về 1 khi đổi type
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, [type]);

  const MOOD_MEDIA_ENDPOINT = MOOD_MEDIA_DATA[type];

  const { data, isLoading } = useSWR(
    MOOD_MEDIA_ENDPOINT ? [MOOD_MEDIA_ENDPOINT(currentPage)] : null,
    movieFetcher,
  );

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen pt-[110px] pb-16 text-white">
      <div className="container">
        {/* Breadcrumb / Back button */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>

        {/* Title Section */}
        <div className="mb-8 flex items-baseline gap-x-3 border-b border-white/10 pb-4">
          <Title className="text-2xl font-bold sm:text-4xl text-secondary">
            {capitalize(type || "")}
          </Title>
          <span className="text-xl font-medium text-gray-400">Collection</span>
        </div>

        {/* Movie Grid */}
        <div>
          {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
              {Array.from({ length: 14 }).map((_, i) => (
                <MovieCardSkeleton key={i} />
              ))}
            </div>
          ) : data?.results && data.results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
                {data.results.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date || movie.first_air_date}
                    point={movie.vote_average || 0}
                    poster={movie.poster_path}
                    type={movie.media_type || "movie"}
                  />
                ))}
              </div>

              {/* Pagination */}
              {data.total_pages > 1 && (
                <div className="mt-12 flex justify-center">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next &rarr;"
                    previousLabel="&larr; Prev"
                    onPageChange={handlePageChange}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={1}
                    pageCount={Math.min(data.total_pages, 500)}
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
              No movies found in this collection.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;

import React from "react";
import { useLocation, Link } from "react-router-dom";
import useSWR from "swr";
import { SEARCH_QUERY } from "@/constant";
import MovieCard from "@/components/MediaList/MovieCard";
import { MovieCardSkeleton } from "@/components/Loading/MovieCardSkeleton";
import Title from "@/components/Title";

const MediaResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || location.state?.nameMedia || "";

  const endpoint = query ? SEARCH_QUERY.MULTI(query) : null;
  const { data, isLoading } = useSWR(endpoint, async ({ endpoint, params }) => {
    const MovieServices = (await import("@/services/MovieServices")).default;
    return await MovieServices.request(endpoint, params);
  });

  return (
    <div className="relative min-h-screen pt-[110px] pb-16 text-white">
      <div className="container">
        <div className="mb-8 border-b border-white/10 pb-4">
          <Title className="text-2xl font-bold sm:text-3xl">
            {query ? `Search Results for "${query}"` : "Media Results"}
          </Title>
          {data && (
            <p className="mt-1 text-sm text-gray-400">
              Found {data.total_results || 0} results
            </p>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {Array.from({ length: 14 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : data?.results && data.results.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {data.results.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                title={item.title || item.name}
                poster={item.poster_path}
                date={item.release_date || item.first_air_date}
                point={item.vote_average || 0}
                type={item.media_type || "movie"}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h3 className="mb-2 text-xl font-bold text-white">
              No results found
            </h3>
            <p className="mb-6 text-sm text-gray-400">
              Try searching with another keyword or explore trending movies.
            </p>
            <Link
              to="/"
              className="rounded-xl bg-primary px-6 py-3 font-semibold text-white transition-all hover:bg-primary-hover hover:scale-105"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaResults;

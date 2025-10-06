// Hooks
import { useEffect, useMemo, useState } from "react";
// Component
import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";
import Loading from "../Loading";
// SWR
import useSWR from "swr";
// Service
import { movieFetcher } from "@services/fetcher";
// Constant
import { IMAGE_BASE_URL } from "@constants";

export default function FeatureMovie() {
  // State
  const [index, setIndex] = useState(0);

  // Fetch-data
  const { data: popular, isLoading: popularLoading } = useSWR(
    ["/movie/popular"],
    movieFetcher,
  );

  const { data: category, isLoading: categoryLoading } = useSWR(
    ["/genre/movie/list"],
    movieFetcher,
  );

  const movies = useMemo(() => popular?.results?.slice(0, 4) || [], [popular]);
  const categoryMovie = useMemo(() => category?.genres || [], [category]);

  const activeMovie = movies[index];

  const loading = popularLoading || categoryLoading;

  // Auto-play slider
  useEffect(() => {
    if (movies.length === 0) return;

    const timer = setTimeout(() => {
      setIndex((prev) => (prev >= movies.length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearTimeout(timer);
  }, [index, movies]);

  // Preload poster images
  useEffect(() => {
    movies.forEach((movie) => {
      const img = new Image();
      img.src = `${IMAGE_BASE_URL}/p/original/${movie.backdrop_path}`;
    });
  }, [movies]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative inset-0 h-screen w-full overflow-hidden">
      {/* Background slider */}
      {movies.map((movie, i) => {
        const isActive = i === index;
        return (
          <div
            key={movie.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            style={{
              backgroundImage: `url(${IMAGE_BASE_URL}/original/${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        );
      })}

      {/* Nội dung Hero */}
      <div className="relative z-20 flex h-full flex-col items-start justify-end px-10 text-white">
        <Movie data={activeMovie} categoryMovie={categoryMovie} />
      </div>

      {/* PaginateIndicator */}
      <PaginateIndicator movies={movies} index={index} setIndex={setIndex} />
    </div>
  );
}

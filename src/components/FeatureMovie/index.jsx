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
import {
  IMAGE_BASE_URL,
  MEDIA_DATA,
  DETAILS_DATA,
  GENRES_URL,
} from "@constants";
import { useModalContext } from "@/context/ModalProvider";

export default function FeatureMovie() {
  // context
  const { isModalShowing } = useModalContext();

  // State
  const [index, setIndex] = useState(0);
  const [activeID, setActiveID] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const popularEndpoint = MEDIA_DATA?.POPULAR_MOVIES;

  // Fetch-data
  const { data: popular, isLoading: popularLoading } = useSWR(
    popularEndpoint ? [popularEndpoint] : null,
    movieFetcher,
  );

  const { data: category, isLoading: categoryLoading } = useSWR(
    GENRES_URL ? [GENRES_URL] : null,
    movieFetcher,
  );

  const { data: movieDetail } = useSWR(
    activeID ? [DETAILS_DATA?.MOVIE(activeID)] : null,
    movieFetcher,
  );

  const movies = useMemo(() => popular?.results?.slice(0, 5) || [], [popular]);
  const categoryMovie = useMemo(() => category?.genres || [], [category]);

  const activeMovie = movies[index];
  const loading = popularLoading || categoryLoading;

  useEffect(() => {
    if (movies.length > 0 && !activeID) {
      setActiveID(movies[0].id);
    }
  }, [movies, activeID]);

  // Auto-play slider với thời gian 7 giây, tạm dừng khi hover hoặc đang mở modal trailer
  useEffect(() => {
    if (movies.length === 0) return;
    if (isModalShowing || isHovered) return;

    setActiveID(movies[index]?.id);

    const timer = setTimeout(() => {
      setIndex((prev) => (prev >= movies.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearTimeout(timer);
  }, [index, movies, isModalShowing, isHovered]);

  // Preload poster images đúng URL
  useEffect(() => {
    movies.forEach((movie) => {
      if (movie.backdrop_path) {
        const img = new Image();
        img.src = `${IMAGE_BASE_URL}/original/${movie.backdrop_path}`;
      }
    });
  }, [movies]);

  const trailerVideo = (movieDetail?.videos?.results || []).find((video) => {
    return video.type === "Trailer" && video.site === "YouTube";
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div
      className="relative inset-0 h-[85vh] min-h-[550px] max-h-[850px] w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background slider with smooth fade transitions */}
      {movies.map((movie, i) => {
        const isActive = i === index;
        return (
          <div
            key={movie.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              isActive ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
            style={{
              backgroundImage: movie.backdrop_path
                ? `url(${IMAGE_BASE_URL}/original/${movie.backdrop_path})`
                : "none",
            }}
          >
            {/* Multi-layered cinematic gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#181b24] via-[#181b24]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#181b24]/90 via-[#181b24]/40 to-transparent" />
          </div>
        );
      })}

      {/* Nội dung Hero */}
      <div className="relative z-20 flex h-full flex-col justify-end">
        <Movie
          data={activeMovie}
          categoryMovie={categoryMovie}
          trailerKey={trailerVideo?.key}
        />
      </div>

      {/* PaginateIndicator */}
      <PaginateIndicator
        movies={movies}
        index={index}
        setIndex={setIndex}
        setActiveID={setActiveID}
      />
    </div>
  );
}

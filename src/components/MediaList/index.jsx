import { useRef } from "react";
// SWR
import useSWR from "swr";
// Component
import MovieCard from "./MovieCard";
import { MovieCardSkeleton } from "../Loading/MovieCardSkeleton";
// movieFetcher
import { movieFetcher } from "@services/fetcher";
// Swiper-Slide
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../assets/css/media.css";
// Component
import SectionHeader from "../SectionHeader";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MediaList = ({ title, movieData }) => {
  const { data, isLoading } = useSWR(
    movieData ? [movieData] : null,
    movieFetcher,
  );
  const swiperRef = useRef(null);

  return (
    <div className="relative group/list">
      <SectionHeader title={title}>
        {/* Navigation Buttons for desktop */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous slide"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
          >
            <FaChevronLeft className="text-xs" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next slide"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white hover:text-black active:scale-95"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </SectionHeader>

      <div className="movie-list">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
            {Array.from({ length: 7 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={18}
            slidesPerView={7}
            grabCursor={true}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
              1280: {
                slidesPerView: 7,
                spaceBetween: 18,
              },
            }}
          >
            {data?.results &&
              data.results.map((movie) => (
                <SwiperSlide key={movie.id} className="py-2">
                  <MovieCard
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date || movie.first_air_date}
                    point={movie.vote_average || 0}
                    poster={movie.poster_path}
                    type={movie.media_type || "movie"}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default MediaList;

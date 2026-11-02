import { useRef } from "react";
// Component
import SectionHeader from "../SectionHeader";
import MovieNewCard from "./MovieNewCard";
import { MovieCardSkeleton } from "../Loading/MovieCardSkeleton";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "../../assets/css/media.css";
// USWR
import useSWR from "swr";
// movieFetcher
import { movieFetcher } from "../../services/fetcher";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MovieNew = ({ title, movieData }) => {
  const { data, isLoading } = useSWR(
    movieData ? [movieData] : null,
    movieFetcher,
  );
  const swiperRef = useRef(null);

  return (
    <div className="relative group/new">
      <SectionHeader title={title}>
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

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <Swiper
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={20}
          slidesPerView={5}
          grabCursor={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {data?.results &&
            data.results.slice(0, 10).map((movie, index) => (
              <SwiperSlide className="px-1.5 py-4" key={movie.id}>
                <MovieNewCard
                  id={movie.id}
                  index={index}
                  poster={movie.poster_path}
                  title={movie.name || movie.title}
                  date={movie.first_air_date || movie.release_date}
                  type={movie.media_type || (movie.name ? "tv" : "movie")}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </div>
  );
};

export default MovieNew;

import { useMemo, useRef, useState } from "react";

// Component
import SectionHeader from "../SectionHeader";
import MediaPreviewCard from "./MediaPreviewCard";
import ImageIndicator from "./ImageIndicator";
import CircleIndicator from "./CircleIndicator";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "./MediaPreview.css";

// import required modules
import { EffectFade } from "swiper/modules";

// useSWR
import useSWR from "swr";

// Constant
import { GENRES_URL } from "@constants";
import { movieFetcher } from "@services/fetcher";

const MediaSlider = ({ title, movieData }) => {
  const [index, setIndex] = useState(0);
  const { data, isLoading } = useSWR(
    movieData ? [movieData] : null,
    movieFetcher,
  );
  const { data: category } = useSWR(
    GENRES_URL ? [GENRES_URL] : null,
    movieFetcher,
  );
  const swiperRef = useRef(null);
  const categoryMovie = useMemo(() => category?.genres || [], [category]);
  const movies = useMemo(() => data?.results?.slice(0, 15) || [], [data]);

  const handlePreviewClick = (i) => {
    setIndex(i);
    if (swiperRef.current) {
      swiperRef.current.slideTo(i);
    }
  };

  if (isLoading && movies.length === 0) {
    return (
      <div className="py-4">
        <SectionHeader title={title} />
        <div className="h-[460px] w-full rounded-2xl bg-gray-800/60 animate-pulse border border-white/5" />
      </div>
    );
  }

  return (
    <div className="relative">
      <SectionHeader title={title} />

      {/* Main Swiper with true crossFade and opaque slide background */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        spaceBetween={0}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        modules={[EffectFade]}
        grabCursor={true}
        className="rounded-2xl overflow-hidden bg-[#181b24]"
      >
        {movies.map((movie, idx) => (
          <SwiperSlide key={movie.id} className="!bg-[#181b24] overflow-hidden">
            <MediaPreviewCard
              id={movie.id}
              index={idx}
              background={movie.backdrop_path}
              title={movie.name || movie.title}
              date={movie.first_air_date || movie.release_date}
              overview={movie.overview}
              genres={movie.genre_ids}
              categoryMovie={categoryMovie}
              point={movie.vote_average}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Desktop Image Preview Thumbnails: đặt ngay dưới card, căn giữa và nổi bật */}
      <div className="relative z-10 hidden -mt-8 justify-center lg:flex px-4">
        <div className="rounded-2xl bg-gray-900/90 p-2 shadow-2xl backdrop-blur-md border border-white/10 max-w-full">
          <ImageIndicator
            movies={movies}
            index={index}
            onPreviewClick={handlePreviewClick}
          />
        </div>
      </div>

      {/* Mobile Circle Indicator */}
      <div className="mt-4 flex justify-center gap-x-3 lg:hidden">
        <CircleIndicator
          movies={movies}
          index={index}
          onPreviewClick={handlePreviewClick}
        />
      </div>
    </div>
  );
};

export default MediaSlider;

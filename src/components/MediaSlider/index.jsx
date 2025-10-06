import { useMemo, useRef, useState } from "react";

// Component
import Title from "../Title";
import MediaPreviewCard from "./MediaPreviewCard";
import ImageIndicator from "./ImageIndicator";
import CircleIndicator from "./CircleIndicator";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// import required modules
import { EffectFade } from "swiper/modules";

// useSWR
import useSWR from "swr";

// Constant
import { GENRES_URL } from "@constants";
import { movieFetcher } from "@services/fetcher";

const MediaSlider = (props) => {
  const [index, setIndex] = useState(0);
  const { title, movieData } = props;
  const { data } = useSWR(movieData ? [movieData] : null, movieFetcher);
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

  return (
    <div>
      <Title className="mb-4 text-white">{title}</Title>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setIndex(swiper.activeIndex)}
        spaceBetween={30}
        effect="fade"
        modules={[EffectFade]}
        grabCursor={true}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <MediaPreviewCard
              id={movie.id}
              index={index}
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

      {/* Image Preview */}
      <div className="relative z-10 hidden translate-y-[-50%] transform items-center justify-center gap-x-4 lg:flex">
        <ImageIndicator
          movies={movies}
          index={index}
          onPreviewClick={handlePreviewClick}
        />
      </div>

      {/* Circle Indicator */}
      <div className="mt-4 flex justify-center gap-x-4 lg:hidden">
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

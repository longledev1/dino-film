// Component
import Title from "../Title";
import MovieNewCard from "./MovieNewCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "../../assets/css/media.css";
// USWR
import useSWR from "swr";
// movieFetcher
import { movieFetcher } from "../../services/fetcher";

const MovieNew = (props) => {
  const { title, movieData } = props;
  const { data } = useSWR(movieData ? [movieData] : null, movieFetcher);
  console.log({ data });
  return (
    <div>
      <Title className={"mb-4 text-white"}>{title}</Title>
      <Swiper
        spaceBetween={20}
        slidesPerView={5} // default cho màn hình lớn
        grabCursor={true}
      >
        {data?.results &&
          data?.results.slice(0, 10).map((movie, index) => (
            <SwiperSlide
              className="mt-4 !w-[256px] overflow-visible"
              key={movie.id}
            >
              <MovieNewCard
                index={index}
                poster={movie.poster_path}
                title={movie.name || movie.title}
                date={movie.first_air_date || movie.release_date}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieNew;

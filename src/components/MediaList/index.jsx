// SWR
import useSWR from "swr";
// Component
import MovieCard from "./MovieCard";
// movieFetcher
import { movieFetcher } from "@services/fetcher";
// Swiper-Slide
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../assets/css/media.css";
// Component
import Title from "../Title";
const MediaList = ({ title, movieData }) => {
  const { data } = useSWR(movieData ? [movieData] : null, movieFetcher);
  return (
    <div className="">
      <Title className="text-white">{title}</Title>
      <div className="movie-list mt-4">
        <Swiper
          spaceBetween={30}
          slidesPerView={7} // default cho màn hình lớn
          breakpoints={{
            320: {
              // mobile nhỏ
              slidesPerView: 2,
              spaceBetween: 10,
            },
            640: {
              // mobile lớn
              slidesPerView: 3,
              spaceBetween: 15,
            },
            768: {
              // tablet
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1024: {
              // desktop nhỏ
              slidesPerView: 5,
              spaceBetween: 25,
            },
            1280: {
              // desktop lớn
              slidesPerView: 7,
              spaceBetween: 30,
            },
          }}
        >
          {data?.results.length > 0 &&
            data?.results.map((movie) => (
              <SwiperSlide key={movie.id}>
                <MovieCard
                  id={movie.id}
                  title={movie.title}
                  date={movie.release_date}
                  point={movie.vote_average}
                  poster={movie.poster_path}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};
export default MediaList;

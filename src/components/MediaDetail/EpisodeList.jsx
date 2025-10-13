import React from "react";
import Title from "@components/Title";
import EpisodeCard from "./EpisodeCard";
// Swiper-Slide
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
const EpisodeList = ({ episodes }) => {
  return (
    <div>
      <Title className="text-white">Episode List</Title>
      <div className="mt-4">
        <Swiper
          spaceBetween={30}
          slidesPerView={5}
          grabCursor={true}
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
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {episodes &&
            episodes?.map((ep) => (
              <SwiperSlide key={ep?.id}>
                <EpisodeCard
                  episode_number={ep.episode_number}
                  runtime={ep?.runtime}
                  name={ep?.name}
                  image={ep?.still_path}
                  overview={ep?.overview}
                  date={ep?.air_date}
                ></EpisodeCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default EpisodeList;

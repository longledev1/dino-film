import React from "react";
import Title from "@components/Title";
import RelatedMediaCard from "./RelatedMediaCard";

// Swiper
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./RelatedMediaCard.css";
// import required modules
import { Grid, Pagination } from "swiper/modules";

const RelatedMediaList = ({
  title,
  isMovieRelatedListLoading,
  relatedList,
}) => {
  if (isMovieRelatedListLoading) {
    return <p>Loading TV....</p>;
  }

  return (
    <div>
      <Title className="text-white">{title}</Title>
      <div className="mt-4">
        <Swiper
          slidesPerView={6}
          grid={{ rows: 2, fill: "row" }}
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Grid, Pagination]}
          className="related-swiper"
          breakpoints={{
            320: {
              // mobile nhỏ
              slidesPerView: 3,
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
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              // desktop lớn
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
        >
          {relatedList &&
            relatedList.map((data) => (
              <SwiperSlide key={data.id}>
                <RelatedMediaCard
                  id={data.id}
                  title={data.title || data.name}
                  date={data.release_date || data.first_air_date}
                  point={data.vote_average}
                  poster={data.poster_path}
                  type={data.media_type}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default RelatedMediaList;

import React from "react";
import Title from "@components/Title";
import RelatedMediaCard from "./RelatedMediaCard";
import { MovieCardSkeleton } from "../Loading/MovieCardSkeleton";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "./RelatedMediaCard.css";
import { Grid, Pagination } from "swiper/modules";

const RelatedMediaList = ({
  title,
  isMovieRelatedListLoading,
  relatedList = [],
}) => {
  if (isMovieRelatedListLoading) {
    return (
      <div className="mt-8">
        <Title className="text-white mb-4">{title}</Title>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const hasData = Array.isArray(relatedList) && relatedList.length > 0;

  return (
    <div className="mt-8">
      <Title className="text-white mb-4">{title}</Title>
      {hasData ? (
        <div>
          <Swiper
            slidesPerView={6}
            grid={{ rows: 2, fill: "row" }}
            spaceBetween={14}
            pagination={{ clickable: true }}
            modules={[Grid, Pagination]}
            className="related-swiper pb-10"
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 14,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
              1280: {
                slidesPerView: 6,
                spaceBetween: 18,
              },
            }}
          >
            {relatedList.map((data) => (
              <SwiperSlide key={data.id}>
                <RelatedMediaCard
                  id={data.id}
                  title={data.title || data.name}
                  date={data.release_date || data.first_air_date}
                  point={data.vote_average || 0}
                  poster={data.poster_path}
                  type={data.media_type}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <p className="mt-2 text-sm text-gray-400">
          No recommendations available at this time.
        </p>
      )}
    </div>
  );
};

export default RelatedMediaList;

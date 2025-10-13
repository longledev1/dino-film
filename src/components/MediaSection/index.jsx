// Component
import Title from "../Title";
import MovieCard from "../MediaList/MovieCard";
// Hooks
import { useState, useCallback, useMemo } from "react";
// SWR
import useSWR from "swr";
// Service
import { movieFetcher } from "@services/fetcher";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "../../assets/css/media.css";

const MediaSection = ({ title, tabs }) => {
  const [activeTabID, setActiveTabID] = useState(tabs[0].id);

  const url = useMemo(() => {
    return tabs.find((tab) => tab.id === activeTabID)?.url || null;
  }, [activeTabID, tabs]);

  const { data: trendingData } = useSWR(url ? [url] : null, movieFetcher, {
    keepPreviousData: true,
  });

  // Tránh re-render khi bấm lại tab đã active
  const handleChangeTab = useCallback(
    (id) => {
      if (id === activeTabID) return;
      setActiveTabID(id);
    },
    [activeTabID],
  );

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-x-2">
        <div className="flex items-center gap-x-2 text-left">
          <span className="text-2xl">
            {title === "Hot Right Now" ? "🔥" : "⭐"}{" "}
          </span>
          <Title
            className={`${title === "The Best of the Best" ? "bg-gradient-to-tr from-emerald-200 via-emerald-400 to-emerald-600 bg-clip-text text-transparent" : "bg-gradient-to-tr from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent"}`}
          >
            {title}
          </Title>
        </div>

        <ul
          role="tablist"
          className="flex gap-2 rounded border border-slate-500 text-[16px] outline-none lg:gap-4"
        >
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                role="tab"
                aria-selected={tab.id === activeTabID}
                onClick={() => handleChangeTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleChangeTab(tab.id);
                  }
                }}
                className={`h-full cursor-pointer rounded px-4 py-2 hover:bg-slate-800 ${
                  tab.id === activeTabID
                    ? "bg-slate-800 text-white"
                    : "text-white/80"
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
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
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {trendingData?.results &&
            trendingData?.results.map((movie) => (
              <SwiperSlide key={movie.id} className="">
                <MovieCard
                  id={movie?.id}
                  title={movie?.title || movie?.name}
                  className={"p-2"}
                  onDesktop={true}
                  type={movie?.media_type || activeTabID}
                  date={movie?.release_date || movie?.first_air_date}
                  point={movie?.vote_average}
                  poster={movie?.poster_path}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MediaSection;

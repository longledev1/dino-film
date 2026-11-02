// Component
import SectionHeader from "../SectionHeader";
import MovieCard from "../MediaList/MovieCard";
import { MovieCardSkeleton } from "../Loading/MovieCardSkeleton";
// Hooks
import { useCallback, useMemo, useRef } from "react";
// SWR
import useSWR from "swr";
// Service
import { movieFetcher } from "@services/fetcher";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "../../assets/css/media.css";
// uselocalStorage
import { useLocalStorage } from "@uidotdev/usehooks";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const MediaSection = ({ title, tabs, storageKey }) => {
  const [activeTabID, setActiveTabID] = useLocalStorage(storageKey, tabs[0].id);
  const swiperRef = useRef(null);

  const url = useMemo(() => {
    return tabs.find((tab) => tab.id === activeTabID)?.url || null;
  }, [activeTabID, tabs]);

  const { data: trendingData, isLoading } = useSWR(
    url ? [url] : null,
    movieFetcher,
    {
      keepPreviousData: true,
    },
  );

  const handleChangeTab = useCallback(
    (id) => {
      if (id === activeTabID) return;
      setActiveTabID(id);
    },
    [activeTabID, setActiveTabID],
  );

  return (
    <div className="relative group/section">
      <SectionHeader title={title}>
        <ul
          role="tablist"
          className="flex gap-1.5 rounded-xl bg-gray-800/80 p-1 border border-white/10 text-sm backdrop-blur-sm"
        >
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                role="tab"
                aria-selected={tab.id === activeTabID}
                onClick={() => handleChangeTab(tab.id)}
                className={`cursor-pointer rounded-lg px-4 py-1.5 text-xs font-semibold transition-all duration-200 sm:text-sm ${
                  tab.id === activeTabID
                    ? "bg-primary text-white shadow-md shadow-primary/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>

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

      <div>
        {isLoading && !trendingData ? (
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
            {trendingData?.results &&
              trendingData.results.map((movie) => (
                <SwiperSlide key={movie.id} className="py-2">
                  <MovieCard
                    id={movie.id}
                    title={movie.title || movie.name}
                    date={movie.release_date || movie.first_air_date}
                    point={movie.vote_average || 0}
                    poster={movie.poster_path}
                    type={movie.media_type || activeTabID}
                    isMediaSection={false}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default MediaSection;

import React from "react";
// Lazy
import { lazy } from "react";
// Components
import FeatureMovie from "@components/FeatureMovie";
import MoodSection from "@components/MoodSection";
import BackToTopButton from "@components/BackToTopButton";
import SectionSuspense from "@/components/SectionSuspense/SectionSuspense";
const MediaList = lazy(() => import("@components/MediaList"));
const MediaSection = lazy(() => import("@components/MediaSection"));
const MovieNew = lazy(() => import("@components/MovieNew"));
const MediaSlider = lazy(() => import("@components/MediaSlider"));
// Constant
import { MEDIA_DATA, TABS_TOP_RATED, TABS_TRENDING } from "@constants";

function Home() {
  return (
    <div className="bg-[#181b24] min-h-screen">
      {/* BANNER FEATURE */}
      <FeatureMovie />

      {/* MAIN CONTAINER */}
      <div className="container flex flex-col gap-y-14 py-8">
        <MoodSection />

        <SectionSuspense>
          <MediaList
            movieData={MEDIA_DATA?.NOW_PLAYING_MOVIES}
            title="Now In Theaters"
          />
        </SectionSuspense>

        <SectionSuspense>
          <MediaSection
            title="Hot Right Now"
            tabs={TABS_TRENDING}
            storageKey="hot-right-now-tab"
          />
        </SectionSuspense>

        <SectionSuspense>
          <MediaSection
            title="The Best of the Best"
            tabs={TABS_TOP_RATED}
            storageKey="the-best-tab"
          />
        </SectionSuspense>

        <SectionSuspense>
          <MediaList
            movieData={MEDIA_DATA?.POPULAR_MOVIES}
            title="Fan Favorites & Blockbusters"
          />
        </SectionSuspense>

        <SectionSuspense>
          <MovieNew
            title="Top 10 Trending TV Series"
            movieData={MEDIA_DATA?.TRENDING_TV}
          />
        </SectionSuspense>

        <SectionSuspense>
          <MediaSlider
            title="Latest Anime Collection"
            movieData={MEDIA_DATA.ANIME_MOVIES}
          />
        </SectionSuspense>

        <SectionSuspense>
          <MovieNew
            title="Top 10 Box Office Movies"
            movieData={MEDIA_DATA?.TRENDING_MOVIES}
          />
        </SectionSuspense>

        <SectionSuspense>
          <MediaList
            movieData={MEDIA_DATA?.DISNEY_MOVIES}
            title="Timeless Disney Magic"
          />
        </SectionSuspense>

        <SectionSuspense>
          <MediaList
            movieData={MEDIA_DATA?.CHINESE_MOVIES}
            title="Asian & Chinese Cinema"
          />
        </SectionSuspense>
      </div>

      <BackToTopButton />
    </div>
  );
}

export default Home;

import React, { useEffect } from "react";
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#181b24]">
      {/* BANNER FEATURE */}
      <FeatureMovie />
      {/* MAIN */}
      <div className="min-h-screen">
        <div className="container flex h-full flex-col gap-y-12">
          <MoodSection />
          <SectionSuspense>
            <MediaList
              movieData={MEDIA_DATA?.NOW_PLAYING_MOVIES}
              title="Just Released"
            />
          </SectionSuspense>
          <SectionSuspense>
            <MediaSection
              title={"Hot Right Now"}
              tabs={TABS_TRENDING}
              storageKey={"hot-right-now-tab"}
            />
          </SectionSuspense>
          <SectionSuspense>
            <MediaSection
              title={"The Best of the Best"}
              tabs={TABS_TOP_RATED}
              storageKey={"the-best-tab"}
            />
          </SectionSuspense>
          <SectionSuspense>
            <MediaList
              movieData={MEDIA_DATA?.POPULAR_MOVIES}
              title="Just Released"
            />
          </SectionSuspense>
          <SectionSuspense>
            <MovieNew
              title="Top 10 TV Series"
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
              title="Top 10 Movies"
              movieData={MEDIA_DATA?.TRENDING_MOVIES}
            />
          </SectionSuspense>
          <SectionSuspense>
            <MediaList
              movieData={MEDIA_DATA?.DISNEY_MOVIES}
              title="I miss the Disney of the old days"
            />
          </SectionSuspense>
          <SectionSuspense>
            <MediaList
              movieData={MEDIA_DATA?.CHINESE_MOVIES}
              title="Chinese Cinema Right Here"
            />
          </SectionSuspense>
        </div>
      </div>

      <BackToTopButton></BackToTopButton>
    </div>
  );
}

export default Home;

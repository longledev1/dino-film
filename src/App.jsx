// Component
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";
import InfiniteSlider from "./components/InfiniteSlider";
import MediaList from "./components/MediaList";
import MoodSection from "./components/MoodSection";
import MediaSection from "./components/MediaSection";
import MovieNew from "./components/MovieNew";
import MediaSlider from "./components/MediaSlider";
import Footer from "./components/Footer";
// Constant
import { TABS_TRENDING, TABS_TOP_RATED, MEDIA_DATA } from "./constant";
import "./App.css";
import BackToTopButton from "./components/BackToTopButton";
function App() {
  return (
    <div className="bg-[#181b24]">
      {/* HEADER */}
      <Header />
      {/* BANNER FEATURE */}
      <FeatureMovie />
      {/* MAIN */}
      <div className="min-h-screen">
        <div className="container flex h-full flex-col gap-y-12">
          <MoodSection />
          <MediaList
            movieData={MEDIA_DATA?.NOW_PLAYING_MOVIES}
            title="Just Released"
          />
          <MediaSection title={"Hot Right Now"} tabs={TABS_TRENDING} />
          <MediaSection title={"The Best of the Best"} tabs={TABS_TOP_RATED} />
          <MediaList
            movieData={MEDIA_DATA?.POPULAR_MOVIES}
            title="Just Released"
          />

          <MovieNew
            title="Top 10 TV Series"
            movieData={MEDIA_DATA?.TRENDING_TV}
          />
          <MediaSlider
            title="Latest Anime Collection"
            movieData={MEDIA_DATA.ANIME_MOVIES}
          />

          <MovieNew
            title="Top 10 Movies"
            movieData={MEDIA_DATA?.TRENDING_MOVIES}
          />
          <MediaList
            movieData={MEDIA_DATA?.DISNEY_MOVIES}
            title="I miss the Disney of the old days"
          />
          <MediaList
            movieData={MEDIA_DATA?.CHINESE_MOVIES}
            title="Chinese Cinema Right Here"
          />
        </div>
      </div>
      {/* FOOTER */}
      <Footer />
      <BackToTopButton></BackToTopButton>
    </div>
  );
}

export default App;

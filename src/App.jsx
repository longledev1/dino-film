// Component
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";
import InfiniteSlider from "./components/InfiniteSlider";
import MediaList from "./components/MediaList";
import MoodSection from "./components/MoodSection";
import MediaSection from "./components/MediaSection";
import MovieNew from "./components/MovieNew";
import MediaSlider from "./components/MediaSlider";
// Constant
import { TABS_TRENDING, TABS_TOP_RATED, MEDIA_DATA } from "./constant";
import "./App.css";
function App() {
  return (
    <div>
      <Header />
      <FeatureMovie />
      <div className="h-full bg-[#181b24]">
        <div className="container flex h-full flex-col gap-y-12">
          <MoodSection />
          <MediaList
            movieData={MEDIA_DATA?.nowPlayingMovies}
            title="Just Released"
          />
          <MediaSection title={"Hot Right Now"} tabs={TABS_TRENDING} />
          <MediaSection title={"The Best of the Best"} tabs={TABS_TOP_RATED} />
          <MediaList
            movieData={MEDIA_DATA?.popularMovies}
            title="Just Released"
          />

          <MovieNew title="Top 10 TV Show" movieData={MEDIA_DATA?.trendingTV} />
          <MediaList
            movieData={MEDIA_DATA?.chineseMovies}
            title="Chinese Cinema Right Here"
          />
          <MovieNew
            title="Top 10 Movies"
            movieData={MEDIA_DATA?.trendingMovies}
          />
          <MediaList
            movieData={MEDIA_DATA?.disneyMovies}
            title="I miss the Disney of the old days"
          />
          <MediaSlider title="Latest Anime Collection" />
        </div>
      </div>
    </div>
  );
}

export default App;

// Component
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";
import InfiniteSlider from "./components/InfiniteSlider";
import MediaList from "./components/MediaList";
import MoodSection from "./components/MoodSection";
import MediaSection from "./components/MediaSection";
import { TABS_TRENDING, TABS_TOP_RATED } from "./constant";
import "./App.css";
function App() {
  return (
    <div>
      <Header></Header>
      <FeatureMovie></FeatureMovie>
      <div className="h-full bg-[#181b24]">
        <div className="container flex h-full flex-col gap-y-12">
          <MoodSection></MoodSection>
          <MediaList title="Just Released"></MediaList>
          <MediaSection
            title={"Hot Right Now"}
            tabs={TABS_TRENDING}
          ></MediaSection>
          <MediaSection
            title={"The Best of the Best"}
            tabs={TABS_TOP_RATED}
          ></MediaSection>
        </div>
      </div>
    </div>
  );
}

export default App;

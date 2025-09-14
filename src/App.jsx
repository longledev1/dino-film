// Component
import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";
import InfiniteSlider from "./components/InfiniteSlider";
import MediaList from "./components/MediaList";
import MoodSection from "./components/MoodSection";
import TrendingSection from "./components/TrendingSection";
import "./App.css";
function App() {
  return (
    <div>
      <Header></Header>
      <FeatureMovie></FeatureMovie>
      <div className="h-full bg-[#181b24]">
        <div className="container flex h-full flex-col gap-y-12">
          <MoodSection></MoodSection>
          <MediaList></MediaList>
          <TrendingSection></TrendingSection>
        </div>
      </div>
    </div>
  );
}

export default App;

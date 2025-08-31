import FeatureMovie from "./components/FeatureMovie";
import Header from "./components/Header";

function App() {
  const BRANDS = ["hbo_logo.png", "nation.png", "netflix_logo.png"];
  return (
    <div>
      <Header></Header>
      <FeatureMovie></FeatureMovie>
    </div>
  );
}

export default App;

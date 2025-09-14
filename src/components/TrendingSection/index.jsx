import Title from "../Title/Title";
import { TABS } from "../../constant";
import { useState } from "react";
const TrendingSection = () => {
  const [activeTabID, setActiveTabID] = useState("all");

  console.log(activeTabID);
  return (
    <div className="mb-4">
      <div className="flex items-center gap-x-2">
        <Title className="bg-gradient-to-tr from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
          Trending
        </Title>

        {/* Tabs */}
        <ul className="flex gap-4 rounded border-1 border-slate-500 text-[16px] text-white outline-none">
          {TABS.map((tab) => (
            <li
              onClick={() => setActiveTabID(tab.id)}
              key={tab.id}
              className={`cursor-pointer rounded px-4 py-2 text-white ${tab.id === activeTabID ? "bg-slate-800" : ""}`}
            >
              {tab.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TrendingSection;

// Component
import SectionHeader from "../SectionHeader";
import MoodCard from "./MoodCard";
// Constant
import { TOPIC } from "@constants";
// React-router-dom
import { Link } from "react-router-dom";

const MoodSection = () => {
  return (
    <div>
      <SectionHeader title="Pick Your Mood" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-7">
        {TOPIC.map((topic) => (
          <Link key={topic.id} to={`/explore/${topic.id}`} className="block">
            <MoodCard data={topic} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoodSection;

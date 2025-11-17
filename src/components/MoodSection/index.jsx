// Component
import Title from "../Title";
import MoodCard from "./MoodCard";
// Constant
import { TOPIC } from "@constants";
// React-router-dom
import { Link } from "react-router-dom";
const MoodSection = () => {
  return (
    <div className="">
      <Title className="text-white">Pick Your Mood</Title>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-[12px] sm:grid-cols-4 lg:grid-cols-6">
        {TOPIC.map((topic) => (
          <Link to={`/explore/${topic.id}`}>
            <MoodCard key={topic.id} data={topic}></MoodCard>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoodSection;

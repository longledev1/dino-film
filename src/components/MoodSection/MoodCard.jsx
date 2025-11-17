import { Link } from "react-router-dom";
const MoodCard = ({ data }) => {
  return (
    <div
      className="card cursor-pointer transition-transform duration-200 ease-in-out hover:-translate-y-2"
      style={{ backgroundColor: data.color }}
    >
      <div className="mask"></div>
      <h3 className="text-[20px] font-bold">{data.label}</h3>
      <span className="mt-8 text-[16px]">See details {">"}</span>
    </div>
  );
};

export default MoodCard;

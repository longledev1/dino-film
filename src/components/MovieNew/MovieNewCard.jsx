import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "@constants";
import "./MovieNewCard.css";
const MovieNewCard = ({ id, poster, title, date, index }) => {
  const skewClass = index % 2 === 0 ? "skew-y-3" : "-skew-y-3";

  return (
    <Link to={`/movie/${id}`}>
      <div className="shadow-4xl group">
        <div
          className={`relative transform cursor-pointer overflow-hidden rounded-md shadow-2xl ${skewClass}`}
        >
          <img
            src={`${IMAGE_BASE_URL}/w500${poster}`}
            alt={title}
            className="h-96 w-64 rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Overlay vàng */}
          <div className="absolute inset-0 rounded-md bg-yellow-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>

          {/* Border vàng */}
          <div className="pointer-events-none absolute inset-0 rounded-md border-4 border-transparent transition-colors duration-300 group-hover:border-yellow-400"></div>
        </div>

        <div className="mt-4 flex items-center gap-x-6 text-white">
          <div className="bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-500 bg-clip-text text-[60px] font-bold text-transparent">
            {index < 9 ? `0${index + 1}` : index + 1}
          </div>
          <div className="w-full">
            <p className="text-left text-[14px] font-bold">{title}</p>
            <div className="flex items-center justify-between">
              <p className="mt-2 text-gray-500">{date}</p>
              <p className="rounded border-1 border-slate-500 p-[2px] text-[12px] text-white">
                HD
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieNewCard;

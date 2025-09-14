// Component
import CircularProgress from "./CircularProgress";
import { imageTMDB } from "../../constant";
const MovieCard = (props) => {
  const { movie } = props;

  return (
    <div className="rounded-md bg-gray-800 text-white">
      <img
        className="cursor-pointer rounded-md rounded-br-none rounded-bl-none object-cover hover:opacity-50"
        src={`${imageTMDB}/w500/${movie?.poster_path}`}
        alt="Movie"
      />

      {/* Nội dung */}
      <div className="left-[5 px] relative top-[-1.2vw]">
        <CircularProgress></CircularProgress>
      </div>
      <div className="mt-[-20px] px-1">
        <div className="group relative text-[14px]">
          <p className="hover:text-button mt-4 truncate font-bold hover:cursor-pointer lg:mt-2">
            {movie?.title.length > 20
              ? movie?.title.slice(0, 20) + "..."
              : movie?.title}
          </p>

          <div className="pointer-events-none absolute bottom-[1vw] z-10 transform rounded bg-black px-2 py-1 whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
            {movie?.title}
          </div>
        </div>

        <div className="mt-1 mb-2 flex items-center justify-between lg:mt-2">
          <p className="text-[14px] text-slate-300">{movie?.release_date}</p>
          <p className="rounded border-1 border-slate-500 p-[2px] text-[12px] text-white">
            HD
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

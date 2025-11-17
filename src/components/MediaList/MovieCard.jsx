// Component
import CircularProgress from "./CircularProgress";
// Constant
import { IMAGE_BASE_URL } from "@constants";
// Link
import { Link } from "react-router-dom";
import ImageComponent from "@components/ImageComponent";
const MovieCard = ({
  id,
  title,
  date,
  point,
  poster,
  type,
  className,
  onDesktop,
  isMediaSection,
}) => {
  return (
    <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`}>
      <div className="rounded-md bg-gray-800 text-white">
        {type === "tv" ? (
          <p className="bg-button absolute top-1 left-1 rounded-md p-1 text-white">
            TV Show
          </p>
        ) : (
          ""
        )}
        <ImageComponent
          width={170}
          height={255}
          title={"Movie"}
          src={poster && `${IMAGE_BASE_URL}/original/${poster}`}
          className={`${isMediaSection ? `!h-[404px] w-full cursor-pointer rounded-md rounded-br-none rounded-bl-none object-cover hover:opacity-50` : `h-full hover:opacity-50`}`}
        />

        <div className="left-[5 px] relative top-[-4vw] lg:top-[-1.2vw]">
          <CircularProgress
            strokeColor={point >= 7 ? "green" : point >= 5 ? "orange" : "red"}
            percent={Math.round(point * 10)}
          ></CircularProgress>
        </div>
        <div
          className={`mt-[-20px] ${className ? className : "p-1"} text-[14px] sm:text-base`}
        >
          <div className="group relative text-[14px]">
            <p
              className={`hover:text-button mt-4 truncate text-left font-bold hover:cursor-pointer lg:mt-2 ${onDesktop ? "w-50" : ""}`}
            >
              {!onDesktop ? title.slice(0, 20) : title}
            </p>

            <div className="pointer-events-none absolute bottom-[1vw] z-10 transform rounded bg-black px-2 py-1 text-left whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
              {title}
            </div>
          </div>

          <div className="mt-1 mb-2 flex items-center justify-between lg:mt-2">
            <p className="text-[14px] text-slate-300">{date}</p>
            <p
              className={`rounded border-1 border-slate-500 p-[2px] text-white ${onDesktop ? "text-[14px]" : "text-[12px]"}`}
            >
              HD
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

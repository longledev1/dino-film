// Component
import CircularProgress from "./CircularProgress";
// Constant
import { IMAGE_BASE_URL } from "@constants";
// Link
import { Link } from "react-router-dom";
import ImageComponent from "@components/ImageComponent";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import useWatchlist from "@/hooks/useWatchlist";

const MovieCard = ({
  id,
  title,
  date,
  point,
  poster,
  type,
  className,
  isMediaSection,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(id);

  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWatchlist({
      id,
      title,
      poster,
      date,
      point,
      type: type || "movie",
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl bg-gray-800/80 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-black/60">
      <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`} className="block">
        {/* Poster Wrapper - không có overflow-hidden ở đây để rating badge không bị cắt */}
        <div className="relative">
          {/* Badge TV Show */}
          {type === "tv" && (
            <span className="absolute top-2 left-2 z-10 rounded-md bg-primary/90 px-2 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
              TV Show
            </span>
          )}

          {/* Quick Bookmark Button */}
          <button
            onClick={handleBookmarkClick}
            aria-label="Bookmark movie"
            title={isSaved ? "Remove from Watchlist" : "Add to Watchlist"}
            className={`absolute top-2 right-2 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 ${
              isSaved
                ? "bg-secondary text-black shadow-md shadow-secondary/40"
                : "bg-black/50 text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-black"
            }`}
          >
            {isSaved ? (
              <FaBookmark className="text-xs" />
            ) : (
              <FaRegBookmark className="text-xs" />
            )}
          </button>

          {/* Khung ảnh có overflow-hidden riêng để bo góc trên và hiệu ứng hover scale */}
          <div
            className={`w-full overflow-hidden rounded-t-xl bg-gray-900 ${
              isMediaSection ? "h-[380px]" : "aspect-[2/3]"
            }`}
          >
            <ImageComponent
              title={title}
              src={poster ? `${IMAGE_BASE_URL}/original/${poster}` : null}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          {/* Rating Circle: nhô 50% ra khỏi đáy poster, không bị cắt và có nền đĩa tròn nổi bật */}
          <div className="absolute bottom-0 left-3 translate-y-1/2 z-20">
            <CircularProgress
              strokeColor={
                point >= 7 ? "var(--color-primary)" : point >= 5 ? "var(--color-secondary)" : "#ef4444"
              }
              percent={Math.round((point || 0) * 10)}
            />
          </div>
        </div>

        {/* Content info: pt-7 để chừa khoảng trống cho huy hiệu rating nhô xuống */}
        <div className={`pt-7 pb-3 px-3 text-white ${className || ""}`}>
          <h3
            title={title}
            className="line-clamp-1 text-sm font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-secondary sm:text-base"
          >
            {title}
          </h3>

          <div className="mt-1.5 flex items-center justify-between text-xs text-gray-400">
            <span>{date ? date.slice(0, 4) : "N/A"}</span>
            <span className="rounded border border-gray-600 px-1.5 py-0.5 text-[10px] font-semibold text-gray-300">
              HD
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

// base image url
import { IMAGE_BASE_URL } from "@constants";
// Icons
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
// Link
import { Link } from "react-router-dom";
import ImageComponent from "@/components/ImageComponent";
import useWatchlist from "@/hooks/useWatchlist";

const MediaPreviewCard = ({
  id,
  background,
  title,
  date,
  overview = "",
  genres = [],
  categoryMovie = [],
  point,
}) => {
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const isSaved = isInWatchlist(id);

  const getCategoryMovie = (genres || [])
    .map((genreId) => {
      const category = (categoryMovie || []).find((c) => c.id === genreId);
      return category ? category.name : null;
    })
    .filter(Boolean);

  const handleToggleWatchlist = () => {
    toggleWatchlist({
      id,
      title,
      background,
      poster: background,
      date,
      point,
      type: "movie",
    });
  };

  return (
    <div className="relative w-full">
      {/* Nền đục 100% #181b24 để triệt tiêu hoàn toàn bóng mờ từ slide khác */}
      <div className="relative flex min-h-[460px] w-full flex-col-reverse overflow-hidden rounded-2xl bg-[#181b24] shadow-2xl border border-white/10 lg:flex-row">
        {/* Nội dung bên trái */}
        <div className="relative z-10 flex h-full w-full flex-col justify-center bg-[#181b24] p-6 text-left text-white sm:p-8 lg:w-1/2">
          <Link to={`/movie/${id}`}>
            <h2 className="mb-2 text-2xl font-bold transition-colors hover:text-secondary sm:text-3xl lg:text-4xl drop-shadow">
              {title}
            </h2>
          </Link>

          <p className="mb-3 text-sm text-gray-400 font-medium">
            {date ? date.slice(0, 4) : ""}
          </p>

          <div className="mb-3 flex items-center gap-x-3">
            <span className="rounded-md border border-secondary/80 bg-secondary/10 px-2.5 py-1 text-xs font-bold text-secondary">
              IMDb: {point ? point.toFixed(1) : "N/A"}
            </span>
            <span className="rounded-md border border-white/20 bg-white/5 px-2 py-1 text-xs font-semibold text-white">
              HD
            </span>
          </div>

          {getCategoryMovie.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {getCategoryMovie.slice(0, 4).map((name, index) => (
                <span
                  className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-light text-gray-300 border border-white/5"
                  key={index}
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          <p className="mb-1 text-base font-bold text-secondary">Overview</p>
          <p className="mb-6 line-clamp-3 text-sm text-gray-300 leading-relaxed">
            {overview
              ? overview.length > 200
                ? `${overview.slice(0, 200)}...`
                : overview
              : "No overview available."}
          </p>

          <div className="flex items-center gap-3">
            <Link to={`/movie/${id}`} className="flex-1">
              <button className="w-full cursor-pointer rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-md shadow-primary/40 transition-all hover:bg-primary-hover hover:scale-[1.02] active:scale-95">
                View Details
              </button>
            </Link>

            <button
              onClick={handleToggleWatchlist}
              className={`flex cursor-pointer items-center justify-center gap-x-2 rounded-xl px-5 py-3 text-sm font-semibold backdrop-blur-md transition-all duration-200 hover:scale-[1.02] active:scale-95 border ${
                isSaved
                  ? "bg-secondary text-black border-secondary shadow-md shadow-secondary/30"
                  : "bg-white/10 text-white border-white/20 hover:bg-white hover:text-black"
              }`}
            >
              {isSaved ? (
                <FaBookmark className="text-base text-black" />
              ) : (
                <FaRegBookmark className="text-base" />
              )}
              <span>{isSaved ? "Saved" : "Watchlist"}</span>
            </button>
          </div>
        </div>

        {/* Ảnh backdrop bên phải */}
        <div className="relative h-[260px] w-full sm:h-[320px] lg:h-auto lg:w-1/2 bg-[#181b24]">
          <ImageComponent
            src={background ? `${IMAGE_BASE_URL}/original${background}` : null}
            className="h-full w-full object-cover"
            alt={title}
            width={700}
            height={460}
          />
          {/* Layer gradient để blend với nền trái đục */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181b24] via-transparent to-transparent lg:bg-gradient-to-l lg:from-transparent lg:to-[#181b24]" />
        </div>
      </div>
    </div>
  );
};

export default MediaPreviewCard;

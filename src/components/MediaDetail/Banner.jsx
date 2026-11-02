import { IMAGE_BASE_URL } from "@constants";
// Icon
import { FaPlay, FaBookmark, FaRegBookmark } from "react-icons/fa";
// Component
import CircularProgress from "../MediaList/CircularProgress";
// Constant
import { formatRuntime } from "@/constant/ultil";
import ImageComponent from "@components/ImageComponent";
import { useModalContext } from "@/context/ModalProvider";
import TrailerVideo from "../TrailerVideo";
import useWatchlist from "@/hooks/useWatchlist";

const Banner = ({
  mediaInfo,
  title,
  background,
  poster,
  overview,
  point,
  groupCrews = {},
  certification,
  runtime,
  date,
  genres = [],
  name,
  contentRating,
  trailerKey,
  type = "movie",
}) => {
  const { setContent, setIsModalShowing } = useModalContext();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();

  const seasonName = name ? `(${name})` : "";
  const mediaId = mediaInfo?.id;
  const isSaved = mediaId ? isInWatchlist(mediaId) : false;

  const handleOpenTrailer = () => {
    setIsModalShowing(true);
    setContent(<TrailerVideo key={trailerKey} trailerKey={trailerKey} />);
  };

  const handleToggleWatchlist = () => {
    if (!mediaId) return;
    toggleWatchlist({
      id: mediaId,
      title: title || name,
      poster,
      background,
      date,
      point,
      type: type || "movie",
    });
  };

  return (
    <div className="relative w-full overflow-hidden pb-8">
      {/* Background Backdrop with cinematic overlay */}
      <div
        className="relative h-[380px] w-full bg-cover bg-center lg:h-[550px]"
        style={{
          backgroundImage: `url(${
            background
              ? `${IMAGE_BASE_URL}/original/${background}`
              : "/images/comming_soon.png"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#181b24] via-[#181b24]/75 to-black/50" />
      </div>

      {/* Main Content Info */}
      <div className="relative -mt-[260px] text-white">
        <div className="container">
          <div className="flex flex-col items-center gap-x-10 gap-y-6 lg:flex-row lg:items-start">
            {/* Poster Card */}
            <div className="shrink-0 overflow-hidden rounded-2xl shadow-2xl border border-white/10">
              <ImageComponent
                src={poster ? `${IMAGE_BASE_URL}/original/${poster}` : null}
                alt={title || "Movie poster"}
                className="h-[320px] w-[220px] object-cover transition-transform duration-300 hover:scale-105 sm:h-[380px] sm:w-[260px]"
                width={260}
                height={380}
              />
            </div>

            {/* Details Column */}
            <div className="flex flex-1 flex-col items-center gap-y-4 text-center lg:items-start lg:text-left">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white drop-shadow">
                {title} {seasonName}
              </h1>

              {/* Meta tags (Certification, Date, Runtime, Genres) */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm text-gray-300 lg:justify-start">
                {(certification || contentRating) && (
                  <span className="rounded border border-gray-400/80 px-2 py-0.5 font-bold text-white">
                    {certification || contentRating}
                  </span>
                )}
                {date && <span>{date}</span>}
                {runtime && <span>• {formatRuntime(runtime)}</span>}
                {genres && genres.length > 0 && (
                  <span>
                    • {genres.map((g) => g.name).filter(Boolean).join(", ")}
                  </span>
                )}
              </div>

              {/* Rating & Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 py-2 lg:justify-start">
                <div className="flex items-center gap-2">
                  <CircularProgress
                    percent={Math.round((point || 0) * 10)}
                    strokeColor={
                      point >= 7 ? "var(--color-primary)" : point >= 5 ? "var(--color-secondary)" : "#ef4444"
                    }
                  />
                  <span className="font-bold text-sm">Rating</span>
                </div>

                <button
                  className="flex cursor-pointer items-center justify-center gap-x-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/40 transition-all duration-200 hover:bg-primary-hover hover:scale-105 active:scale-95"
                  onClick={handleOpenTrailer}
                >
                  <FaPlay className="text-sm" />
                  <span>Watch Trailer</span>
                </button>

                {mediaId && (
                  <button
                    onClick={handleToggleWatchlist}
                    className={`flex cursor-pointer items-center justify-center gap-x-2 rounded-xl px-5 py-3 font-semibold backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 border ${
                      isSaved
                        ? "bg-secondary text-black border-secondary shadow-lg shadow-secondary/30"
                        : "bg-white/10 text-white border-white/20 hover:bg-white hover:text-black"
                    }`}
                  >
                    {isSaved ? (
                      <FaBookmark className="text-base text-black" />
                    ) : (
                      <FaRegBookmark className="text-base" />
                    )}
                    <span>{isSaved ? "Saved" : "Add to Watchlist"}</span>
                  </button>
                )}
              </div>

              {/* Overview */}
              <div className="mt-2 max-w-3xl">
                <h3 className="mb-2 text-lg font-bold text-secondary">
                  Overview
                </h3>
                <p className="text-sm sm:text-base leading-relaxed text-gray-200 text-justify lg:text-left">
                  {overview || "No overview available for this title."}
                </p>
              </div>

              {/* Crew List */}
              {groupCrews && Object.keys(groupCrews).length > 0 && (
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left w-full max-w-xl">
                  {Object.keys(groupCrews)
                    .sort((a) => (a === "Director" ? -1 : 1))
                    .map((job) => (
                      <div key={job}>
                        <p className="font-bold text-xs uppercase tracking-wider text-secondary">
                          {job}
                        </p>
                        <p className="text-sm text-gray-300">
                          {groupCrews[job].map((c) => c.name).join(", ")}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

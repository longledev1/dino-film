import { IMAGE_BASE_URL } from "@constants";
import ImageComponent from "@components/ImageComponent";

const ImageIndicator = ({ movies = [], index, onPreviewClick }) => {
  return (
    <div className="flex items-center gap-2.5 overflow-x-auto p-2 scrollbar-none max-w-full">
      {movies.map((movie, i) => {
        const isActive = i === index;
        const posterUrl = movie.poster_path
          ? `${IMAGE_BASE_URL}/w200/${movie.poster_path}`
          : movie.backdrop_path
            ? `${IMAGE_BASE_URL}/w300/${movie.backdrop_path}`
            : null;

        return (
          <button
            key={movie.id}
            type="button"
            onClick={() => onPreviewClick(i)}
            aria-label={`Select ${movie.title || movie.name}`}
            className={`relative h-[84px] w-[56px] shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 transition-all duration-300 focus:outline-none ${
              isActive
                ? "border-secondary scale-105 shadow-xl shadow-black ring-2 ring-secondary/50 opacity-100 z-10"
                : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/40"
            }`}
          >
            <ImageComponent
              src={posterUrl}
              alt={movie.title || movie.name || "Movie thumbnail"}
              className="h-full w-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
};

export default ImageIndicator;

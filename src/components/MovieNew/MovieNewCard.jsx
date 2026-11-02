import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "@constants";
import ImageComponent from "@components/ImageComponent";
import "./MovieNewCard.css";

const MovieNewCard = ({ type, id, poster, title, date, index }) => {
  const skewClass = index % 2 === 0 ? "skew-y-2" : "-skew-y-2";
  const posterUrl = poster
    ? `${IMAGE_BASE_URL}/original/${poster.replace(/^\//, "")}`
    : null;

  return (
    <Link to={type === "tv" ? `/tv/${id}` : `/movie/${id}`} className="block">
      <div className="group transition-all duration-300 hover:-translate-y-2.5">
        {/* Khung poster: giữ nguyên kích thước khi hover để viền không bị cắt ở lề trái, chỉ thẳng góc skew-y-0 */}
        <div
          className={`relative h-[320px] sm:h-[360px] w-full transform overflow-hidden rounded-xl shadow-xl transition-all duration-300 group-hover:skew-y-0 group-hover:shadow-2xl border-2 border-white/10 group-hover:border-secondary ${skewClass}`}
        >
          {/* Ảnh poster bên trong zoom scale mượt mà */}
          <ImageComponent
            src={posterUrl}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Lớp overlay màu vàng cát nhẹ khi hover */}
          <div className="pointer-events-none absolute inset-0 bg-secondary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>

        {/* Thông tin số thứ tự & Tiêu đề */}
        <div className="mt-4 flex items-center gap-x-4 text-white">
          <div className="bg-gradient-to-b from-secondary/60 via-secondary to-secondary-hover bg-clip-text text-4xl sm:text-5xl font-black text-transparent select-none shrink-0">
            {index < 9 ? `0${index + 1}` : index + 1}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4
              title={title}
              className="truncate text-left text-sm sm:text-base font-bold transition-colors group-hover:text-secondary"
            >
              {title}
            </h4>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
              <span>{date ? date.slice(0, 4) : "N/A"}</span>
              <span className="rounded border border-gray-600 px-1 py-0.2 text-[10px] font-semibold text-gray-300">
                HD
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieNewCard;

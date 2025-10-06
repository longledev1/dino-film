// base image url
import { IMAGE_BASE_URL } from "@constants";
// Icons
import { FaPlayCircle, FaRegBookmark } from "react-icons/fa";
// Link
import { Link } from "react-router-dom";
const MediaPreviewCard = (props) => {
  const {
    id,
    background,
    title,
    date,
    overview,
    genres,
    categoryMovie,
    point,
  } = props;
  const getCategoryMovie = genres?.map((id) => {
    const category = categoryMovie.find((c) => {
      return c.id === id;
    });
    return category ? category.name : null;
  });

  return (
    <div className="relative">
      <div className="relative flex h-[600px] w-full flex-col-reverse overflow-hidden rounded-[20px] bg-gray-800 lg:h-[460px] lg:flex-row">
        {/* Background màu bên trái */}
        <div className="w-ful relative z-10 mt-[-30px] flex h-full flex-col justify-center bg-gray-800 p-4 text-white lg:w-1/3 lg:p-8">
          <Link to={`/movie/${id}`}>
            <h2 className="mb-2 w-full cursor-pointer !text-[20px] font-bold hover:text-yellow-200 md:text-6xl lg:ml-0 lg:w-[800px] lg:!text-[25px]">
              {title}
            </h2>
          </Link>
          <p className="text-sub mb-2">{date}</p>
          <div className="mb-2 flex items-center gap-x-4">
            <button className="w-fit rounded-[4px] border-2 border-yellow-300 p-2 text-[12px] font-bold">
              <span className="font-bold text-yellow-300">IMDb:</span>{" "}
              {point ? point.toFixed(1) : "N/A"}
            </button>
            <p className="w-fit rounded border-2 border-white p-2 text-[12px] text-white">
              HD
            </p>
          </div>
          <div className="mb-4 flex items-center gap-x-2">
            {getCategoryMovie &&
              getCategoryMovie.map((name, index) => (
                <button
                  className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight"
                  key={index}
                >
                  {name}
                </button>
              ))}
          </div>
          <p className="mb-2 text-[25px] font-bold text-white">Overview</p>

          <div className="relative z-10 mb-6 w-full leading-normal lg:w-[600px]">
            <p className="text-[14px]">
              {overview.length > 200
                ? overview.slice(0, 200) + "..."
                : overview}
            </p>
          </div>
          <div className="flex space-x-4">
            <button className="bg-button flex w-full cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 text-[14px] font-semibold opacity-100 hover:opacity-100 lg:opacity-70">
              <FaPlayCircle className="text-xl"></FaPlayCircle>
              <span>Watch Trailer</span>
            </button>
            <button className="flex w-full cursor-pointer items-center gap-x-2 rounded-lg bg-slate-300/35 px-6 py-3 text-[14px] font-semibold hover:bg-white hover:text-black">
              <FaRegBookmark className="text-xl"></FaRegBookmark>
              <span>Add to Watchlist</span>
            </button>
          </div>
        </div>
        {/* Ảnh bên phải */}
        <div className="relative w-full lg:w-2/3">
          <img
            src={`${IMAGE_BASE_URL}/original${background}`}
            className="h-full !w-[100%] object-cover"
            alt="Fire Force"
          />

          {/* Layer gradient để blend với màu nền bên trái */}
          <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-l from-transparent to-gray-800" />
        </div>
      </div>
    </div>
  );
};

export default MediaPreviewCard;

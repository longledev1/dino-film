// React Icons
import { useModalContext } from "@/context/ModalProvider";
import { FaPlayCircle } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import TrailerVideo from "@components/TrailerVideo";
import { Link } from "react-router-dom";
const Movie = ({ data, categoryMovie, trailerKey }) => {
  const getCategoryMovie = data?.genre_ids.map((id) => {
    const category = categoryMovie.find((c) => c.id === id);
    return category ? category.name : null;
  });
  const { setContent, setIsModalShowing } = useModalContext();
  const handleOpenTrailer = () => {
    setIsModalShowing(true);
    setContent(<TrailerVideo key={trailerKey} trailerKey={trailerKey} />);
  };
  return (
    <>
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/original/${data?.backdrop_path}')`,
        }}
      >
        {/* Overlay cho tối ảnh lại */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Nội dung Hero */}
      <div className="relative z-10 container flex h-full flex-col items-start justify-end text-[14px] text-white sm:text-base">
        <div className="mb-10">
          <Link to={`/movie/${data?.id}`}>
            <h2 className="mb-2 w-full text-4xl font-bold hover:opacity-75 md:text-6xl lg:w-[800px]">
              {data?.title}
            </h2>
          </Link>

          <p className="text-sub mb-2">{data?.release_date}</p>
          <div className="mb-4 flex items-center gap-x-2">
            {getCategoryMovie &&
              getCategoryMovie.map((name) => {
                return (
                  <button
                    key={name}
                    className="w-fit rounded-md bg-slate-300/35 p-2 text-[14px] font-extralight"
                  >
                    {name}
                  </button>
                );
              })}
          </div>
          <p className="mb-2 text-2xl font-bold text-white">Overview</p>
          <p className="mb-6 max-w-xl">{data?.overview}</p>
          <div className="flex space-x-4">
            <button
              className="bg-button flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-semibold hover:brightness-75"
              onClick={handleOpenTrailer}
            >
              <FaPlayCircle className="text-xl"></FaPlayCircle>
              <span>Watch Trailer</span>
            </button>
            <button className="flex cursor-pointer items-center gap-x-2 rounded-lg bg-slate-300/35 px-6 py-3 font-semibold hover:bg-white hover:text-black">
              <FaRegBookmark className="text-xl"></FaRegBookmark>
              <span>Add to Watchlist</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Movie;

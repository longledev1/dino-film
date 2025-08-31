import { FaPlayCircle } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
const Movie = () => {
  return (
    <>
      {/* Background Poster */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://www.studioremarkable.com/wp-content/uploads/2015/12/Star-Wars-7-Poster.jpg')",
        }}
      >
        {/* Overlay cho tối ảnh lại */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Nội dung Hero */}
      <div className="relative z-10 flex h-full flex-col items-start justify-end px-10 text-white">
        <div className="mb-10">
          <h2 className="mb-2 text-4xl font-bold md:text-6xl">
            Star Wars: The Force Awakens
          </h2>
          <button className="mb-4 w-fit border border-gray-500 p-2 text-xl text-gray-500">
            PG13
          </button>
          <p className="text-sub mb-4">2h40m * 2022 * Fantasy * Action</p>
          <p className="mb-2 text-2xl font-bold text-white">Overview</p>
          <p className="mb-6 max-w-xl">
            A long time ago in a galaxy far, far away... The epic saga continues
            as heroes and villains clash in a battle that will shape the future
            of the galaxy.
          </p>
          <div className="flex space-x-4">
            <button className="bg-button flex cursor-pointer items-center gap-x-2 rounded-lg px-6 py-3 font-semibold hover:bg-green-700">
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

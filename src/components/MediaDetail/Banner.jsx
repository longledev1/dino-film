import { IMAGE_BASE_URL } from "@constants";
// Icon
import { FaPlay } from "react-icons/fa";
// Component
import CircularProgress from "../MediaList/CircularProgress";
// Constant
import { formatRuntime } from "@/constant/ultil";
import ImageComponent from "@components/ImageComponent";
import { useModalContext } from "@/context/ModalProvider";
import TrailerVideo from "../TrailerVideo";
const Banner = ({
  title,
  background,
  poster,
  overview,
  point,
  groupCrews,
  certification,
  runtime,
  date,
  genres,
  name,
  contentRating,
  trailerKey,
}) => {
  const { setContent, setIsModalShowing } = useModalContext();

  const seasonName = name ? `(${name})` : "";

  const handleOpenTrailer = () => {
    setIsModalShowing(true);
    setContent(<TrailerVideo key={trailerKey} trailerKey={trailerKey} />);
  };

  return (
    <>
      <div
        className="relative h-[400px] w-full bg-cover lg:h-[600px]"
        style={{
          backgroundImage: `url(${background ? `${IMAGE_BASE_URL}/original/${background}` : "/images/comming_soon.png"})`,
          filter: "brightness(20%)",
        }}
      ></div>
      <div
        className={`${runtime ? `relative -mt-[230px] text-white` : `relative -mt-[200px] text-white`}`}
      >
        <div className="container">
          <div className="l flex flex-col items-center gap-x-12 text-[14px] sm:text-base lg:flex-row lg:items-start">
            <ImageComponent
              src={poster && `${IMAGE_BASE_URL}/original/${poster}`}
              alt=""
              className="rounded-md object-cover transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer"
              width={200}
              height={300}
            />
            <div className="flex flex-col items-center gap-y-4 lg:items-start">
              <h2 className="mt-4 text-center text-xl font-bold lg:mt-0 lg:text-2xl">
                {title} {seasonName}
              </h2>
              {runtime && <p>{formatRuntime(runtime)}</p>}
              <div className="flex items-center gap-x-4">
                <div className="flex h-10 w-fit items-center justify-center border-1 border-gray-200 p-1 font-bold">
                  {certification || contentRating}
                </div>
                <p>{date}</p>
                <p>{genres?.map((genre) => genre.name).join(",  ")}</p>
              </div>
              <div className="flex items-center gap-x-4">
                {(
                  <CircularProgress
                    percent={Math.round(point * 10 || 0 * 10)}
                  ></CircularProgress>
                ) || "Not found point"}
                <p className="font-bold">Rating</p>
                <button
                  className="flex w-[180px] cursor-pointer items-center justify-center gap-x-2 rounded-md border-2 border-white p-3 font-bold transition duration-300 hover:bg-white hover:text-black"
                  onClick={handleOpenTrailer}
                >
                  <FaPlay></FaPlay>
                  Trailer
                </button>
              </div>
              <div className="mt-4">
                <div className="mb-4">
                  <p className="text-[20px] font-bold text-yellow-200">
                    Overview
                  </p>
                  <p className="text-[14px] leading-6 sm:text-justify sm:text-base">
                    {overview}
                  </p>
                </div>
                <div className="grid grid-cols-2">
                  {Object.keys(groupCrews)
                    .sort((a, b) => {
                      if (a === "Director") return -1;
                      if (b === "Director") return 1;
                      return 0;
                    })
                    .map((job) => (
                      <div key={job}>
                        <p className="font-bold">{job}</p>
                        <p>
                          {groupCrews[job].map((crew) => crew.name).join(", ")}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;

import { groupBy } from "lodash";
import { IMAGE_BASE_URL } from "@constants";
// Icon
import { FaPlay } from "react-icons/fa";
// Component
import CircularProgress from "../MediaList/CircularProgress";
// Constant
import { formatRuntime } from "@/constant/ultil";
const Banner = ({ mediaInfo }) => {
  console.log("🚀 ~ Banner ~ mediaInfo:", mediaInfo);
  const certification = (
    (mediaInfo?.release_dates?.results || []).find(
      (results) => results?.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (mediaInfo?.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew?.job))
    .map((crew) => ({
      id: crew.id,
      name: crew.name,
      job: crew.job,
    }));

  const groupCrews = groupBy(crews, "job");
  return (
    <>
      <div
        className="relative h-[400px] w-full bg-cover lg:h-[600px]"
        style={{
          backgroundImage: `url(${mediaInfo?.backdrop_path ? `${IMAGE_BASE_URL}/original/${mediaInfo?.backdrop_path}` : "/images/comming_soon.png"})`,
          filter: "brightness(20%)",
        }}
      ></div>
      <div className="relative -mt-[230px] text-white">
        <div className="container">
          <div className="l flex flex-col items-center gap-x-12 lg:flex-row lg:items-start">
            <img
              src={`${IMAGE_BASE_URL}/original/${mediaInfo?.poster_path}`}
              alt=""
              className="w-[200px] rounded-md object-cover transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer"
            />
            <div className="flex flex-col items-center gap-y-4 lg:items-start">
              <h2 className="mt-4 text-xl font-bold lg:mt-0 lg:text-2xl">
                {mediaInfo?.title || mediaInfo?.name}
              </h2>
              <p>{formatRuntime(mediaInfo?.runtime)}</p>
              <div className="flex items-center gap-x-4">
                <div className="flex h-10 w-fit items-center justify-center border-1 border-gray-200 p-1 text-[16px] font-bold">
                  {certification || "G"}
                </div>
                <p>{mediaInfo?.release_date}</p>
                <p>
                  {mediaInfo?.genres.map((genre) => genre.name).join(",  ")}
                </p>
              </div>
              <div className="flex items-center gap-x-4">
                {(
                  <CircularProgress
                    percent={Math.round(mediaInfo?.vote_average * 10 || 0 * 10)}
                  ></CircularProgress>
                ) || "Not found point"}
                <p className="font-bold">Rating</p>
                <button className="flex w-[180px] cursor-pointer items-center justify-center gap-x-2 rounded-md border-2 border-white p-3 font-bold transition duration-300 hover:bg-white hover:text-black">
                  <FaPlay></FaPlay>
                  Trailer
                </button>
              </div>
              <div className="mt-4">
                <div className="mb-4">
                  <p className="text-[20px] font-bold text-yellow-200">
                    Overview
                  </p>
                  <p className="text-justify leading-6">
                    {mediaInfo?.overview}
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

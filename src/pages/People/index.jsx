import React, { useEffect } from "react";
// USE SWR
import useSWR from "swr";
// Constant
import { DETAILS_DATA, IMAGE_BASE_URL } from "@/constant";
import { movieFetcher } from "@/services/fetcher";
// Router
import { useParams } from "react-router-dom";
import PeopleCastCard from "@/components/People/PeopleCastCard";
import Loading from "@/components/Loading";
const PeopleDetail = () => {
  const { id } = useParams();
  const PEOPLE_DETAIL_ENDPOINT = DETAILS_DATA?.PERSON(id);

  const GENDERS_MAP = {
    0: "Not set / not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  const { data, isLoading: isDataLoading } = useSWR(
    id ? [PEOPLE_DETAIL_ENDPOINT] : null,
    movieFetcher,
  );

  const peopleCastMovies = data?.combined_credits?.cast
    .filter((data) => data.vote_average !== 0)
    .map((movie) => {
      return movie;
    });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isDataLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="relative min-h-screen pt-[108px] text-white">
      <div className="px-[20px] py-[25px]">
        <div className="flex gap-x-4">
          <div className="h-full w-full flex-[1] rounded bg-gray-800 p-2 shadow-md shadow-gray-700 sm:flex-[0.5]">
            <img
              src={`${IMAGE_BASE_URL}/original/${data?.profile_path}`}
              alt=""
              className="mb-6 h-full w-full rounded object-cover"
            />
            <div className="flex flex-col gap-4">
              <p className="text-base font-bold sm:text-xl">Personal Info</p>
              <div className="flex flex-col gap-y-2">
                <p className="text-base font-bold text-amber-200 sm:text-xl">
                  Know for
                </p>
                <p className="text-[14px] sm:text-base">
                  {data?.known_for_department || "Updating..."}
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-base font-bold text-amber-200 sm:text-xl">
                  Gender
                </p>
                <p className="text-[14px] sm:text-base">
                  {GENDERS_MAP[data?.gender] || "Updating..."}
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-base font-bold text-amber-200 sm:text-xl">
                  Place of Birth
                </p>
                <p className="text-[14px] sm:text-base">
                  {data?.place_of_birth || "Updating..."}
                </p>
              </div>
              <div className="flex flex-col gap-y-2">
                <p className="text-base font-bold text-amber-200 sm:text-xl">
                  Birthday
                </p>
                <p className="text-[14px] sm:text-base">
                  {data?.birthday || "Updating..."}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-[2] flex-col gap-4 text-[14px] sm:text-base">
            <p className="text-2xl font-bold text-amber-200">
              {data?.name || "Upating..."}
            </p>
            <p className="text-xl font-bold">Biography</p>
            <p className="line-clamp-[auto]] leading-relaxed whitespace-pre-line">
              {data?.biography || "Updating..."}
            </p>

            <div>
              <p className="text-xl font-bold text-amber-200 sm:text-2xl">
                Known For{" "}
              </p>
              <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
                {peopleCastMovies &&
                  peopleCastMovies.map((movie, index) => (
                    <PeopleCastCard
                      key={`${movie.id}-${index}`}
                      id={movie.id}
                      title={movie.title || movie.name}
                      date={movie.release_date || movie.first_air_date}
                      point={movie.vote_average}
                      poster={movie.poster_path}
                      type={movie.media_type}
                    ></PeopleCastCard>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetail;

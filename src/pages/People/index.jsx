import React from "react";
// USE SWR
import useSWR from "swr";
// Constant
import { DETAILS_DATA, IMAGE_BASE_URL } from "@/constant";
import { movieFetcher } from "@/services/fetcher";
// Router
import { useParams, Link } from "react-router-dom";
import MovieCard from "@/components/MediaList/MovieCard";
import ImageComponent from "@/components/ImageComponent";
import Loading from "@/components/Loading";
import { FaArrowLeft } from "react-icons/fa6";

const PeopleDetail = () => {
  const { id } = useParams();
  const PEOPLE_DETAIL_ENDPOINT = DETAILS_DATA?.PERSON(id);

  const GENDERS_MAP = {
    0: "Not specified",
    1: "Female",
    2: "Male",
    3: "Non-binary",
  };

  const { data, isLoading: isDataLoading } = useSWR(
    id ? [PEOPLE_DETAIL_ENDPOINT] : null,
    movieFetcher,
  );

  const peopleCastMovies = (data?.combined_credits?.cast || [])
    .filter((movie) => movie.vote_average !== 0)
    .sort((a, b) => (b.vote_count || 0) - (a.vote_count || 0));

  if (isDataLoading) {
    return <Loading />;
  }

  return (
    <div className="relative min-h-screen pt-[110px] pb-16 text-white">
      <div className="container">
        {/* Back Link */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column: Profile Card */}
          <div className="w-full md:w-[300px] shrink-0 rounded-2xl bg-gray-800/80 p-5 shadow-2xl border border-white/10 backdrop-blur-sm self-start">
            <div className="overflow-hidden rounded-xl mb-6 shadow-lg">
              <ImageComponent
                src={
                  data?.profile_path
                    ? `${IMAGE_BASE_URL}/original/${data.profile_path}`
                    : null
                }
                alt={data?.name || "Actor profile"}
                className="h-[380px] w-full object-cover"
                width={300}
                height={380}
              />
            </div>

            <div className="flex flex-col gap-4 text-sm">
              <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2">
                Personal Info
              </h2>

              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-secondary">
                  Known For
                </p>
                <p className="mt-1 text-gray-200">
                  {data?.known_for_department || "Acting"}
                </p>
              </div>

              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-secondary">
                  Gender
                </p>
                <p className="mt-1 text-gray-200">
                  {GENDERS_MAP[data?.gender] || "Not specified"}
                </p>
              </div>

              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-secondary">
                  Place of Birth
                </p>
                <p className="mt-1 text-gray-200">
                  {data?.place_of_birth || "Unknown"}
                </p>
              </div>

              <div>
                <p className="font-bold text-xs uppercase tracking-wider text-secondary">
                  Birthday
                </p>
                <p className="mt-1 text-gray-200">
                  {data?.birthday || "Unknown"}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Filmography */}
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold sm:text-4xl text-secondary mb-4">
              {data?.name}
            </h1>

            <div className="mb-8 rounded-2xl bg-gray-800/50 p-6 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-3">Biography</h3>
              <p className="leading-relaxed text-sm sm:text-base text-gray-300 whitespace-pre-line text-justify">
                {data?.biography || "No biography available for this person."}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Known For ({peopleCastMovies.length})
              </h3>

              {peopleCastMovies.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {peopleCastMovies.slice(0, 20).map((movie) => (
                    <MovieCard
                      key={`${movie.id}-${movie.credit_id || movie.title}`}
                      id={movie.id}
                      title={movie.title || movie.name}
                      date={movie.release_date || movie.first_air_date}
                      point={movie.vote_average || 0}
                      poster={movie.poster_path}
                      type={movie.media_type || "movie"}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">No movies found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleDetail;

// Component
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
// React Router
import { useParams } from "react-router";
// useSWR
import useSWR from "swr";
// Constant
import { DETAILS_DATA } from "@constants";
import { movieFetcher } from "@services/fetcher";
import MovieInformation from "@/components/MediaDetail/MovieInformation";
import { groupBy } from "lodash";

const MovieDetail = () => {
  const { id } = useParams();

  const movieDetailData = DETAILS_DATA?.MOVIE(id);
  const movieRelatedData = DETAILS_DATA?.RECOMMENDATIONS_MOVIES(id);

  const { data, isLoading } = useSWR(
    movieDetailData ? [movieDetailData] : null,
    movieFetcher,
  );

  const { data: movieRelatedList, isLoading: isMovieRelatedListLoading } =
    useSWR(movieRelatedData ? [movieRelatedData] : null, movieFetcher);

  const certification = (
    (data?.release_dates?.results || []).find(
      (results) => results?.iso_3166_1 === "US",
    )?.release_dates || []
  ).find((releaseDate) => releaseDate.certification)?.certification;

  const crews = (data?.credits?.crew || [])
    .filter((crew) => ["Director", "Screenplay", "Writer"].includes(crew?.job))
    .map((crew) => ({
      id: crew.id,
      name: crew.name,
      job: crew.job,
    }));

  const groupCrews = groupBy(crews, "job");

  const trailerVideo = (data?.videos?.results || []).find((video) => {
    return video.type === "Trailer" && video.site === "YouTube";
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen text-white">
      <Banner
        mediaInfo={data}
        title={data?.title || data?.name}
        background={data?.backdrop_path}
        poster={data?.poster_path}
        overview={data?.overview}
        point={data?.vote_average}
        genres={data?.genres}
        certification={certification}
        groupCrews={groupCrews}
        type="movie"
        date={data?.release_date}
        runtime={data?.runtime}
        trailerKey={trailerVideo?.key}
      />
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:flex-[3] xl:flex-[4]">
            <ActorList
              title="Top Cast"
              actors={data?.credits?.cast || []}
            />
          </div>
          <div className="w-full lg:flex-1">
            <MovieInformation movieInfo={data} />
          </div>
        </div>
        <div className="mt-8">
          <RelatedMediaList
            isMovieRelatedListLoading={isMovieRelatedListLoading}
            relatedList={movieRelatedList?.results || []}
            title="Similar Movies For You"
          />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

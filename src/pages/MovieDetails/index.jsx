// Hooks
import { useEffect } from "react";
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

const MovieDetails = () => {
  const { id } = useParams();

  const movieDetailData = DETAILS_DATA?.MOVIE(id);
  const movieRelatedData = DETAILS_DATA?.RECOMMENDATIONS_MOVIES(id);

  const { data, isLoading } = useSWR(
    movieDetailData ? [movieDetailData] : null,
    movieFetcher,
  );
  const { data: movieRelatedList, isLoading: isMovieRelatedListLoading } =
    useSWR(movieRelatedData ? [movieRelatedData] : null, movieFetcher);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Banner mediaInfo={data} />
      <div className="container">
        <div className="flex gap-x-6 gap-y-6">
          <div className="flex-[4]">
            <ActorList title={"Actor List"} actors={data?.credits?.cast} />
          </div>
          <div className="flex-1">
            <MovieInformation movieInfo={data}></MovieInformation>
          </div>
        </div>
        <div className="mt-6">
          <RelatedMediaList
            isMovieRelatedListLoading={isMovieRelatedListLoading}
            relatedList={movieRelatedList?.results}
            title={"Similar Movies for you"}
          ></RelatedMediaList>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

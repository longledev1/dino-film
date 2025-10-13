// Hooks
import { useEffect } from "react";
// Component
import Loading from "@components/Loading";
import Banner from "@components/MediaDetail/Banner";
import ActorList from "@components/MediaDetail/ActorList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import TVShowInformation from "@/components/MediaDetail/TVShowInformation";
import SeasonList from "@/components/MediaDetail/SeasonList";
import EpisodeList from "@/components/MediaDetail/EpisodeList";
// React Router
import { useParams } from "react-router";
// useSWR
import useSWR from "swr";
// Constant
import { DETAILS_DATA } from "@constants";
import { movieFetcher } from "@services/fetcher";
import { groupBy } from "lodash";

const TVShowDetail = () => {
  const { id } = useParams();

  const tvShowDetailData = DETAILS_DATA?.TV(id);
  const tvShowRelatedDataList = DETAILS_DATA?.RECOMMENDATIONS_TV(id);
  const seasonData = DETAILS_DATA?.SEASONS_TV(id, 1);

  const { data, isLoading } = useSWR(
    tvShowDetailData ? [tvShowDetailData] : null,
    movieFetcher,
  );

  const { data: tvShowRelatedData, isLoading: isTvShowRelatedListLoading } =
    useSWR(
      tvShowRelatedDataList ? [tvShowRelatedDataList] : null,
      movieFetcher,
    );

  const { data: seasonDetailData } = useSWR(
    seasonData ? [seasonData] : null,
    movieFetcher,
  );

  const contentRating =
    (data?.content_ratings?.results || []).find(
      (results) => results?.iso_3166_1 === "US",
    )?.rating || [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const crews = (data?.credits?.crew || [])
    .filter((crew) =>
      ["Directing", "Writing", "Writer"].includes(crew?.known_for_department),
    )
    .map((crew) => ({
      id: crew.id,
      name: crew.name,
      job: crew.known_for_department,
    }));

  const groupCrews = groupBy(crews, "job");

  const trailerVideo = (data?.videos?.results || []).find((video) => {
    return video.type === "Trailer";
  });

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <Banner
        title={data?.title || data?.name}
        background={data?.backdrop_path}
        poster={data?.poster_path}
        overview={data?.overview}
        point={data?.vote_average}
        contentRating={contentRating}
        groupCrews={groupCrews}
        genres={data?.genres}
        type={data?.media_type}
        date={data?.release_date || data?.first_air_date}
        runtime={data?.runtime}
        trailerKey={trailerVideo?.key}
      />
      <div className="container">
        <div className="mb-6 flex gap-x-6 gap-y-6">
          <div className={data?.credits?.cast != "" ? `flex-[4]` : "hidden"}>
            <ActorList title={"Actor List"} actors={data?.credits?.cast} />
          </div>
          <div className="flex-1">
            <TVShowInformation tvInfo={data}></TVShowInformation>
          </div>
        </div>
        <div>
          <EpisodeList episodes={seasonDetailData?.episodes}></EpisodeList>
        </div>
        {data?.seasons?.length > 1 ? (
          <div className="mt-6">
            <SeasonList
              seasonNumber={data?.season_number}
              id={data.id}
              seasons={data.seasons.reverse()}
            ></SeasonList>
          </div>
        ) : (
          ""
        )}
        <div className="mt-6">
          <RelatedMediaList
            isMovieRelatedListLoading={isTvShowRelatedListLoading}
            relatedList={tvShowRelatedData?.results}
            title={"Similar TV SHOW for you"}
          ></RelatedMediaList>
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;

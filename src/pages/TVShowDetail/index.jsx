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
    )?.rating || "";

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
    return <Loading />;
  }

  const hasCast = Array.isArray(data?.credits?.cast) && data.credits.cast.length > 0;

  return (
    <div className="min-h-screen text-white">
      <Banner
        mediaInfo={data}
        title={data?.title || data?.name}
        background={data?.backdrop_path}
        poster={data?.poster_path}
        overview={data?.overview}
        point={data?.vote_average}
        contentRating={contentRating}
        groupCrews={groupCrews}
        genres={data?.genres}
        type="tv"
        date={data?.release_date || data?.first_air_date}
        runtime={data?.episode_run_time?.[0]}
        trailerKey={trailerVideo?.key}
      />
      <div className="container">
        <div className="mb-8 flex flex-col lg:flex-row gap-8">
          {hasCast && (
            <div className="w-full lg:flex-[3] xl:flex-[4]">
              <ActorList title="Top Cast" actors={data.credits.cast} />
            </div>
          )}
          <div className="w-full lg:flex-1">
            <TVShowInformation tvInfo={data} />
          </div>
        </div>

        {seasonDetailData?.episodes && seasonDetailData.episodes.length > 0 && (
          <div className="mb-8">
            <EpisodeList episodes={seasonDetailData.episodes} />
          </div>
        )}

        {data?.seasons && data.seasons.length > 1 && (
          <div className="mb-8">
            <SeasonList
              seasonNumber={1}
              id={data.id}
              seasons={data.seasons}
            />
          </div>
        )}

        <div className="mt-8">
          <RelatedMediaList
            isMovieRelatedListLoading={isTvShowRelatedListLoading}
            relatedList={tvShowRelatedData?.results || []}
            title="Recommended TV Shows"
          />
        </div>
      </div>
    </div>
  );
};

export default TVShowDetail;

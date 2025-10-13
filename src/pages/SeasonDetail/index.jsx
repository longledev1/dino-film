import React, { useEffect } from "react";
// React-Router
import { useParams } from "react-router-dom";
// useSWR
import useSWR from "swr";
// Constant
import { DETAILS_DATA } from "@/constant";
import { movieFetcher } from "@/services/fetcher";
// Components
import ActorList from "@/components/MediaDetail/ActorList";
import SeasonInformation from "@/components/MediaDetail/SeasonInformation";
import EpisodeList from "@/components/MediaDetail/EpisodeList";
import RelatedMediaList from "@/components/MediaDetail/RelatedMediaList";
import SeasonList from "@/components/MediaDetail/SeasonList";
import Banner from "@/components/MediaDetail/Banner";
// Lo-dash
import { groupBy } from "lodash";
const SeasonDetail = () => {
  const { id, number } = useParams();
  const seasonDetail = DETAILS_DATA.SEASONS_TV(id, number);
  const tvDetail = DETAILS_DATA.TV(id);
  const tvShowRelated = DETAILS_DATA?.RECOMMENDATIONS_TV(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data, isLoading } = useSWR(
    seasonDetail ? [seasonDetail] : null,
    movieFetcher,
  );

  const { data: tvShowData } = useSWR(
    tvDetail ? [tvDetail] : null,
    movieFetcher,
  );

  const { data: tvShowRelatedDataList } = useSWR(
    tvShowRelated ? [tvShowRelated] : null,
    movieFetcher,
  );

  const contentRating =
    (tvShowData?.content_ratings?.results || []).find(
      (results) => results?.iso_3166_1 === "US",
    )?.rating || [];

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

  const trailerVideo = data?.videos?.results[0] || [];

  return (
    <div>
      <Banner
        title={tvShowData?.name}
        background={tvShowData?.backdrop_path}
        genres={tvShowData?.genres}
        point={tvShowData?.vote_average}
        name={data?.name}
        poster={data?.poster_path}
        overview={data?.overview}
        type={data?.media_type}
        date={data?.air_date}
        runtime={data?.runtime}
        contentRating={contentRating}
        groupCrews={groupCrews}
        trailerKey={trailerVideo?.key}
      />
      <div className="container">
        <div className="mb-6 flex gap-x-6 gap-y-6">
          <div className={data?.credits?.cast != "" ? `flex-[4]` : "hidden"}>
            <ActorList title={"Actor List"} actors={data?.credits?.cast} />
          </div>
          <div className="flex-1">
            <SeasonInformation
              tvName={tvShowData?.name}
              tvCountry={tvShowData?.origin_country}
              seasonInfo={data}
            ></SeasonInformation>
          </div>
        </div>
        <div className="mb-6">
          <SeasonList
            seasonNumber={data?.season_number}
            id={tvShowData?.id}
            seasons={tvShowData?.seasons}
          />
        </div>
        <div>
          <EpisodeList episodes={data?.episodes}></EpisodeList>
        </div>
        <div className="mt-6">
          <RelatedMediaList
            isMovieRelatedListLoading={isLoading}
            relatedList={tvShowRelatedDataList?.results}
            title={"Similar TV SHOW for you"}
          ></RelatedMediaList>
        </div>
      </div>
    </div>
  );
};

export default SeasonDetail;

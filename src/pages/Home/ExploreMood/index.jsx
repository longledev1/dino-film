import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Title from "@/components/Title";
import { movieFetcher } from "@/services/fetcher";
import useSWR from "swr";
import { useLocalStorage } from "@uidotdev/usehooks";
import { MOOD_MEDIA_DATA } from "@/constant";
import MediaCard from "@/components/People/PeopleCastCard";
import ReactPaginate from "react-paginate";
import { capitalize } from "@/constant/ultil";
import Loading from "@/components/Loading";

const MoodPage = () => {
  const [currentExplorePage, setCurrentExplorePage] = useLocalStorage(
    "explore-page",
    1,
  );
  const [lastMediaType, setLastMediaType] = useLocalStorage(
    "last-media-type",
    "",
  );
  const type = useParams().type;

  useEffect(() => {
    if (type !== lastMediaType) {
      setCurrentExplorePage(1); // Reset trang về 1
    }

    setLastMediaType(type);

    window.scrollTo(0, 0);
  }, [type, lastMediaType, setCurrentExplorePage, setLastMediaType]);

  const MOOD_MEDIA_ENDPOINT = MOOD_MEDIA_DATA[type];

  const { data, isLoading } = useSWR(
    MOOD_MEDIA_ENDPOINT ? [MOOD_MEDIA_ENDPOINT(currentExplorePage)] : null,
    movieFetcher,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePageChange = ({ selected }) => {
    setCurrentExplorePage(selected + 1);
    window.scrollTo({ top: 230, behavior: "smooth" });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="relative min-h-screen pt-[108px] text-white">
      <div className="px-[20px] py-[25px]">
        <div className="flex items-center gap-x-2 text-2xl font-bold">
          <p className="text-amber-200">{capitalize(type)}</p>
          <p>Movies</p>
        </div>

        <div className="mt-[50px]">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-200 border-t-transparent"></div>
              <p className="ml-3 text-sm text-white">Loading...</p>
            </div>
          ) : (
            <>
              <div className="mb-10 grid grid-cols-4 gap-4 sm:grid-cols-7">
                {data &&
                  data?.results.map((movie, index) => (
                    <MediaCard
                      key={`${movie.id}-${index}`}
                      id={movie.id}
                      title={movie.title || movie.name}
                      date={movie.release_date || movie.first_air_date}
                      onPageChange={handlePageChange}
                      point={movie.vote_average}
                      poster={movie.poster_path}
                      type={movie.media_type}
                    ></MediaCard>
                  ))}
              </div>
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageChange}
                pageRangeDisplayed={3}
                pageCount={Math.min(data?.total_pages, 500)}
                forcePage={currentExplorePage - 1}
                previousLabel="<"
                containerClassName="flex gap-2 items-center justify-center mt-6"
                pageClassName="outline-none px-3 py-1 rounded cursor-pointer hover:opacity-75 rounded-full w-fit "
                activeClassName="border-2 bg-amber-200 text-black font-bold"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodPage;

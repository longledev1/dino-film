import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchMovie from "@components/SearchMovie";
import MovieServices from "@/services/MovieServices";
import { SEARCH_QUERY } from "@/constant";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTodo, setSearchTodo] = useState("");

  const debouncedSearch = useDebounce(searchTodo, 400);

  const movieFetcher = async ({ endpoint, params }) => {
    return await MovieServices.request(endpoint, params);
  };

  const searchQuery = debouncedSearch
    ? SEARCH_QUERY.MULTI(debouncedSearch)
    : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    setSearchTodo(e.target.value);
  };

  const { data, isLoading } = useSWR(searchQuery, movieFetcher);
  return (
    <nav
      className={`fixed top-0 left-0 z-30 w-full px-[20px] py-[25px] transition-colors duration-300 ${isScrolled ? "bg-black/80 backdrop-blur" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-x-2">
          <Link to="/">
            <img className="w-38" src="/images/logo.svg" alt="" />
          </Link>

          <ul className="hidden space-x-6 md:flex">
            <li>
              <Link to={`/`} className="text-white hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link
                to={`/search?mediaType=movie`}
                className="text-white hover:text-gray-300"
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to={`/search?mediaType=tv`}
                className="text-white hover:text-gray-300"
              >
                TV Show
              </Link>
            </li>
            {/* <li>
              <a href="#" className="text-white hover:text-gray-300">
                Discover
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                Movie Release
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-gray-300">
                About Dino
              </a>
            </li> */}
          </ul>
        </div>
        {/* Search movie */}
        <SearchMovie
          isLoading={isLoading}
          mediaData={data}
          searchTodo={searchTodo}
          handleSearch={handleSearch}
        />
      </div>
    </nav>
  );
}

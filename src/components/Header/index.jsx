import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import SearchMovie from "@components/SearchMovie";
import MovieServices from "@/services/MovieServices";
import { SEARCH_QUERY } from "@/constant";
import useSWR from "swr";
import useDebounce from "@/hooks/useDebounce";
import useWatchlist from "@/hooks/useWatchlist";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FaBookmark } from "react-icons/fa";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchTodo, setSearchTodo] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { watchlist } = useWatchlist();
  const location = useLocation();

  const debouncedSearch = useDebounce(searchTodo, 400);

  const movieFetcher = async ({ endpoint, params }) => {
    return await MovieServices.request(endpoint, params);
  };

  const searchQuery = debouncedSearch
    ? SEARCH_QUERY.MULTI(debouncedSearch)
    : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng mobile menu khi chuyển trang
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const handleSearch = (e) => {
    setSearchTodo(e.target.value);
  };

  const { data, isLoading } = useSWR(searchQuery, movieFetcher);

  return (
    <nav
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#181b24]/95 py-3 shadow-2xl shadow-black/80 backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6">
        {/* Left Side: Logo & Navigation Links */}
        <div className="flex items-center gap-x-8">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 hover:scale-105"
              src="/images/logo.svg"
              alt="Dino Movie Logo"
            />
          </Link>

          <ul className="hidden space-x-1 md:flex items-center text-sm font-medium">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "text-primary font-bold bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search?mediaType=movie"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors ${
                    isActive && location.search.includes("mediaType=movie")
                      ? "text-primary font-bold bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/search?mediaType=tv"
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 transition-colors ${
                    isActive && location.search.includes("mediaType=tv")
                      ? "text-primary font-bold bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                TV Shows
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/watchlist"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 rounded-lg px-3 py-2 transition-colors ${
                    isActive
                      ? "text-secondary font-bold bg-white/5"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`
                }
              >
                <FaBookmark className="text-xs" />
                <span>Watchlist</span>
                {watchlist.length > 0 && (
                  <span className="ml-1 rounded-full bg-secondary px-1.5 py-0.2 text-[10px] font-bold text-black">
                    {watchlist.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side: Search Box & Mobile Hamburger */}
        <div className="flex items-center gap-x-3">
          <SearchMovie
            isLoading={isLoading}
            mediaData={data}
            searchTodo={searchTodo}
            handleSearch={handleSearch}
          />

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white md:hidden hover:bg-white/20 transition-colors"
          >
            {mobileMenuOpen ? (
              <HiOutlineX className="text-2xl" />
            ) : (
              <HiOutlineMenu className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-white/10 bg-[#181b24]/95 px-6 py-4 backdrop-blur-xl md:hidden animate-fadeIn">
          <ul className="flex flex-col space-y-2 text-base font-medium text-white">
            <li>
              <Link
                to="/"
                className="block rounded-lg px-3 py-2.5 hover:bg-white/10"
              >
                🏠 Home
              </Link>
            </li>
            <li>
              <Link
                to="/search?mediaType=movie"
                className="block rounded-lg px-3 py-2.5 hover:bg-white/10"
              >
                🎬 Movies
              </Link>
            </li>
            <li>
              <Link
                to="/search?mediaType=tv"
                className="block rounded-lg px-3 py-2.5 hover:bg-white/10"
              >
                📺 TV Shows
              </Link>
            </li>
            <li>
              <Link
                to="/watchlist"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-white/10 text-secondary font-semibold"
              >
                <span className="flex items-center gap-2">
                  <FaBookmark /> My Watchlist
                </span>
                {watchlist.length > 0 && (
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-black">
                    {watchlist.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

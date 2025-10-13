import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // 50px là ngưỡng
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-30 w-full px-[20px] py-[25px] transition-colors duration-300 ${isScrolled ? "bg-black/80 backdrop-blur" : "bg-transparent"}`}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img className="w-38" src="/images/logo.svg" alt="" />
        </Link>

        {/* Menu */}
        <ul className="hidden space-x-6 md:flex">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Movies
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              TV Shows
            </a>
          </li>
          <li>
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
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex items-center space-x-3">
          <IoIosSearch className="cursor-pointer text-2xl text-white" />
          <button className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-white hover:bg-white hover:text-black">
            Sign up
          </button>
          <button className="bg-button cursor-pointer rounded px-4 py-2 text-white hover:bg-green-700">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
}

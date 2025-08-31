import { IoIosSearch } from "react-icons/io";

export default function Header() {
  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 z-50 w-full">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <img className="w-38" src="/images/logo.svg" alt="" />
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
                Forum
              </a>
            </li>
          </ul>

          {/* Buttons */}
          <div className="flex items-center space-x-3">
            <IoIosSearch className="cursor-pointer text-2xl text-white"></IoIosSearch>
            <button className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-white hover:bg-white hover:text-black">
              Sign up
            </button>
            <button className="bg-button cursor-pointer rounded px-4 py-2 text-white hover:bg-green-700">
              Login
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

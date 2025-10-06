import { GiDinosaurRex } from "react-icons/gi";
import { FaTelegramPlane } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaThreads } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-gray-800 px-6 py-6 text-white">
      {/* Footer Slogan */}
      <div className="flex justify-center lg:justify-start">
        <div className="bg-button mb-6 flex w-fit items-center gap-x-2 rounded-full p-2 text-[14px]">
          <GiDinosaurRex className="text-2xl text-white" />
          <p>Dino Film, Watch and Chill</p>
        </div>
      </div>
      {/* Footer Logo & Icons */}
      <div className="mb-6 flex flex-col items-center gap-x-12 lg:flex-row">
        <img src="/images/logo.svg" alt="" className="w-[200px]" />
        <div className="hidden h-[40px] w-[1px] rounded-md bg-gray-400 lg:block"></div>
        <div className="mt-6 flex items-center gap-x-2 lg:mt-0">
          {/* Telegram icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaTelegramPlane className="text-[20px] text-white" />
          </div>
          {/* Discord icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaDiscord className="text-[20px] text-white" />
          </div>
          {/* X icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaXTwitter className="text-[20px] text-white" />
          </div>
          {/* Facebook icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaFacebookF className="text-[20px] text-white" />
          </div>
          {/* Tiktok icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaTiktok className="text-[20px] text-white" />
          </div>
          {/* Youtube icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaYoutube className="text-[20px] text-white" />
          </div>
          {/* Thread icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaThreads className="text-[20px] text-white" />
          </div>
          {/* Instagram icon */}
          <div className="flex justify-center rounded-full bg-gray-900 p-3 transition-transform duration-200 ease-in-out hover:-translate-y-1.5 hover:cursor-pointer">
            <FaInstagram className="text-[20px] text-white" />
          </div>
        </div>
      </div>
      {/* Footer Menu */}
      <div className="mb-6 flex items-center gap-x-6 text-[14px] font-thin text-white">
        <li className="list-none hover:text-yellow-200 hover:underline">
          <a href="#">FAQ</a>
        </li>
        <li className="list-none hover:text-yellow-200 hover:underline">
          <a href="#">Privacy Policy</a>
        </li>
        <li className="list-none hover:text-yellow-200 hover:underline">
          <a href="#">Terms of Use</a>
        </li>
        <li className="list-none hover:text-yellow-200 hover:underline">
          <a href="#">About Us</a>
        </li>
        <li className="list-none hover:text-yellow-200 hover:underline">
          <a href="#">Contact Us</a>
        </li>
      </div>
      {/* Footer Content */}
      <div>
        <p className="mb-2 w-full text-justify text-[14px] leading-6 font-thin text-white lg:w-[800px]">
          DinoFilm – A basket of good movies - A site to watch high-quality
          online movies for free with Vietsub, voiceover, full HD dubbing. A
          huge library of new movies, movies in theaters, series, movies from
          many countries such as Vietnam, Korea, China, Thailand, Japan, Europe
          and America... diverse genres. Discover the best online movie platform
          of 2025 with 4K quality!
        </p>
        <p className="text-[14px] leading-6 font-bold text-white">
          © 2025 DinoFilm. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;

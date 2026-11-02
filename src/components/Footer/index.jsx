import { GiDinosaurRex } from "react-icons/gi";
import {
  FaTelegramPlane,
  FaDiscord,
  FaFacebookF,
  FaTiktok,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter, FaThreads } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-white/5 bg-[#13161c] px-6 py-12 text-white">
      <div className="container mx-auto">
        {/* Footer Slogan */}
        <div className="flex justify-center lg:justify-start">
          <div className="mb-8 flex items-center gap-x-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-1.5 text-sm font-medium text-primary">
            <GiDinosaurRex className="text-xl" />
            <span>Dino Film • Watch and Chill</span>
          </div>
        </div>

        {/* Footer Logo & Icons */}
        <div className="mb-8 flex flex-col items-center justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row">
          <Link to="/">
            <img
              src="/images/logo.svg"
              alt="Dino Movie Logo"
              className="w-[180px] transition-transform hover:scale-105"
            />
          </Link>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {[
              { icon: FaTelegramPlane, label: "Telegram" },
              { icon: FaDiscord, label: "Discord" },
              { icon: FaXTwitter, label: "X (Twitter)" },
              { icon: FaFacebookF, label: "Facebook" },
              { icon: FaTiktok, label: "TikTok" },
              { icon: FaYoutube, label: "YouTube" },
              { icon: FaThreads, label: "Threads" },
              { icon: FaInstagram, label: "Instagram" },
            ].map((item) => {
              const SocialIcon = item.icon;
              return (
                <a
                  key={item.label}
                  href="#"
                  title={item.label}
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800/80 text-gray-300 transition-all duration-200 hover:-translate-y-1 hover:bg-primary hover:text-white border border-white/5"
                >
                  <SocialIcon className="text-base" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer Menu */}
        <ul className="mb-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400 lg:justify-start">
          <li>
            <a href="#" className="transition-colors hover:text-secondary">
              FAQ
            </a>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-secondary">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-secondary">
              Terms of Service
            </a>
          </li>
          <li>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("dino_open_disclaimer"))}
              className="cursor-pointer transition-colors hover:text-secondary"
            >
              About & Disclaimer
            </button>
          </li>
          <li>
            <a href="#" className="transition-colors hover:text-secondary">
              Contact & Support
            </a>
          </li>
        </ul>

        {/* Footer Content */}
        <div className="text-xs sm:text-sm text-gray-400">
          <p className="mb-3 max-w-3xl leading-relaxed text-gray-400/80">
            DinoFilm – The ultimate movie discovery hub. Discover thousands of
            box-office hits, popular TV series, timeless Disney animations, and
            top-rated cinema worldwide with high-definition trailers, detailed
            cast bios, and real-time community ratings.
          </p>
          <p className="font-semibold text-gray-300">
            © {currentYear} DinoFilm. Crafted with passion for cinema lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

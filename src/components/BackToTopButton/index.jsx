import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-6 bottom-6 z-40 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-black/50 transition-all duration-300 hover:bg-primary-hover hover:scale-110 active:scale-95 border border-white/20 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

export default BackToTopButton;

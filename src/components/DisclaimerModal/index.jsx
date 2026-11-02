import React, { useState, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";
import { GiDinosaurRex } from "react-icons/gi";
import {
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

const STORAGE_KEY_DISMISSED = "dino_disclaimer_dismissed";
const STORAGE_KEY_LANG = "dino_disclaimer_lang";

const CONTENT = {
  vi: {
    badge: "Dự án Học tập & Phi thương mại",
    welcome: "Chào mừng bạn đến với Dino Film!",
    title: "Thông báo & Giới thiệu Dự án",
    intro:
      "Đây là dự án cá nhân được xây dựng với mục tiêu học tập, mở rộng kiến thức và rèn luyện kỹ năng chuyên môn như thiết kế giao diện UI/UX mượt mà, tối ưu hiệu năng và tích hợp hệ thống RESTful API từ The Movie Database (TMDB).",
    warningTitle: "Lưu ý về tính năng xem phim:",
    warningDesc:
      "Website KHÔNG hỗ trợ phát hoặc xem phim trực tuyến (không vi phạm bản quyền). Tại đây, bạn có thể tự do khám phá thông tin chi tiết các bộ phim điện ảnh, series truyền hình, xem trailer chính thức từ YouTube, thông tin dàn diễn viên và quản lý danh sách yêu thích (Watchlist) của riêng mình.",
    features: [
      { title: "React 19 & Tailwind CSS", desc: "Giao diện hiện đại & mượt mà" },
      { title: "Dữ liệu TMDB API", desc: "Cập nhật phim & trailer chuẩn xác" },
      { title: "Watchlist cá nhân", desc: "Lưu phim xem sau tiện lợi" },
      { title: "Non-profit / Portfolio", desc: "Dự án phi lợi nhuận phục vụ học tập" },
    ],
    dontShowAgain: "Không hiển thị lại thông báo này",
    ctaButton: "Đã hiểu, Bắt đầu khám phá!",
  },
  en: {
    badge: "Learning & Non-Commercial Project",
    welcome: "Welcome to Dino Film!",
    title: "Project Disclaimer & Overview",
    intro:
      "This is a personal portfolio project created to expand knowledge and sharpen modern web development skills, including UI/UX design, performance optimization, and RESTful API integration with The Movie Database (TMDB).",
    warningTitle: "Important Movie Streaming Notice:",
    warningDesc:
      "This website DOES NOT provide full movie streaming capabilities. It is designed solely for exploring movie information, watching official YouTube trailers, browsing cast & crew biographies, and managing your personal Watchlist.",
    features: [
      { title: "React 19 & Tailwind CSS", desc: "Modern & responsive UI/UX" },
      { title: "TMDB API Integration", desc: "Accurate movie metadata & trailers" },
      { title: "Personal Watchlist", desc: "Save and manage favorite movies" },
      { title: "Portfolio / Non-profit", desc: "Dedicated to education & practice" },
    ],
    dontShowAgain: "Don't show this message again",
    ctaButton: "Got it, Explore Dino Film!",
  },
};

const DisclaimerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY_LANG) || "en";
    } catch {
      return "en";
    }
  });

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (dontShowAgain) {
      try {
        localStorage.setItem(STORAGE_KEY_DISMISSED, "true");
      } catch {
        // ignore localStorage errors
      }
    }
  }, [dontShowAgain]);

  const handleLangChange = (selectedLang) => {
    setLang(selectedLang);
    try {
      localStorage.setItem(STORAGE_KEY_LANG, selectedLang);
    } catch {
      // ignore localStorage errors
    }
  };

  useEffect(() => {
    // Check if dismissed before
    try {
      const isDismissed = localStorage.getItem(STORAGE_KEY_DISMISSED);
      if (!isDismissed) {
        // Small delay to let page render smoothly first
        const timer = setTimeout(() => {
          setIsOpen(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    } catch {
      setIsOpen(true);
    }
  }, []);

  // Listen to manual open event (e.g. from footer link)
  useEffect(() => {
    window.addEventListener("dino_open_disclaimer", handleOpen);
    return () => {
      window.removeEventListener("dino_open_disclaimer", handleOpen);
    };
  }, [handleOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const t = CONTENT[lang] || CONTENT.vi;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[94vh] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-[#161922] p-4 sm:p-6 md:p-7 shadow-2xl text-white transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow Effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="absolute -top-20 -left-20 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-48 w-48 rounded-full bg-secondary/15 blur-3xl" />
        </div>

        {/* Top Header: Badge, Language Switcher, Close button */}
        <div className="relative mb-3 flex items-center justify-between gap-2">
          {/* Dinosaur Rex Badge */}
          <div className="flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/15 px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-primary shrink min-w-0">
            <GiDinosaurRex className="text-sm sm:text-base shrink-0" />
            <span className="truncate">{t.badge}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-0.5 shadow-inner">
              <button
                type="button"
                onClick={() => handleLangChange("en")}
                className={`flex cursor-pointer items-center gap-1 rounded-full px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-bold transition-all ${
                  lang === "en"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>🇬🇧</span> EN
              </button>
              <button
                type="button"
                onClick={() => handleLangChange("vi")}
                className={`flex cursor-pointer items-center gap-1 rounded-full px-2 sm:px-2.5 py-0.5 text-[11px] sm:text-xs font-bold transition-all ${
                  lang === "vi"
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span>🇻🇳</span> VI
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close disclaimer"
              className="flex h-7 w-7 sm:h-8 sm:w-8 cursor-pointer items-center justify-center rounded-full bg-white/10 text-gray-400 transition-colors hover:bg-white/20 hover:text-white shrink-0"
            >
              <IoClose className="text-base sm:text-lg" />
            </button>
          </div>
        </div>

        {/* Title & Welcome */}
        <div className="relative mb-2">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-secondary">
            {t.welcome}
          </p>
          <h2
            id="disclaimer-title"
            className="mt-0.5 text-base sm:text-xl md:text-2xl font-black tracking-tight text-white drop-shadow"
          >
            {t.title}
          </h2>
        </div>

        {/* Intro */}
        <p className="relative mb-2.5 text-xs sm:text-sm leading-relaxed text-gray-300">
          {t.intro}
        </p>

        {/* Important Warning Notice */}
        <div className="relative mb-3 rounded-xl border border-secondary/40 bg-secondary/10 p-2.5 sm:p-3 backdrop-blur-sm">
          <div className="flex items-start gap-2.5">
            <div className="mt-0.5 flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/20 text-secondary border border-secondary/30">
              <FaExclamationTriangle className="text-xs" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold text-secondary">
                {t.warningTitle}
              </h3>
              <p className="mt-0.5 text-[11px] sm:text-xs leading-relaxed text-gray-200">
                {t.warningDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Key Project Highlights */}
        <div className="relative mb-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
          {t.features.map((feat, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-colors hover:bg-white/[0.06]"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary border border-primary/30">
                <FaCheckCircle className="text-[11px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white leading-tight">{feat.title}</p>
                <p className="mt-0.5 text-[11px] text-gray-400 leading-snug">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions & Don't show again */}
        <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-white/10">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-400 hover:text-gray-200 select-none py-0.5">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="h-3.5 w-3.5 rounded border-gray-600 bg-gray-800 text-primary accent-primary focus:ring-primary cursor-pointer shrink-0"
            />
            <span>{t.dontShowAgain}</span>
          </label>

          <button
            type="button"
            onClick={handleClose}
            className="flex w-full sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-2.5 px-6 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/30 transition-all duration-200 hover:bg-primary-hover hover:scale-[1.02] active:scale-95"
          >
            <span>{t.ctaButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisclaimerModal;

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaRegCheckCircle, FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const ToastContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ title, message, type = "success", poster = null, duration = 3000 }) => {
      const id = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newToast = { id, title, message, type, poster };

      setToasts((prev) => {
        // Keep at most 3 simultaneous toasts to prevent screen crowding
        const updated = [...prev, newToast];
        return updated.slice(-3);
      });

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }

      return id;
    },
    [removeToast],
  );

  // Listen to global dino_toast event dispatched anywhere (e.g. useWatchlist)
  useEffect(() => {
    const handleGlobalToast = (e) => {
      if (e.detail) {
        addToast(e.detail);
      }
    };

    window.addEventListener("dino_toast", handleGlobalToast);
    return () => {
      window.removeEventListener("dino_toast", handleGlobalToast);
    };
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Floating Toast Container */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 left-1/2 z-[100] flex w-[92%] max-w-sm -translate-x-1/2 flex-col gap-2.5 transition-all duration-300 sm:bottom-6 sm:right-6 sm:left-auto sm:translate-x-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-gray-900/95 p-3 shadow-2xl backdrop-blur-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
          >
            {/* Poster thumbnail or Icon */}
            <div className="shrink-0">
              {toast.poster ? (
                <img
                  src={toast.poster}
                  alt={toast.title || "Movie poster"}
                  className="h-12 w-9 rounded-lg object-cover border border-white/10 shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : toast.type === "remove" ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 text-red-400 border border-red-500/30">
                  <FaTrashAlt className="text-sm" />
                </div>
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30">
                  <FaBookmark className="text-sm" />
                </div>
              )}
            </div>

            {/* Info Message & Movie Title */}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                {toast.type === "remove" ? (
                  <span className="text-xs font-semibold text-red-400">
                    Watchlist
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-semibold text-secondary">
                    <FaRegCheckCircle className="text-[11px]" /> Watchlist
                  </span>
                )}
              </div>
              <p className="truncate text-sm font-semibold text-white">
                {toast.title ? toast.title : toast.message}
              </p>
              {toast.title && (
                <p className="text-xs text-gray-400">
                  {toast.message}
                </p>
              )}
            </div>

            {/* Actions: View Watchlist button + Close button */}
            <div className="flex items-center gap-1.5 shrink-0">
              {toast.type !== "remove" && (
                <Link
                  to="/watchlist"
                  onClick={() => removeToast(toast.id)}
                  className="rounded-lg bg-white/10 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-secondary hover:text-black"
                >
                  View
                </Link>
              )}
              <button
                onClick={() => removeToast(toast.id)}
                aria-label="Close notification"
                className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
              >
                <IoClose className="text-base" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

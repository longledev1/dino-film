import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "dino_movie_watchlist";

export const getWatchlist = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const useWatchlist = () => {
  const [watchlist, setWatchlist] = useState(getWatchlist);

  useEffect(() => {
    const handleStorageChange = () => {
      setWatchlist(getWatchlist());
    };
    window.addEventListener("dino_watchlist_update", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("dino_watchlist_update", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isInWatchlist = useCallback(
    (id) => {
      return watchlist.some((item) => String(item.id) === String(id));
    },
    [watchlist],
  );

  const toggleWatchlist = useCallback(
    (media) => {
      if (!media || !media.id) return;
      const current = getWatchlist();
      const exists = current.some((item) => String(item.id) === String(media.id));
      let updated;
      if (exists) {
        updated = current.filter((item) => String(item.id) !== String(media.id));
      } else {
        const itemToSave = {
          id: media.id,
          title: media.title || media.name,
          poster_path: media.poster_path || media.poster,
          backdrop_path: media.backdrop_path || media.background,
          release_date: media.release_date || media.first_air_date || media.date,
          vote_average: media.vote_average ?? media.point ?? 0,
          media_type: media.media_type || media.type || "movie",
          saved_at: Date.now(),
        };
        updated = [itemToSave, ...current];
      }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setWatchlist(updated);
        window.dispatchEvent(new Event("dino_watchlist_update"));

        const mediaTitle = media.title || media.name || "Movie";
        const posterPath =
          media.poster_path ||
          media.poster ||
          media.backdrop_path ||
          media.background;
        const posterUrl = posterPath
          ? `https://image.tmdb.org/t/p/w200${posterPath.startsWith("/") ? "" : "/"}${posterPath}`
          : null;

        window.dispatchEvent(
          new CustomEvent("dino_toast", {
            detail: {
              type: exists ? "remove" : "success",
              title: mediaTitle,
              message: exists
                ? "Removed from your Watchlist"
                : "Added to your Watchlist",
              poster: posterUrl,
            },
          }),
        );
      } catch (err) {
        console.error("Failed to update watchlist", err);
      }
      return !exists;
    },
    [],
  );

  return {
    watchlist,
    isInWatchlist,
    toggleWatchlist,
  };
};

export default useWatchlist;

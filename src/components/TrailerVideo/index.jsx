import React from "react";

const TrailerVideo = ({ trailerKey }) => {
  if (!trailerKey) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-900 text-gray-400">
        <p className="text-lg">No trailer available for this movie.</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
      <iframe
        title="Movie Trailer"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default TrailerVideo;

import React from "react";

const TrailerVideo = ({ trailerKey }) => {
  if (!trailerKey) return <p className="text-gray-400">No trailer available</p>;

  return (
    <iframe
      title="Trailer"
      src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0`}
      className="aspect-video h-[400px] w-[80%] rounded-xl shadow-lg sm:h-auto sm:w-[50%]"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
};

export default TrailerVideo;

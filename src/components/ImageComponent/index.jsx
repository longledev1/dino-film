import React, { useState, useEffect } from "react";

// Inline SVG shimmer placeholder để không bao giờ tốn request mạng ra bên ngoài
const PLACEHOLDER_SVG =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 450" width="100%" height="100%">
      <rect width="100%" height="100%" fill="#1f2937" />
      <path d="M110 200 L150 150 L190 200 Z" fill="#374151" />
      <circle cx="125" cy="155" r="12" fill="#4b5563" />
      <rect x="70" y="240" width="160" height="12" rx="6" fill="#374151" />
      <rect x="95" y="265" width="110" height="10" rx="5" fill="#374151" />
    </svg>
  `);

const ImageComponent = ({
  width,
  height,
  className = "",
  src,
  alt = "Movie poster",
  title,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);

    if (!src) {
      setHasError(true);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      setIsLoaded(true);
    };
    img.onerror = () => {
      setHasError(true);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  const displaySrc = hasError || !src ? PLACEHOLDER_SVG : src;

  return (
    <div
      className="relative h-full w-full overflow-hidden bg-gray-900"
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
        maxWidth: "100%",
      }}
    >
      {/* Skeleton Shimmer khi ảnh chưa load xong */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800" />
      )}

      <img
        loading="lazy"
        src={displaySrc}
        alt={alt || title || "Movie poster"}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded || hasError ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
};

export default ImageComponent;

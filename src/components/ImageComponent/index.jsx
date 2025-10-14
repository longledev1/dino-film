import React, { useEffect, useState } from "react";

const ImageComponent = ({ width, height, className, src, title }) => {
  const [currentSrc, setCurrentSrc] = useState(
    `https://placehold.co/${width}x${height}?text=Loading`,
  );

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setCurrentSrc(src);
    };
    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={title}
      width={width}
      height={height}
      className={
        currentSrc === src || !src ? className : `${className} blur-md`
      }
    />
  );
};

export default ImageComponent;

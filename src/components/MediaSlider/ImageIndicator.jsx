import { IMAGE_BASE_URL } from "@constants";
import ImageComponent from "@components/ImageComponent";
const ImageIndicator = ({ movies, index, onPreviewClick }) => {
  return (
    <>
      {movies &&
        movies.map((movie, i) => (
          <div
            className={`h-[90px] w-[60px] rounded-md border-3 bg-gray-600 ${
              i === index
                ? "border-yellow-200"
                : "cursor-pointer border-gray-900"
            }`}
            key={movie.id}
            onClick={() => onPreviewClick(i)}
          >
            <ImageComponent
              src={`${IMAGE_BASE_URL}/w300/${movie.backdrop_path}`}
              alt=""
              width={55}
              height={85}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        ))}
    </>
  );
};

export default ImageIndicator;

import { IMAGE_BASE_URL } from "@constants";
const ImageIndicator = (props) => {
  const { movies, index, onPreviewClick } = props;
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
            <img
              src={`${IMAGE_BASE_URL}/w300/${movie.backdrop_path}`}
              alt=""
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        ))}
    </>
  );
};

export default ImageIndicator;

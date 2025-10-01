const CircleIndicator = (props) => {
  const { movies, index, onPreviewClick } = props;

  return (
    <div className="flex gap-2">
      {movies &&
        movies.map((movie, i) => (
          <div
            key={movie.id}
            className={`h-2 w-2 rounded-full ${
              i === index ? "bg-yellow-200" : "cursor-pointer bg-gray-400"
            }`}
            onClick={() => onPreviewClick(i)}
          />
        ))}
    </div>
  );
};

export default CircleIndicator;

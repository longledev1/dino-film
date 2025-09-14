const PaginateIndicator = (props) => {
  const { movies, index, setIndex } = props;
  return (
    <div className="absolute right-7 bottom-[2%] z-50 lg:bottom-[5%]">
      <ul className="flex gap-x-1">
        {movies.map((movie, i) => (
          <li
            key={movie.id}
            onClick={() => setIndex(i)}
            className={`h-1.5 w-8 cursor-pointer hover:opacity-85 ${
              i === index ? "bg-white" : "bg-slate-100/50"
            }`}
          ></li>
        ))}
      </ul>
    </div>
  );
};

export default PaginateIndicator;

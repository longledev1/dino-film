import Movie from "./Movie";
import PaginateIndicator from "./PaginateIndicator";

export default function FeatureMovie() {
  return (
    <div className="relative h-screen w-full">
      <Movie></Movie>
      <PaginateIndicator></PaginateIndicator>
    </div>
  );
}

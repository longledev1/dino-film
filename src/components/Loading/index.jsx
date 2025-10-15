import "./Loading.css";
const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800">
      <div className="relative h-16 w-16 rotate-45">
        <div className="absolute top-0 left-0 h-1/2 w-1/2 scale-110">
          <div className="cube-face cube-face-1 absolute inset-0 origin-bottom-right bg-amber-200"></div>
        </div>

        <div className="absolute top-0 right-0 h-1/2 w-1/2 scale-110 rotate-90">
          <div className="cube-face cube-face-2 absolute inset-0 origin-bottom-right bg-amber-200"></div>
        </div>

        <div className="absolute right-0 bottom-0 h-1/2 w-1/2 scale-110 rotate-180">
          <div className="cube-face cube-face-3 absolute inset-0 origin-bottom-right bg-amber-200"></div>
        </div>

        <div className="absolute bottom-0 left-0 h-1/2 w-1/2 scale-110 -rotate-90">
          <div className="cube-face cube-face-4 absolute inset-0 origin-bottom-right bg-amber-200"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

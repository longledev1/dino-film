const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white">
      <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-white"></div>
    </div>
  );
};

export default Loading;

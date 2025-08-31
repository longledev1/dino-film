const PaginateIndicator = () => {
  return (
    <div className="absolute right-7 bottom-[5%]">
      <ul className="flex gap-x-1">
        <li className="h-1.5 w-8 cursor-pointer bg-slate-100/80"></li>
        <li className="h-1.5 w-8 cursor-pointer bg-slate-100/80"></li>
        <li className="h-1.5 w-8 cursor-pointer bg-slate-100/80"></li>
        <li className="h-1.5 w-8 cursor-pointer bg-slate-100/80"></li>
      </ul>
    </div>
  );
};

export default PaginateIndicator;

import React from "react";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";

const ShowMoreButton = ({
  setIsShowMore,
  isShowMore,
  currentData,
  visibleLimit,
}) => {
  return (
    <div
      onClick={() => setIsShowMore(!isShowMore)}
      className={`${currentData.length <= visibleLimit ? `hidden` : `group flex w-fit cursor-pointer items-center gap-x-2 rounded-md`} text-white`}
    >
      {isShowMore ? (
        <IoMdArrowDropupCircle className="text-3xl text-amber-200 group-hover:opacity-80" />
      ) : (
        <IoMdArrowDropdownCircle className="text-3xl text-amber-200 group-hover:opacity-80" />
      )}
      <p className="cursor-pointer transition duration-200 group-hover:text-amber-200">
        {isShowMore ? "Show less" : "Show more"}
      </p>
    </div>
  );
};

export default ShowMoreButton;

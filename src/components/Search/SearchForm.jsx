import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import {
  MediaTypeInput,
  GenresInput,
  RatingInput,
  CountriesInput,
} from "./FormInputs";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useNavigate } from "react-router";

const SearchForm = ({
  searchFormValue,
  setSearchFormValue,
  setIsShowFilter,
  setCurrentPage,
}) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: searchFormValue,
  });
  const navigate = useNavigate();

  useEffect(() => {
    reset(searchFormValue);
  }, [searchFormValue, reset]);

  const onSubmit = (data) => {
    setSearchFormValue(data);
    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
    setCurrentPage(1);
    navigate(`/search?mediaType=${data.mediaType}`);
  };

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (JSON.stringify(formValues) !== JSON.stringify(searchFormValue)) {
  //       setSearchFormValue(formValues);
  //     }
  //   }, 300);
  //   return () => clearTimeout(timeout);
  // }, [formValues]);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormField
        name="mediaType"
        control={control}
        label="Media Type"
        isCenter={true}
        Component={MediaTypeInput}
      />
      <hr className="border-t border-dashed border-gray-700" />
      <FormField
        name="genres"
        control={control}
        label="Genres"
        Component={GenresInput}
      />
      <hr className="border-t border-dashed border-gray-700" />
      <FormField
        name="country"
        control={control}
        label="Countries"
        Component={CountriesInput}
      />
      <hr className="border-t border-dashed border-gray-700" />
      <FormField
        name="rating"
        control={control}
        label="Rating"
        isCenter={true}
        Component={RatingInput}
      />
      <hr className="border-t border-dashed border-gray-700" />

      <div className="mb-4 ml-3">
        <div className="flex items-center gap-x-4">
          <button
            type="submit"
            className="ml-[20px] flex h-[40px] w-[160px] cursor-pointer items-center justify-center gap-x-2 rounded-full bg-amber-200 font-bold text-black hover:opacity-75"
          >
            Filter
            <FaLongArrowAltRight />
          </button>

          <button
            type="button"
            className="flex h-[40px] w-[100px] cursor-pointer items-center justify-center rounded-full border-2 border-white bg-white p-2 font-bold text-black hover:opacity-75"
            onClick={() => setIsShowFilter(false)}
          >
            Close
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm;

import React from "react";
import { useForm } from "react-hook-form";
import FormField from "./FormField";
import MediaTypeInput from "./FormInputs/MediaTypeInput";

const SearchForm = () => {
  const { handleSubmit, control } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      {/* <div className="flex flex-col gap-2">
        <label className="font-bold text-amber-200" htmlFor="">
          Media Type
        </label>
        <div className="flex items-center gap-x-2">
          <input
            className="h-3 w-3 cursor-pointer appearance-none rounded-full border-2 border-white checked:border-amber-200 checked:bg-amber-200"
            id="inp-movie"
            type="radio"
            value="movie"
            {...register("mediaType")}
          />
          <label htmlFor="inp-movie" className="font-thin">
            Movie
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <input
            className="h-3 w-3 cursor-pointer appearance-none rounded-full border-2 border-white checked:border-amber-200 checked:bg-amber-200"
            id="inp-tv"
            type="radio"
            value="tv"
            {...register("mediaType")}
          />
          <label htmlFor="inp-tv" className="font-thin">
            TV Show
          </label>
        </div>
      </div> */}
      <FormField
        name="mediaType"
        control={control}
        label="Media Type"
        Component={MediaTypeInput}
      />
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="font-bold text-amber-200">
          Genres
        </label>
        <div className="flex flex-wrap gap-2">
          <button className="ư rounded-md border-2 border-amber-200 bg-gray-600 p-1 text-[14px]">
            Action & Romatic
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
          <button className="rounded-md bg-[#0f1827] p-1 text-[14px]">
            Cartoon
          </button>
        </div>
      </div>
      <div className="flex w-fit flex-col gap-2">
        <label htmlFor="" className="font-bold text-amber-200">
          Rating
        </label>
        <select
          name=""
          id=""
          className="rounded-md border-2 border-gray-200 p-1"
        >
          <option value="">All</option>
          <option className="text-black" value=">0-49">
            0-49
          </option>
          <option className="text-black" value="50-69">
            50-69
          </option>
          <option className="text-black" value="70-100">
            70-100
          </option>
        </select>
      </div>

      <button
        className="cursor-pointer rounded-md bg-amber-200 p-2 font-bold text-black outline-none hover:opacity-75"
        type="submit"
      >
        Filter
      </button>
    </form>
  );
};

export default SearchForm;

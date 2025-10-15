import React from "react";
import Title from "@/components/Title";
import SearchForm from "@/components/Search/SearchForm";
const SearchPage = () => {
  return (
    <div className="relative min-h-screen pt-[108px] text-white">
      <div className="px-[20px] py-[25px]">
        <Title>Search Page</Title>
        <div className="mt-6 flex">
          <div className="flex-[0.5]">
            <div className="borde r-gray-600 rounded border-2 bg-gray-800 p-2">
              <SearchForm />
            </div>
          </div>
          <div className="flex-[2]">
            <p>Results</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

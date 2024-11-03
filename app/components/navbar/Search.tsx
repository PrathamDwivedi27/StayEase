"use client";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  return (
    <div className="border border-gray-300 w-full md:w-auto py-3 rounded-full shadow-sm hover:shadow-md transition cursor-pointer">
      <div className="flex flex-row items-center justify-between px-4">
        <div className="text-sm font-semibold px-4">Anywhere</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x border-gray-300 flex-1 text-center">
          Anyweek
        </div>
        <div className="text-sm px-4 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">Add Guests</div>
          <div className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;

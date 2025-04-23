"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { useState } from "react";

export default function Navbar() {
  const [searchBar, setSearchBar] = useState(false);

  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  return (
    <div className="flex flex-col sticky top-0 left-0 z-50">
      <nav className=" bg-[#1E90FF] text-black py-4  w-full max-w-full">
        <div className="flex flex-row justify-between items-center w-full max-w-[1024px] mx-auto px-4">
          <Link href={"/"}>
            <h1 className="text-white text-[24px] font-bold">OtakuVault</h1>
          </Link>
          <div className="flex flex-row gap-3">
            <Link
              href={"/"}
              className="text-white hover:text-[#000] transition-colors duration-700"
            >
              Anime
            </Link>
            <Link
              href={"/current-season"}
              className="text-white hover:text-[#000] transition-colors duration-700"
            >
              Seasonal
            </Link>
            <Link
              href={"/genre"}
              className="text-white hover:text-[#000] transition-colors duration-700"
            >
              Genre
            </Link>
            {/* <Link
              href={"/manga"}
              className="text-white hover:text-[#000] transition-colors duration-700"
            >
              Manga
            </Link> */}
          </div>
          <button
            onClick={handleSearchBar}
            className="transition-all duration-700 ease-in-out relative"
          >
            {searchBar ? (
              <span
                className={`text-white transition-opacity duration-700 ease-in-out transform ${
                  searchBar ? "opacity-100" : "opacity-0"
                }`}
              >
                <IoCloseSharp color="white" size={24} />
              </span>
            ) : (
              <span
                className={`text-white transition-opacity duration-700 ease-in-out transform ${
                  searchBar ? "opacity-0" : "opacity-100"
                }`}
              >
                <IoSearch color="white" size={24} />
              </span>
            )}
          </button>
        </div>
      </nav>
      {searchBar && (
        <div className="w-full fixed top-[68px] left-0 max-w-full h-screen bg-[#000000]/50 py-3 flex justify-center items-start z-50">
          <SearchBar setSearchBar={setSearchBar} />
        </div>
      )}
    </div>
  );
}

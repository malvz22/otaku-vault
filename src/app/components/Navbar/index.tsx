"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
  const [searchBar, setSearchBar] = useState(false);
  const [sideBar, setSidebar] = useState(false);
  const handleSideBar = () => {
    setSidebar(!sideBar);
    setSearchBar(false);
  };

  const handleSearchBar = () => {
    setSearchBar(!searchBar);
    setSidebar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex flex-col sticky top-0 left-0 z-50">
      <nav className=" bg-[#1E90FF] text-black py-4  w-full max-w-full">
        <div className="flex flex-row justify-between items-center w-full max-w-[1024px] mx-auto px-4 gap-4">
          <Link href={"/"}>
            <h1 className="text-white text-[24px] font-bold">OtakuVault</h1>
          </Link>
          <div className="hidden md:flex flex-row gap-3 w-full max-w-full justify-start">
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
          <div className="flex flex-row gap-3">
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
            <button className="flex md:hidden" onClick={handleSideBar}>
              <span className="text-white transition-opacity duration-700 ease-in-out transform">
                <RxHamburgerMenu color="white" size={24} />
              </span>
            </button>
          </div>
        </div>
      </nav>
      {searchBar && (
        <div className="w-full fixed top-[68px] left-0 max-w-full h-screen bg-[#000000]/50 py-3 flex justify-center items-start z-50">
          <SearchBar setSearchBar={setSearchBar} />
        </div>
      )}
      {sideBar && (
        <div className="w-full fixed top-[68px] left-0 max-w-full h-screen bg-[#191A1F] py-3 px-3 flex flex-col z-50">
          <Link
            href={"/"}
            className="text-white hover:text-[#1E90FF] transition-colors duration-700"
            onClick={() => setSidebar(false)}
          >
            Anime
          </Link>
          <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2 my-2" />
          <Link
            href={"/current-season"}
            className="text-white hover:text-[#1E90FF] transition-colors duration-700"
            onClick={() => setSidebar(false)}
          >
            Seasonal
          </Link>
          <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2 my-2" />
          <Link
            href={"/genre"}
            className="text-white hover:text-[#1E90FF] transition-colors duration-700"
            onClick={() => setSidebar(false)}
          >
            Genre
          </Link>
        </div>
      )}
    </div>
  );
}

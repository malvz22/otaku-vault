"use client";

import Link from "next/link";
import SearchBar from "./SearchBar";
import { IoCloseSharp, IoSearch } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";
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
      <nav className=" bg-[#1E90FF] text-black w-full max-w-full py-3 md:py-0">
        <div className="flex flex-row justify-between items-center w-full max-w-[1024px] mx-auto px-4 gap-4">
          <Link href={"/"}>
            <h1 className="text-white text-[24px] font-extrabold website-icon leading-none">
              OtakuVault
            </h1>
          </Link>
          <div className="hidden md:flex flex-row w-full max-w-full justify-start">
            <div className="relative group py-4 px-2 text-white hover:bg-[#2e2e30]">
              <p>Anime</p>

              <nav className="absolute top-full left-0 mt-0 flex-col hidden group-hover:flex">
                <Link
                  href={"/anime/popular"}
                  className="bg-[#2e2e30] text-white w-48 py-2 hover:bg-white hover:text-black px-2"
                >
                  Most Popular Anime
                </Link>
                <Link
                  href={"/current-season"}
                  className="bg-[#2e2e30] text-white w-48 py-2 hover:bg-white hover:text-black px-2"
                >
                  Seasonal Anime
                </Link>
                <Link
                  href={"/anime/genre"}
                  className="bg-[#2e2e30] text-white w-48 py-2 hover:bg-white hover:text-black px-2"
                >
                  All Anime Genres
                </Link>
              </nav>
            </div>
            <div className="relative group py-4 px-2 text-white hover:bg-[#2e2e30]">
              <p>Manga</p>

              <nav className="absolute top-full left-0 mt-0 flex-col hidden group-hover:flex">
                <Link
                  href={"/manga/popular"}
                  className="bg-[#2e2e30] text-white w-48 py-2 hover:bg-white hover:text-black px-2"
                >
                  Most Popular Manga
                </Link>
                <Link
                  href={"/manga/genre"}
                  className="bg-[#2e2e30] text-white w-48 py-2 hover:bg-white hover:text-black px-2"
                >
                  All Manga Genres
                </Link>
              </nav>
            </div>
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
        <div className="w-full fixed top-[48px] md:top-[56px] left-0 max-w-full h-screen bg-[#000000]/50 py-3 flex justify-center items-start z-50">
          <SearchBar setSearchBar={setSearchBar} />
        </div>
      )}
      {sideBar && (
        <div className="w-full fixed top-[48px] md:top-[56px] left-0 max-w-full h-screen bg-[#191A1F] py-3 px-3 flex flex-col z-50">
          {/* Anime */}
          <details className="group">
            <summary className="flex flex-col">
              <div className="flex flex-row justify-between items-center text-lg font-semibold text-white">
                <p>Anime</p>
                <IoIosArrowForward className="group-open:rotate-90 transform transition-transform duration-300" />
              </div>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-1 my-1" />
            </summary>

            <div className="flex flex-col">
              <Link
                href={"/anime/popular"}
                className="text-white hover:text-[#1E90FF] transition-colors duration-700"
                onClick={() => setSidebar(false)}
              >
                Most Popular Anime
              </Link>

              <Link
                href={"/current-season"}
                className="text-white hover:text-[#1E90FF] transition-colors duration-700"
                onClick={() => setSidebar(false)}
              >
                Seasonal Anime
              </Link>
              <Link
                href={"/anime/genre"}
                className="text-white hover:text-[#1E90FF] transition-colors duration-700"
                onClick={() => setSidebar(false)}
              >
                All Anime Genres
              </Link>
            </div>
          </details>
          {/* Manga */}
          <details className="group">
            <summary className="flex flex-col">
              <div className="flex flex-row justify-between items-center text-lg font-semibold text-white">
                <p>Manga</p>
                <IoIosArrowForward className="group-open:rotate-90 transform transition-transform duration-300" />
              </div>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-1 my-1" />
            </summary>

            <div className="flex flex-col">
              <Link
                href={"/manga/popular"}
                className="text-white hover:text-[#1E90FF] transition-colors duration-700"
                onClick={() => setSidebar(false)}
              >
                Most Popular Manga
              </Link>
              <Link
                href={"/manga/genre"}
                className="text-white hover:text-[#1E90FF] transition-colors duration-700"
                onClick={() => setSidebar(false)}
              >
                All Manga Genres
              </Link>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

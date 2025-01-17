"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

const SearchBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const handleSearchInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const keyword = searchRef.current?.value;
    router.push(`/search/${keyword}`);
  };
  return (
    <div className="relative w-full md:w-[250px]">
      <input
        className="w-full p-3 rounded-md border-solid border-[1px] border-black"
        placeholder="search anime..."
        ref={searchRef}
      />
      <button className="absolute top-3 end-3" onClick={handleSearchInput}>
        <HiOutlineMagnifyingGlass size={24} />
      </button>
    </div>
  );
};

export default SearchBar;

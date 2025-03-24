import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className=" bg-[#1E90FF] text-black py-4 sticky top-0 z-50 w-full max-w-full">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center w-full max-w-[1024px] mx-auto px-4">
        <Link href={"/"}>
          <h1 className="text-white text-[24px] font-bold">OtakuVault</h1>
        </Link>
        <SearchBar />
      </div>
    </nav>
  );
}

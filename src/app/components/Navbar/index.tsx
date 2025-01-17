import Link from "next/link";
import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row bg-[#1E90FF] text-black md:justify-between items-start md:items-center p-4">
      <Link href={"/"}>
        <h1 className="text-white text-[24px] font-bold">OtakuVault</h1>
      </Link>
      <SearchBar />
    </nav>
  );
}

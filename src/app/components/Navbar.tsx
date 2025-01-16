import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-col md:flex-row bg-[#1E90FF] text-black md:justify-between items-start md:items-center p-4">
      <Link href={"/"}>
        <h1 className="text-white text-[24px] font-bold">OtakuVault</h1>
      </Link>

      <input
        className="w-full md:w-[213px] max-w-full p-3 rounded-md border-solid border-[1px] border-black"
        placeholder="search anime..."
      />
    </nav>
  );
}

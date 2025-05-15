import Link from "next/link";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#191A1F] text-white py-4 items-center w-full max-w-full mx-auto">
      <div className="w-full max-w-[1024px] gap-4 md:gap-0 flex flex-col md:flex-row justify-between items-start mx-auto px-3 pb-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-[24px] font-extrabold website-icon leading-none">
            OtakuVault
          </h1>
          <p className="text-sm text-white/70">
            Your one-stop destination for all things anime and manga.
          </p>
          <div className="flex flex-row gap-4 text-2xl">
            <Link href={"/"}>
              <FaTwitterSquare />
            </Link>
            <Link href={"/"}>
              <FaInstagramSquare />
            </Link>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Anime</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/anime/popular">Most Popular Anime</Link>
              <Link href="/current-season">Seasonal Anime</Link>
              <Link href="/anime/genre">All Anime Genres</Link>
            </nav>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Manga</h2>
            <nav className="flex flex-col gap-2">
              <Link href="/manga/popular">Most Popular Manga</Link>
              <Link href="/manga/genre">All Manga Genres</Link>
            </nav>
          </div>
        </div>
      </div>
      <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
      <div className="w-full max-w-[1024px] mx-auto flex flex-col md:flex-row justify-center items-center px-4">
        <p className="text-[16px]">Copyright © 2021 OtakuVault</p>
      </div>
    </footer>
  );
};

export default Footer;

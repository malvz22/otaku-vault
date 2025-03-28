import Link from "next/link";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#191A1F] text-white py-4  items-center w-full max-w-full mx-auto">
      <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
      <div className="flex flex-col md:flex-row justify-between items-center px-4">
        <div>© 2021 OtakuVault</div>
        <nav className="flex flex-row gap-4 mb-2">
          <Link href="/">Home</Link>
          <Link href="/">Search Anime</Link>
          <Link href="/popular">Most Popular</Link>
          <Link href="/current-season">Seasonal</Link>
        </nav>
        <div className="flex flex-row gap-4">
          <Link href={"/"}>
            <FaTwitterSquare />
          </Link>
          <Link href={"/"}>
            <FaInstagramSquare />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

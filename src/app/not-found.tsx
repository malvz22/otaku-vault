import Link from "next/link";
import { LuFileSearch } from "react-icons/lu";

const Page = () => {
  return (
    <div className="min-h-screen max-w-xl mx-auto flex flex-col justify-center items-center gap-3">
      <div className="flex flex-row justify-center items-center gap-3">
        <LuFileSearch size={48} />
        <h1 className="text-[48px] font-bold">NOT FOUND</h1>
      </div>
      <Link href={"/"}>
        <h1 className="text-[24px] font-semibold hover:text-[#1E90FF] transition-colors duration-700">
          Return
        </h1>
      </Link>
    </div>
  );
};

export default Page;

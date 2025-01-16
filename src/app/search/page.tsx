import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col px-3 w-full max-w-full">
      <div className="flex flex-row justify-between items-center pt-8 pb-4">
        <h1 className="font-bold">Search Page</h1>
      </div>
      <div className="w-full max-w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        <div className="w-full max-w-full h-[256px] border-solid border-2 border-white"></div>
      </div>
    </div>
  );
}

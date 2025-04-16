import AnimeList from "@/app/components/AnimeList";
import Header from "@/app/components/AnimeList/Header";
import { getAnimeResponse } from "@/app/libraries/api-library";
import Link from "next/link";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: {
    page?: number;
  };
}

const Page = async ({ params, searchParams }: PageProps) => {
  const id = (await params).id;
  const page = Number(searchParams.page) || 1;

  const animeData = await getAnimeResponse({
    resource: `anime`,
    query: `genres=${id}&page=${page}`,
  });

  console.log(animeData);

  return (
    <main className="flex flex-col px-3 w-full max-w-[1024px] mx-auto pb-3">
      <Header title={`Anime Genre ID: ${id}`} linkHref={""} linkTitle={""} />
      <AnimeList api={animeData} />
      <div className="flex flex-row gap-2 justify-center items-center py-4 px-2 text-2xl">
        <Link
          href={`/genre/${id}?page=1`}
          className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
            page === 1 ? `opacity-50` : `opacity-100`
          }`}
        >
          <MdKeyboardDoubleArrowLeft />
        </Link>
        <Link
          href={`/genre/${id}?page=${page - 1}`}
          className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
            page === 1 ? `opacity-50` : `opacity-100`
          }`}
        >
          <MdKeyboardArrowLeft />
        </Link>
        <p>
          {page} of {animeData.pagination?.last_visible_page}{" "}
        </p>
        <Link
          href={`/genre/${id}?page=${page + 1}`}
          className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
            page === animeData.pagination?.last_visible_page
              ? `opacity-50`
              : `opacity-100`
          }`}
        >
          <MdKeyboardArrowRight />
        </Link>
        <Link
          href={`/genre/${id}?page=${animeData.pagination?.last_visible_page}`}
          className={`transition-all hover:text-[#1E90FF] duration-700 text-4xl ${
            page === animeData.pagination?.last_visible_page
              ? `opacity-50`
              : `opacity-100`
          }`}
        >
          <MdKeyboardDoubleArrowRight />
        </Link>
      </div>
    </main>
  );
};

export default Page;

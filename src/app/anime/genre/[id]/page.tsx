import AnimeList from "@/app/components/AnimeList";
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
  searchParams: Promise<{ page: number }>;
}

const Page = async ({ params, searchParams }: PageProps) => {
  // const id = (await params).id;
  const { id } = await params;
  // const page = Number(searchParams.page) || 1;
  const { page } = await searchParams;

  const animeData = await getAnimeResponse({
    resource: `anime`,
    query: `genres=${id}&page=${page}`,
  });

  // const genreData = await getDataResponse({
  //   resource: `genres/anime/`,
  // });

  // const genreId = Number(params.id);

  // const genreName =
  //   genreData.data.find((genre) => genre.mal_id === genreId)?.name || "Unknown";

  return (
    <main className="flex flex-col px-3 w-full max-w-[1024px] mx-auto pb-3 py-5">
      {/* <Header title={`${genreName}`} linkHref={""} linkTitle={""} /> */}
      <AnimeList api={animeData} type="anime" />
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

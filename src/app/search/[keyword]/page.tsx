//import AnimeList from "@/app/components/AnimeList";
import Image from "next/image";
import Header from "@/app/components/AnimeList/Header";
import { getAnimeResponse } from "@/app/libraries/api-library";
import Link from "next/link";

interface ApiResponse {
  data: Data[];
}

interface Data {
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
}

const Home = async ({ params }: { params: Promise<{ keyword: string }> }) => {
  const keyword = (await params).keyword;
  const decodedKeyword = decodeURI(keyword);
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${decodedKeyword}`
  // );
  // const searchAnime: ApiResponse = await response.json();

  const searchAnime: ApiResponse = await getAnimeResponse({
    resource: `anime`,
    query: `q=${decodedKeyword}`,
  });

  const searchAnimeArray = searchAnime.data;

  return (
    <>
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header
          title={`Search result for "${decodedKeyword}"`}
          linkHref=""
          linkTitle=""
        />
        {/* <AnimeList api={searchAnimeArray} /> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {searchAnimeArray.map((anime: Data) => {
            return (
              <Link
                key={anime.mal_id}
                href={`/anime/${anime.mal_id}`}
                className="cursor-pointer"
                id={anime.mal_id}
              >
                <div className="w-full max-w-full flex flex-col gap-[5px] hover:text-[#1E90FF] transition-all duration-700">
                  <Image
                    src={anime.images.webp.image_url}
                    alt="..."
                    width={350}
                    height={400}
                    className="rounded-md overflow-hidden w-full max-h-64 object-cover"
                  />
                  <p className="text-md md:text-xl font-bold">{anime.title}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;

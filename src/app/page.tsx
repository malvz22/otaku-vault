/* eslint-disable react/jsx-key */
import Link from "next/link";
import AnimeList from "./components/AnimeList/index";
import Header from "./components/AnimeList/Header";
import Image from "next/image";
import {
  getAnimeResponse,
  getRecommendedAnimeResponse,
} from "./libraries/api-library";
import { IoStarSharp, IoThumbsUpSharp } from "react-icons/io5";

interface Data {
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
}

const Home = async () => {
  const topAnime: { data: Data[] } = await getAnimeResponse({
    resource: "top/anime",
    query: "limit=8",
  });

  let recommendedAnime: { data: Data[] } = await getRecommendedAnimeResponse({
    resource: "recommendations/anime",
  });

  // recommendedAnime = { recommendedAnime.slice(0, 4) };

  recommendedAnime = recommendedAnime.slice(0, 8);

  return (
    <>
      {/* most popular anime */}
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header title="Most Popular" linkHref="/popular" linkTitle="View All">
          <IoStarSharp />
        </Header>
        <AnimeList api={topAnime} />
      </section>
      {/* Newest entry */}
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header title="Recommended" linkHref="" linkTitle="">
          <IoThumbsUpSharp />
        </Header>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
          {recommendedAnime.map((anime: Data, index: string) => {
            return (
              <Link
                key={anime.mal_id}
                href={`/anime/${anime.mal_id}`}
                className="cursor-pointer"
                id={index}
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

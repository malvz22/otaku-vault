export const revalidate = 3600;

import AnimeList from "./components/AnimeList/index";
import Header from "./components/AnimeList/Header";
import { getAnimeResponse } from "./libraries/api-library";
import { IoStarSharp } from "react-icons/io5";
import { getCurrentSeasonName } from "./libraries/function";

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
  const currentSeason = await getAnimeResponse({
    resource: "seasons/now",
    query: "limit=8",
  });

  const topAnime: { data: Data[] } = await getAnimeResponse({
    resource: "top/anime",
    query: "limit=8",
  });

  const topManga = await getAnimeResponse({
    resource: "top/manga",
    query: "limit=8",
  });

  // let recommendedAnime = await getNestedAnimeResponse({
  //   resource: "recommendations/anime",
  //   objectProperty: "entry",
  // });

  // recommendedAnime = randomizer(recommendedAnime, 8);

  const seasonName = getCurrentSeasonName();

  return (
    <>
      {/* seasonal anime */}
      <section className="flex flex-col justify-center items-center px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header
          title={`${seasonName} Anime`}
          linkHref="/current-season"
          linkTitle="View More"
        >
          <IoStarSharp />
        </Header>
        <AnimeList api={currentSeason} type="anime" />
      </section>
      {/* most popular anime */}
      <section className="flex flex-col justify-center items-center px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header
          title="Most Popular Anime"
          linkHref="/anime/popular"
          linkTitle="View More"
        >
          <IoStarSharp />
        </Header>
        <AnimeList api={topAnime} type="anime" />
      </section>
      {/* Recommended Anime*/}
      {/* <section className="flex flex-col px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header title="Recommended Anime" linkHref="" linkTitle="">
          <IoThumbsUpSharp />
        </Header>
        <AnimeList api={recommendedAnime} />
      </section> */}
      {/* most popular anime */}
      <section className="flex flex-col justify-center items-center px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header
          title="Most Popular Manga"
          linkHref="/manga/popular"
          linkTitle="View More"
        >
          <IoStarSharp />
        </Header>
        <AnimeList api={topManga} type="manga" />
      </section>
    </>
  );
};

export default Home;

export const revalidate = 3600;

import AnimeList from "./components/AnimeList/index";
import Header from "./components/AnimeList/Header";
import {
  getAnimeResponse,
  getNestedAnimeResponse,
  randomizer,
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
  // const seasonsNow = await getAnimeResponse({
  //   resource: "seasons/now",
  //   query: "limit=8",
  // });

  const topAnime: { data: Data[] } = await getAnimeResponse({
    resource: "top/anime",
    query: "limit=20",
  });

  let recommendedAnime = await getNestedAnimeResponse({
    resource: "recommendations/anime",
    objectProperty: "entry",
  });

  recommendedAnime = randomizer(recommendedAnime, 11);

  return (
    <>
      {/* <section className="flex flex-col justify-center items-center px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header
          title="Current Season"
          linkHref="/current-season"
          linkTitle="View More"
        >
          <IoStarSharp />
        </Header>
        <AnimeList api={seasonsNow} />
      </section> */}
      {/* most popular anime */}
      <section className="flex flex-col justify-center items-center px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header title="Most Popular" linkHref="/popular" linkTitle="View More">
          <IoStarSharp />
        </Header>
        <AnimeList api={topAnime} />
      </section>

      {/* Recommended Anime*/}
      <section className="flex flex-col px-3 w-full max-w-[1024px] mx-auto pb-3">
        <Header title="Recommended" linkHref="" linkTitle="">
          <IoThumbsUpSharp />
        </Header>
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Home;

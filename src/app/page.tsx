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
  const topAnime: { data: Data[] } = await getAnimeResponse({
    resource: "top/anime",
    query: "limit=8",
  });

  let recommendedAnime: { data: Data[] } = await getNestedAnimeResponse({
    resource: "recommendations/anime",
    objectProperty: "entry",
  });

  // recommendedAnime = { recommendedAnime.slice(0, 4) };

  // recommendedAnime = recommendedAnime.slice(0, 8);

  recommendedAnime = randomizer(recommendedAnime, 10);

  // recommendedAnime = genericRandomizer(recommendedAnime, 10);

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
        <AnimeList api={recommendedAnime} />
      </section>
    </>
  );
};

export default Home;

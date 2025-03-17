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

// const randomizer = (data: Data[], gap: number) => {
//   const values = data;

//   const first = ~~(Math.random() * (values.length - gap) + 1);
//   const last = first + gap;

//   const uniqueData = {
//     data: values.slice(first, last).reduce((acc: Data[], index: Data) => {
//       if (!acc.some((entry) => entry.mal_id === index.mal_id)) {
//         acc.push(index);
//       }
//       return acc;
//     }, [] as Data[]),
//   };

//   return uniqueData;
// };

const Home = async () => {
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
      {/* most popular anime */}
      <section className="flex flex-col justify-center items-center px-3 w-full max-w-full pb-3">
        <Header title="Most Popular" linkHref="/popular" linkTitle="View All">
          <IoStarSharp />
        </Header>
        <AnimeList api={topAnime} />
      </section>
      {/* Recommended Anime*/}
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

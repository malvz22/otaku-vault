/* eslint-disable react/jsx-key */
import Link from "next/link";
import AnimeList from "./components/AnimeList/index";
import Header from "./components/AnimeList/Header";

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

const Home = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`
  );
  const topAnime: ApiResponse = await response.json();
  // const response2 = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`
  // );
  // const newAnime = await response.json();
  return (
    <>
      {/* most popular anime */}
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header title="Most Popular" linkHref="/popular" linkTitle="View All" />
        <AnimeList api={topAnime} />
      </section>
      {/* Newest entry */}
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header title="Newest" linkHref="/new" linkTitle="View All" />
        <AnimeList api={topAnime} />
      </section>
    </>
  );
};

export default Home;

/* eslint-disable react/jsx-key */
import Link from "next/link";
import AnimeList from "./components/AnimeList/index";
import Header from "./components/AnimeList/Header";
import { getAnimeResponse } from "./libraries/api-library";
import { useEffect, useState } from "react";

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
  api: string;
}

const Home = async () => {
  // const [topAnime, setTopAnime] = useState<Data[]>([]);
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`
  // );
  // const topAnime: ApiResponse = await response.json();

  const topAnime: { data: Data[] } = await getAnimeResponse({
    resource: "top/anime",
    query: "limit=8",
  });

  // useEffect(() => {
  //   const fetchAnime = async () => {
  //     const data: ApiResponse = await getAnimeResponse({
  //       resource: "top/anime",
  //       query: "limit=8",
  //     });
  //     setTopAnime(data);
  //   };
  //   fetchAnime();
  // }, []);

  console.log(topAnime);

  return (
    <>
      {/* most popular anime */}
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header title="Most Popular" linkHref="/popular" linkTitle="View All" />
        <AnimeList api={topAnime} />
      </section>
      {/* Newest entry */}
    </>
  );
};

export default Home;

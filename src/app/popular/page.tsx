/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useEffect, useState } from "react";
import HeaderMenu from "../components/Utilities/HeaderMenu";
import Pagination from "../components/Utilities/Pagination";
import AnimeList from "../components/AnimeList";
import Link from "next/link";
import Image from "next/image";

interface ApiResponse {
  data: Data[];
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
  };
}

interface Data {
  title: string;
  url: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
}

const Page = () => {
  const [page, setPage] = useState(1);
  const [topAnime, setTopAnime] = useState<Data[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?page=${page}`
        );
        // const { data }: { data: Data[] } = await response.json();
        const { data }: ApiResponse = await response.json();
        console.log("fetched API Response:", data);
        setTopAnime(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page]);

  console.log(topAnime);
  console.log(Array.isArray(topAnime));

  return (
    <div className="flex flex-col px-3 w-full max-w-full pb-3">
      <HeaderMenu />
      {/* <AnimeList api={topAnime} /> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {topAnime.map((anime: Data, index: string) => {
          return (
            <Link
              key={anime.mal_id}
              href={`/${anime.mal_id}`}
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

      <Pagination />
    </div>
  );
};

export default Page;

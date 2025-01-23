/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useEffect, useState } from "react";
import HeaderMenu from "../components/Utilities/HeaderMenu";
import Pagination from "../components/Utilities/Pagination";
import Link from "next/link";
import Image from "next/image";
import { getAnimeResponse } from "../libraries/api-library";

interface ApiResponse {
  data: Data[];
  pagination: Pagination;
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

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
}

const Page = () => {
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState<Pagination | null>(null);
  const [topAnime, setTopAnime] = useState<Data[]>([]);

  const fetchData = async () => {
    try {
      const { data, pagination }: ApiResponse = await getAnimeResponse({
        resource: `top/anime`,
        query: `page=${page}`,
      });
      setTopAnime(data);
      setPaginationData(pagination);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="flex flex-col px-3 w-full max-w-full pb-3 justify-center items-center">
      <HeaderMenu title={`Most Popular Anime Page #${page}`} />
      {/* <AnimeList api={topAnime} /> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {topAnime.map((anime: Data) => {
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

      <Pagination
        page={page}
        lastPage={paginationData?.last_visible_page || 0}
        setPage={setPage}
      />
    </div>
  );
};

export default Page;

/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useEffect, useState } from "react";
import HeaderMenu from "../../components/Utilities/HeaderMenu";
import Pagination from "../../components/Utilities/Pagination";
import Link from "next/link";
import Image from "next/image";
import { getAnimeResponse } from "../../libraries/api-library";

interface Data {
  title: string;
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
      const response = await getAnimeResponse({
        resource: `top/anime`,
        query: `page=${page}`,
      });
      const { data, pagination } = response;
      setTopAnime(data);
      setPaginationData(pagination || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  return (
    <div className="flex flex-col px-3 w-full max-w-[1024px] mx-auto pb-3 justify-center items-center">
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
                <div className="w-full max-w-full aspect-[16/22] relative rounded-md overflow-hidden">
                  <Image
                    src={anime.images.webp.image_url}
                    alt="..."
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-110 transition-all duration-700"
                  />
                </div>

                <p className="text-md md:text-xl font-bold truncate">
                  {anime.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <Pagination
        page={page}
        lastPage={paginationData?.last_visible_page || 1}
        setPage={setPage}
      />
    </div>
  );
};

export default Page;

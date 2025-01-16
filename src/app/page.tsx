/* eslint-disable react/jsx-key */
import Image from "next/image";
import Link from "next/link";
import AnimeList from "./components/AnimeList";

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
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime`
  );

  const anime = await response.json();

  return (
    <div className="flex flex-col px-3 w-full max-w-full">
      <div className="flex flex-row justify-between items-center pt-8 pb-4">
        <h1 className="font-bold">Most Popular</h1>
        <Link href={"/search"}>
          <p>View All</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
        {anime.data.map((data: Data) => (
          <div key={data.mal_id}>
            <AnimeList title={data.title} images={data.images.webp.image_url} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

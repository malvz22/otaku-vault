import Image from "next/image";
import Link from "next/link";

interface Data {
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
  id: string;
  api: string;
}

const AnimeList: React.FC<Data> = ({ api }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4">
      {api.data.map((anime: Data) => {
        return (
          <Link
            key={anime.mal_id}
            href={`/${anime.mal_id}`}
            className="cursor-pointer"
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
  );
};

export default AnimeList;

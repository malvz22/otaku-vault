import Image from "next/image";
import Link from "next/link";

interface AnimeListProps {
  api: { data: Data[] };
  type: string;
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

const AnimeList: React.FC<AnimeListProps> = ({ api, type }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4">
      {api.data?.map((anime: Data) => {
        return (
          <Link
            key={anime.mal_id}
            href={`/${type}/${anime.mal_id}`}
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
                  sizes="100%"
                  priority={true}
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
  );
};

export default AnimeList;

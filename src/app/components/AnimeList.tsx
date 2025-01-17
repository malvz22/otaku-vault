import Image from "next/image";
import Link from "next/link";

interface Data {
  title: string;
  images: string;
  id: string;
}

const AnimeList = ({ title, images, id }: Data) => {
  return (
    <Link href={`/${id}`} className="cursor-pointer">
      <div className="w-full max-w-full flex flex-col gap-[5px] hover:text-[#1E90FF] transition-all duration-700">
        <Image
          src={images}
          alt="..."
          width={350}
          height={400}
          className="rounded-md overflow-hidden w-full max-h-64 object-cover"
        />
        <p className="text-md md:text-xl font-bold">{title}</p>
      </div>
    </Link>
  );
};

export default AnimeList;

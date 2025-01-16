import Image from "next/image";

interface Data {
  title: string;
  images: string;
}

const AnimeList = ({ title, images }: Data) => {
  return (
    <div className="w-full max-w-full flex flex-col gap-[5px] hover:text-[#1E90FF] transition-all duration-700">
      <div className="w-full max-w-full h-[300px] relative rounded-md overflow-hidden">
        <Image src={images} alt="..." fill objectFit="cover" />
      </div>
      <p className="text-[20px] font-bold">{title}</p>
    </div>
  );
};

export default AnimeList;

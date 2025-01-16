import Image from "next/image";

interface Data {
  title: string;
  images: string;
}

const AnimeList = ({ title, images }: Data) => {
  return (
    <div className="w-full max-w-full flex flex-col gap-[5px]">
      <div className="w-full max-w-full h-[256px] relative">
        <Image src={images} alt="..." fill objectFit="cover" />
      </div>
      <p className="text-[20px]">{title}</p>
    </div>
  );
};

export default AnimeList;

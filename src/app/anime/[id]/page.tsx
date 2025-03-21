import VideoPlayer from "@/app/components/Utilities/VideoPlayer";
import { getAnimeResponseObject } from "@/app/libraries/api-library";
import Image from "next/image";

// interface ApiResponse {
//   data: Data[];
// }

// try {
//   const animeData: {data: Data[]} = await getAnimeResponse({
//     resource: `anime/${id}`,
//   });
//   console.log(animeData);
// } catch (error) {
//   console.error("Failed to fetch data:", error);
//   return <div>Error loading anime data.</div>;
// }

interface Data {
  mal_id: string;
  title: string;
  year: number;
  score: number;
  rank: number;
  popularity: number;
  episodes: number;
  images: {
    webp: {
      image_url: string;
    };
  };
  synopsis: string;
  trailer: {
    youtube_id: string;
  };
}

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const animeData: { data: Data } = await getAnimeResponseObject({
    resource: `anime/${id}`,
  });

  if (!animeData?.data) {
    return <div>No anime data found.</div>;
  }

  return (
    <main className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="pt-4 px-4">
        <h3 className="text-2xl text-white">
          {animeData.data.title} - {animeData.data.year}
        </h3>
      </div>
      <div className="pt-4 px-4 flex gap-2 text-white overflow-x-auto">
        <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
          <h3>SCORE</h3>
          <p>{animeData.data.score}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
          <h3>RANKED</h3>
          <p>#{animeData.data.rank}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
          <h3>POPULARITY</h3>
          <p>#{animeData.data.popularity}</p>
        </div>
        <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
          <h3>EPISODES</h3>
          <p>{animeData.data.episodes}</p>
        </div>
      </div>
      <div className="pt-4 px-4 flex md:flex-nowrap flex-wrap gap-2 text-white">
        <div className="relative w-full max-w-full md:max-w-[400px] aspect-[16/22] rounded-md overflow-hidden">
          <Image
            src={animeData.data.images.webp.image_url}
            alt="..."
            fill
            style={{ objectFit: "cover" }}
            className=""
          />
        </div>
        <div className="flex flex-col w-full max-w-[600px]">
          <p className="font-semibold text-2xl mb-1">Synopsis</p>
          <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
          <p className="text-justify text-xl">{animeData.data.synopsis}</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <VideoPlayer youtubeId={animeData.data.trailer.youtube_id} />
      </div>
    </main>
  );
};

export default Page;

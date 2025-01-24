import VideoPlayer from "@/app/components/Utilities/VideoPlayer";
import { getAnimeResponse } from "@/app/libraries/api-library";
import Image from "next/image";

interface ApiResponse {
  data: Data;
}

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

// export async function generateStaticParams() {
//   try {
//     const animeList = await getAnimeResponse({ resource: "anime" });

//     return animeList.map((anime: Data) => ({
//       id: anime.mal_id.toString(),
//     }));
//   } catch (error) {
//     console.error("Failed to fetch anime list for static params");
//     return [];
//   }
// }

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  //   const id = await params.id;
  const { id } = await params;

  let animeData: ApiResponse | null = null;

  try {
    animeData = await getAnimeResponse({
      resource: `anime/${id}`,
    });
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return <div>Error loading anime data.</div>;
  }

  if (!animeData?.data) {
    return <div>No anime data found.</div>;
  }

  return (
    <>
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
        <Image
          src={animeData.data.images.webp.image_url}
          alt="..."
          width={250}
          height={300}
          className="w-full md:min-w-[300px] h-auto rounded object-cover overflow-hidden"
        />
        <p className="text-justify text-xl">{animeData.data.synopsis}</p>
      </div>
      <div className="flex justify-center items-center">
        <VideoPlayer youtubeId={animeData.data.trailer.youtube_id} />
      </div>
    </>
  );
};

export default Page;

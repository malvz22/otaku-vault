import VideoPlayerPage from "@/app/components/Utilities/VideoPlayerPage";
import { getAnimeResponseObject } from "@/app/libraries/api-library";
import Image from "next/image";
import Link from "next/link";

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

// interface Data {
//   mal_id: string;
//   title: string;
//   year: number;
//   score: number;
//   rank: number;
//   popularity: number;
//   episodes: number;
//   images: {
//     webp: {
//       image_url: string;
//     };
//   };
//   synopsis: string;
//   trailer: {
//     youtube_id: string;
//   };
//   titles: {
//     type: string;
//     title: string;
//   };
// }

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const animeData = await getAnimeResponseObject({
    resource: `anime/${id}`,
  });

  const relations = await getAnimeResponseObject({
    resource: `anime/${id}/relations`,
  });

  if (!animeData?.data) {
    return <div>No anime data found.</div>;
  }

  console.log(relations);

  return (
    <main className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="pt-4 px-4">
        <h3 className="text-2xl text-white">
          {animeData.data.title} - {animeData.data.year}
        </h3>
      </div>

      <div className="pt-4 px-4 flex flex-col md:flex-row gap-2 w-full max-w-full text-white">
        <aside className="w-[300px] flex flex-col gap-4">
          <Image
            src={animeData.data.images.webp.image_url}
            alt="..."
            width={500}
            height={0}
            className="w-full md:w-[500px] aspect-[16/22] rounded-md overflow-hidden"
          />

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Alternative Titles</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            {animeData.data.titles.map((title, index) => (
              <div className="flex flex-col" key={index}>
                <p key={index} className="text-lg">
                  <span className="font-semibold">{title.type}:</span>{" "}
                  {title.title}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Information</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">Type:</span>{" "}
                {animeData.data.type}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Episodes:</span>{" "}
                {animeData.data.episodes}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Status:</span>{" "}
                {animeData.data.status}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Aired:</span>{" "}
                {animeData.data.aired.string}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Broadcast:</span>{" "}
                {animeData.data.broadcast.string}
              </p>
              <div className="text-lg">
                <span className="font-semibold">Producers:</span>{" "}
                {animeData.data.producers.map((producer) => (
                  <p key={producer.mal_id}>
                    <Link
                      href={producer.url}
                      key={producer.mal_id}
                      className="text-blue-400 hover:underline"
                    >
                      {producer.name}
                    </Link>{" "}
                  </p>
                ))}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Licensors:</span>{" "}
                {animeData.data.licensors.map((licensor) => (
                  <p key={licensor.mal_id}>
                    <Link
                      href={licensor.url}
                      className="text-blue-400 hover:underline"
                    >
                      {licensor.name}
                    </Link>{" "}
                  </p>
                ))}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Studios:</span>{" "}
                {animeData.data.studios.map((studio) => (
                  <p key={studio.mal_id}>
                    <Link
                      href={studio.url}
                      className="text-blue-400 hover:underline"
                    >
                      {studio.name}
                    </Link>{" "}
                  </p>
                ))}
              </div>
              <p className="text-lg">
                <span className="font-semibold">Source:</span>{" "}
                {animeData.data.source}
              </p>
              <div className="text-lg">
                <span className="font-semibold">Genres:</span>{" "}
                {animeData.data.genres.map((genre) => (
                  <p key={genre.mal_id}>
                    <Link
                      href={genre.url}
                      className="text-blue-400 hover:underline"
                    >
                      {genre.name}
                    </Link>{" "}
                  </p>
                ))}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Themes:</span>{" "}
                {animeData.data.themes.map((theme) => (
                  <p key={theme.mal_id}>
                    <Link
                      href={theme.url}
                      className="text-blue-400 hover:underline"
                    >
                      {theme.name}
                    </Link>{" "}
                  </p>
                ))}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Demographic:</span>{" "}
                {animeData.data.demographics.map((demographic) => (
                  <p key={demographic.mal_id}>
                    <Link
                      href={demographic.url}
                      className="text-blue-400 hover:underline"
                    >
                      {demographic.name}
                    </Link>{" "}
                  </p>
                ))}
              </div>
              <p className="text-lg">
                <span className="font-semibold">Duration:</span>{" "}
                {animeData.data.duration}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Rating:</span>{" "}
                {animeData.data.rating}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Statistics</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">Score:</span>{" "}
                {animeData.data.score}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Ranked:</span>{" "}
                {animeData.data.rank}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Popularity:</span> #
                {animeData.data.popularity}
              </p>
            </div>
          </div>
        </aside>

        <div className="flex flex-col w-full">
          <div className="mb-3 flex gap-2 w-full max-w-full text-white overflow-x-auto">
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
          <VideoPlayerPage youtubeId={animeData.data.trailer.youtube_id} />
          <div>
            <p className="font-semibold text-2xl mb-1">Synopsis</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <p className="text-justify text-xl">{animeData.data.synopsis}</p>
          </div>
          {/* <div>
            <p className="font-semibold text-2xl mb-1">Related Entries</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2"></div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Page;

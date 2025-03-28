export const revalidate = 3600;

import {
  getAnimeResponse,
  getAnimeResponseObject,
} from "@/app/libraries/api-library";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const mangaData = await getAnimeResponseObject({
    resource: `manga/${id}`,
  });

  const relations = await getAnimeResponse({
    resource: `manga/${id}/relations`,
  });

  if (!mangaData?.data) {
    return <div>No manga data found.</div>;
  }

  console.log(mangaData.data);

  return (
    <main className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="pt-4 px-4">
        <h3 className="text-2xl text-white">{mangaData.data.title}</h3>
      </div>

      <div className="pt-4 px-4 flex flex-col md:flex-row gap-2 w-full max-w-full text-white">
        <Image
          src={mangaData.data.images.webp.image_url}
          alt="..."
          width={500}
          height={0}
          className="w-full max-w-full md:hidden aspect-[16/22] rounded-md overflow-hidden"
        />
        <aside className="w-[300px] hidden md:flex flex-col gap-4">
          <Image
            src={mangaData.data.images.webp.image_url}
            alt="..."
            width={500}
            height={0}
            className="w-full md:w-[500px] aspect-[16/22] rounded-md overflow-hidden"
          />

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Alternative Titles</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            {mangaData.data.titles.map((title, index) => (
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
                {mangaData.data.type}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Volumes:</span>{" "}
                {mangaData.data.volumes}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Status:</span>{" "}
                {mangaData.data.status}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Published:</span>{" "}
                {mangaData.data.published.string}
              </p>
              <div className="text-lg">
                <span className="font-semibold">Genres:</span>{" "}
                {mangaData.data.genres.map((genre) => (
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
                {mangaData.data.themes.map((theme) => (
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
                {mangaData.data.demographics.map((demographic) => (
                  <p key={demographic.mal_id}>{demographic.name}</p>
                ))}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Serialization:</span>{" "}
                {mangaData.data.serializations.map((serialization) => (
                  <p key={serialization.mal_id}>{serialization.name}</p>
                ))}
              </div>
              <div className="text-lg">
                <span className="font-semibold">Authors:</span>{" "}
                {mangaData.data.authors.map((author) => (
                  <p key={author.mal_id}>{author.name}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Statistics</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">Score:</span>{" "}
                {mangaData.data.score}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Ranked:</span>{" "}
                {mangaData.data.rank}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Popularity:</span> #
                {mangaData.data.popularity}
              </p>
            </div>
          </div>
        </aside>

        <div className="flex flex-col w-full">
          <div className="mb-3 flex gap-2 w-full max-w-full text-white overflow-x-auto">
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>SCORE</h3>
              <p>{mangaData.data.score}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>RANKED</h3>
              <p>#{mangaData.data.rank}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>POPULARITY</h3>
              <p>#{mangaData.data.popularity}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>EPISODES</h3>
              <p>{mangaData.data.episodes}</p>
            </div>
          </div>
          <div className="mb-3">
            <p className="font-semibold text-xl">Synopsis</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <p className="text-justify text-xl">{mangaData.data.synopsis}</p>
          </div>
          <div className="flex flex-col md:hidden">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Alternative Titles</h3>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              {mangaData.data.titles.map((title, index) => (
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
                  {mangaData.data.type}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Volumes:</span>{" "}
                  {mangaData.data.volumes}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Status:</span>{" "}
                  {mangaData.data.status}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Published:</span>{" "}
                  {mangaData.data.published.string}
                </p>
                <div className="text-lg">
                  <span className="font-semibold">Genres:</span>{" "}
                  {mangaData.data.genres.map((genre) => (
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
                  {mangaData.data.themes.map((theme) => (
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
                  {mangaData.data.demographics.map((demographic) => (
                    <p key={demographic.mal_id}>{demographic.name}</p>
                  ))}
                </div>
                <div className="text-lg">
                  <span className="font-semibold">Serialization:</span>{" "}
                  {mangaData.data.serializations.map((serialization) => (
                    <p key={serialization.mal_id}>{serialization.name}</p>
                  ))}
                </div>
                <div className="text-lg">
                  <span className="font-semibold">Authors:</span>{" "}
                  {mangaData.data.authors.map((author) => (
                    <p key={author.mal_id}>{author.name}</p>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Statistics</h3>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              <div className="flex flex-col">
                <p className="text-lg">
                  <span className="font-semibold">Score:</span>{" "}
                  {mangaData.data.score}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Ranked:</span>{" "}
                  {mangaData.data.rank}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Popularity:</span> #
                  {mangaData.data.popularity}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-semibold text-xl">Related Entries</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col gap-2">
              {relations.data.map((relation, index) => (
                <div key={index}>
                  <p>{relation.relation}</p>
                  {relation.entry.map((entry) => (
                    <div key={entry.mal_id}>
                      <Link
                        className="text-blue-400 hover:underline"
                        href={`/${entry.type}/${entry.mal_id}`}
                      >
                        {entry.name}
                      </Link>{" "}
                      ({entry.type})
                    </div>
                  ))}
                </div>
              ))}

              <div className="flex flex-row gap-2"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;

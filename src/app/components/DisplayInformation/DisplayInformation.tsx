export const revalidate = 3600;

import VideoPlayerPage from "@/app/components/Utilities/VideoPlayerPage";
import { Data } from "@/app/libraries/api-library";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

interface DisplayInformationProps {
  informationData: { data: Data };
  characterData: { data: Data[] };
}

const DisplayInformation: React.FC<DisplayInformationProps> = async ({
  informationData,
  characterData,
}) => {
  if (!informationData?.data) {
    return <div>No Anime or Manga data found.</div>;
  }

  type IconSource = IconType | string;

  const iconMap: Record<string, IconSource> = {
    "x.com": FaSquareXTwitter,
    Twitter: FaTwitter,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    TikTok: FaTiktok,
    Official: FaGlobe,
    YouTube: FaYoutube,
  };

  const limitedCharacterData = characterData.data.slice(0, 10);

  return (
    <main className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="pt-4 px-4 flex flex-row gap-2">
        <h3 className="text-2xl text-white">{informationData.data.title} </h3>
        {informationData.data.year && (
          <h3 className="text-2xl text-white">
            - {informationData.data.year}{" "}
          </h3>
        )}
      </div>

      <div className="pt-4 px-4 flex flex-col md:flex-row gap-2 w-full max-w-full text-white">
        <Image
          src={informationData.data.images.webp.image_url}
          alt="..."
          width={500}
          height={0}
          className="w-full max-w-full md:hidden aspect-[16/22] rounded-md overflow-hidden"
        />
        <aside className="w-[300px] hidden md:flex flex-col gap-4">
          <Image
            src={informationData.data.images.webp.image_url}
            alt="..."
            width={500}
            height={0}
            className="w-full md:w-[500px] aspect-[16/22] rounded-md overflow-hidden"
          />

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Alternative Titles</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            {informationData.data.titles.map((title, index) => (
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
              {informationData.data.type && (
                <p className="text-lg">
                  <span className="font-semibold">Type:</span>{" "}
                  {informationData.data.type}
                </p>
              )}
              {informationData.data.volumes && (
                <p className="text-lg">
                  <span className="font-semibold">Volumes:</span>{" "}
                  {informationData.data.volumes}
                </p>
              )}
              {informationData.data.chapters && (
                <p className="text-lg">
                  <span className="font-semibold">Chapters:</span>{" "}
                  {informationData.data.chapters}
                </p>
              )}
              {informationData.data.episodes && (
                <p className="text-lg">
                  <span className="font-semibold">Episodes:</span>{" "}
                  {informationData.data.episodes}
                </p>
              )}
              {informationData.data.status && (
                <p className="text-lg">
                  <span className="font-semibold">Status:</span>{" "}
                  {informationData.data.status}
                </p>
              )}
              {informationData.data.aired?.string && (
                <p className="text-lg">
                  <span className="font-semibold">Aired:</span>{" "}
                  {informationData.data.aired.string}
                </p>
              )}
              {informationData.data.broadcast?.string && (
                <p className="text-lg">
                  <span className="font-semibold">Broadcast:</span>{" "}
                  {informationData.data.broadcast.string}
                </p>
              )}
              {informationData.data.producers &&
                informationData.data.producers.length > 0 && (
                  <div className="text-lg">
                    <span className="font-semibold">Producers:</span>{" "}
                    {informationData.data.producers.map((producer) => (
                      <p key={producer.mal_id}>
                        <Link
                          href={`producer/${producer.mal_id}`}
                          key={producer.mal_id}
                          className="text-blue-400 hover:underline"
                        >
                          {producer.name}
                        </Link>{" "}
                      </p>
                    ))}
                  </div>
                )}
              {informationData.data.licensors &&
                informationData.data.licensors.length > 0 && (
                  <div className="text-lg">
                    <span className="font-semibold">Licensors:</span>{" "}
                    {informationData.data.licensors.map((licensor) => (
                      <p key={licensor.mal_id}>
                        <Link
                          href={`producer/${licensor.mal_id}`}
                          className="text-blue-400 hover:underline"
                        >
                          {licensor.name}
                        </Link>{" "}
                      </p>
                    ))}
                  </div>
                )}
              {informationData.data.studios &&
                informationData.data.studios.length > 0 && (
                  <div className="text-lg">
                    <span className="font-semibold">Studios:</span>{" "}
                    {informationData.data.studios.map((studio) => (
                      <p key={studio.mal_id}>
                        <Link
                          href={`producer/${studio.mal_id}`}
                          className="text-blue-400 hover:underline"
                        >
                          {studio.name}
                        </Link>{" "}
                      </p>
                    ))}
                  </div>
                )}
              {informationData.data.source && (
                <p className="text-lg">
                  <span className="font-semibold">Source:</span>{" "}
                  {informationData.data.source}
                </p>
              )}

              {informationData.data.genres &&
                informationData.data.genres.length > 0 && (
                  <div className="text-lg">
                    <span className="font-semibold">Genres:</span>{" "}
                    {informationData.data.genres.map((genre) => (
                      <Link
                        href={`/genre/${genre.mal_id}?page=1`}
                        key={genre.mal_id}
                        className="text-blue-400 hover:underline"
                      >
                        {genre.name}{" "}
                      </Link>
                    ))}
                  </div>
                )}

              {informationData.data.themes &&
                informationData.data.themes.length > 0 && (
                  <div className="text-lg">
                    <span className="font-semibold">Themes:</span>{" "}
                    {informationData.data.themes.map((theme) => (
                      <p key={theme.mal_id}>
                        <Link
                          href={theme.url}
                          className="text-blue-400 hover:underline"
                          target="_blank"
                        >
                          {theme.name}
                        </Link>{" "}
                      </p>
                    ))}
                  </div>
                )}

              {informationData.data.demographics &&
                informationData.data.demographics.length > 0 && (
                  <div className="text-lg">
                    <span className="font-semibold">Demographic:</span>{" "}
                    {informationData.data.demographics.map((demographic) => (
                      <p key={demographic.mal_id}>
                        <Link
                          href={demographic.url}
                          className="text-blue-400 hover:underline"
                          target="_blank"
                        >
                          {demographic.name}
                        </Link>{" "}
                      </p>
                    ))}
                  </div>
                )}
              {informationData.data.duration && (
                <p className="text-lg">
                  <span className="font-semibold">Duration:</span>{" "}
                  {informationData.data.duration}
                </p>
              )}
              {informationData.data.rating && (
                <p className="text-lg">
                  <span className="font-semibold">Rating:</span>{" "}
                  {informationData.data.rating}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Statistics</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">Score:</span>{" "}
                {informationData.data.score}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Ranked:</span>{" "}
                {informationData.data.rank}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Popularity:</span> #
                {informationData.data.popularity}
              </p>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-xl font-semibold">Available At</h3>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col">
              {informationData.data.external.map((external, index) => {
                const Icon =
                  iconMap[external.name as keyof typeof iconMap] || FaGlobe;
                return (
                  <div className="flex flex-row gap-1 items-center" key={index}>
                    <Icon />
                    <Link
                      href={external.url}
                      className="text-blue-400 hover:underline text-lg"
                      target="_blank"
                    >
                      {external.name}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          {informationData.data.streaming && (
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Streaming Platform</h3>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              <div className="flex flex-col">
                {informationData.data.streaming.map((streaming, index) => {
                  const Icon =
                    iconMap[streaming.name as keyof typeof iconMap] || FaGlobe;
                  return (
                    <div
                      className="flex flex-row gap-1 items-center"
                      key={index}
                    >
                      <Icon />
                      <Link
                        href={streaming.url}
                        className="text-blue-400 hover:underline text-lg"
                        target="_blank"
                      >
                        {streaming.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        <div className="flex flex-col w-full">
          <div className="mb-3 flex gap-2 w-full max-w-full text-white overflow-x-auto">
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>SCORE</h3>
              <p>{informationData.data.score}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>RANKED</h3>
              <p>#{informationData.data.rank}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>POPULARITY</h3>
              <p>#{informationData.data.popularity}</p>
            </div>
            <div className="w-36 flex flex-col justify-center items-center rounded border-white border-solid border-[1px] p-2">
              <h3>EPISODES</h3>
              <p>{informationData.data.episodes}</p>
            </div>
          </div>
          {informationData.data.trailer && (
            <VideoPlayerPage
              youtubeId={informationData.data.trailer.youtube_id}
            />
          )}

          <div className="mb-3">
            <p className="font-semibold text-2xl mb-1">Synopsis</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <p className="text-justify text-xl">
              {informationData.data.synopsis}
            </p>
          </div>
          <div className="flex flex-col md:hidden">
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Alternative Titles</h3>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              {informationData.data.titles.map((title, index) => (
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
                  {informationData.data.type}
                </p>
                {informationData.data.episodes && (
                  <p className="text-lg">
                    <span className="font-semibold">Episodes:</span>{" "}
                    {informationData.data.episodes}
                  </p>
                )}
                {informationData.data.status && (
                  <p className="text-lg">
                    <span className="font-semibold">Status:</span>{" "}
                    {informationData.data.status}
                  </p>
                )}
                {informationData.data.aired?.string && (
                  <p className="text-lg">
                    <span className="font-semibold">Aired:</span>{" "}
                    {informationData.data.aired.string}
                  </p>
                )}

                {informationData.data.broadcast?.string && (
                  <p className="text-lg">
                    <span className="font-semibold">Broadcast:</span>{" "}
                    {informationData.data.broadcast.string}
                  </p>
                )}
                {informationData.data.producers &&
                  informationData.data.producers.length > 0 && (
                    <div className="text-lg">
                      <span className="font-semibold">Producers:</span>{" "}
                      {informationData.data.producers.map((producer) => (
                        <p key={producer.mal_id}>
                          <Link
                            href={`producer/${producer.mal_id}`}
                            key={producer.mal_id}
                            className="text-blue-400 hover:underline"
                          >
                            {producer.name}
                          </Link>{" "}
                        </p>
                      ))}
                    </div>
                  )}
                {informationData.data.licensors &&
                  informationData.data.licensors.length > 0 && (
                    <div className="text-lg">
                      <span className="font-semibold">Licensors:</span>{" "}
                      {informationData.data.licensors.map((licensor) => (
                        <p key={licensor.mal_id}>
                          <Link
                            href={`producer/${licensor.mal_id}`}
                            className="text-blue-400 hover:underline"
                          >
                            {licensor.name}
                          </Link>{" "}
                        </p>
                      ))}
                    </div>
                  )}
                {informationData.data.studios &&
                  informationData.data.studios.length > 0 && (
                    <div className="text-lg">
                      <span className="font-semibold">Studios:</span>{" "}
                      {informationData.data.studios.map((studio) => (
                        <p key={`producer/${studio.mal_id}`}>
                          <Link
                            href={studio.url}
                            className="text-blue-400 hover:underline"
                          >
                            {studio.name}
                          </Link>{" "}
                        </p>
                      ))}
                    </div>
                  )}
                {informationData.data.source && (
                  <p className="text-lg">
                    <span className="font-semibold">Source:</span>{" "}
                    {informationData.data.source}
                  </p>
                )}

                {informationData.data.genres &&
                  informationData.data.genres.length > 0 && (
                    <div className="text-lg">
                      <span className="font-semibold">Genres:</span>{" "}
                      {informationData.data.genres.map((genre) => (
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
                  )}

                {informationData.data.themes &&
                  informationData.data.themes.length > 0 && (
                    <div className="text-lg">
                      <span className="font-semibold">Themes:</span>{" "}
                      {informationData.data.themes.map((theme) => (
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
                  )}

                {informationData.data.demographics &&
                  informationData.data.demographics.length > 0 && (
                    <div className="text-lg">
                      <span className="font-semibold">Demographic:</span>{" "}
                      {informationData.data.demographics.map((demographic) => (
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
                  )}
                {informationData.data.duration && (
                  <p className="text-lg">
                    <span className="font-semibold">Duration:</span>{" "}
                    {informationData.data.duration}
                  </p>
                )}
                {informationData.data.rating && (
                  <p className="text-lg">
                    <span className="font-semibold">Rating:</span>{" "}
                    {informationData.data.rating}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Statistics</h3>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              <div className="flex flex-col">
                <p className="text-lg">
                  <span className="font-semibold">Score:</span>{" "}
                  {informationData.data.score}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Ranked:</span>{" "}
                  {informationData.data.rank}
                </p>
                <p className="text-lg">
                  <span className="font-semibold">Popularity:</span> #
                  {informationData.data.popularity}
                </p>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <p className="font-semibold text-2xl mb-1">Related Entries</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col gap-2">
              {informationData.data.relations.map((relation, index) => (
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
          <div className="mb-2">
            <p className="font-semibold text-2xl mb-1">
              {informationData.data.type === "Manga"
                ? "Characters"
                : "Character & Voice Actors"}
            </p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-full">
              {limitedCharacterData.map((character) => {
                const japaneseVA = character.voice_actors?.find(
                  (va) => va.language === "Japanese"
                );
                return (
                  <div
                    key={character.mal_id}
                    className="flex flex-row justify-between"
                  >
                    {/* Display Character */}
                    <div className="flex flex-row gap-1 items-start">
                      <Image
                        src={character.character.images.webp.image_url}
                        width={45}
                        height={62}
                        alt={character.character.name}
                        className="w-full max-w-[45px] aspect-[16/22] rounded-md overflow-hidden"
                      />
                      <div className="flex flex-col gap-1 text-[12px]">
                        <p>{character.character.name}</p>
                        <p>{character.role}</p>
                      </div>
                    </div>
                    {japaneseVA && (
                      <div className="flex flex-row gap-1 items-start">
                        <div className="flex flex-col gap-1 text-[12px] text-end">
                          <p>{japaneseVA.person.name}</p>
                          <p>{japaneseVA.language}</p>
                        </div>
                        <Image
                          src={japaneseVA.person.images.jpg.image_url}
                          width={45}
                          height={62}
                          alt={japaneseVA.person.name}
                          className="w-full max-w-[45px] aspect-[16/22] rounded-md overflow-hidden"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DisplayInformation;

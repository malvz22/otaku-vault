import Link from "next/link";
import { getUniqueDataResponse } from "../../libraries/api-library";
import HeaderMenu from "../../components/Utilities/HeaderMenu";
import BackToTopButton from "../../components/Utilities/BackToTopButton";

const Page = async () => {
  const animeGenres = await getUniqueDataResponse({
    resource: "genres/manga",
  });

  const excludeGenresIds = [12, 49, 9];

  const filteredGenres = animeGenres.data.filter(
    (genre) => !excludeGenresIds.includes(Number(genre.mal_id))
  );

  const groupedGenres = filteredGenres.reduce((acc, genre) => {
    const firstLetter = genre.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(genre);
    return acc;
  }, {} as Record<string, typeof filteredGenres>);

  const alphabet = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <main className="flex flex-col px-3 w-full max-w-[1024px] mx-auto pb-3">
      <HeaderMenu title="Genre Lists" />
      <div className="flex flex-row gap-3 py-4 px-3 flex-wrap md:flex-nowrap text-white justify-center w-full max-w-full">
        {alphabet.map((letter) => (
          <Link
            key={letter}
            href={`#${letter}`}
            className="text-lg text-white hover:text-[#1E90FF] transition-all duration-700"
          >
            {letter}
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {Object.entries(groupedGenres)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([letter, genres]) => (
            <section
              id={letter}
              key={letter}
              className="flex flex-col gap-2 scroll-mt-[70px] scroll-smooth"
            >
              <h2 className="text-3xl font-semibold">{letter}</h2>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              <div className="flex flex-col gap-3">
                {genres.map((genre) => (
                  <Link
                    href={`/manga/genre/${genre.mal_id}?page=1`}
                    key={genre.mal_id}
                    className="text-lg text-white hover:text-[#1E90FF] transition-all duration-700 ease-in-out"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            </section>
          ))}
      </div>
      <BackToTopButton />
    </main>
  );
};

export default Page;

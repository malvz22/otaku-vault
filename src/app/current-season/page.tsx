export const revalidate = 3600;

import AnimeList from "../components/AnimeList";
import HeaderMenu from "../components/Utilities/HeaderMenu";
import { getAnimeResponse } from "../libraries/api-library";

const Page = async () => {
  const seasonsNow = await getAnimeResponse({
    resource: "seasons/now",
    query: "limit=20",
  });

  if (!seasonsNow?.data) {
    return <div>No anime data found.</div>;
  }

  return (
    <main className="flex flex-col justify-center items-center px-3 w-full max-w-[1024px] mx-auto">
      <HeaderMenu title={`Current Season`} />
      <AnimeList api={seasonsNow} />
    </main>
  );
};

export default Page;

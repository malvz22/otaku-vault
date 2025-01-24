import AnimeList from "@/app/components/AnimeList";
import Header from "@/app/components/AnimeList/Header";
import { getAnimeResponse } from "@/app/libraries/api-library";

interface ApiResponse {
  data: Data[];
}

interface Data {
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
}

const Home = async ({ params }: { params: Promise<{ keyword: string }> }) => {
  const keyword = (await params).keyword;
  const decodedKeyword = decodeURI(keyword);
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${decodedKeyword}`
  // );
  // const searchAnime: ApiResponse = await response.json();

  const searchAnime: ApiResponse = await getAnimeResponse({
    resource: `anime`,
    query: `q=${decodedKeyword}`,
  });

  return (
    <>
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header
          title={`Search result for "${decodedKeyword}"`}
          linkHref=""
          linkTitle=""
        />
        <AnimeList api={searchAnime} />
      </section>
    </>
  );
};

export default Home;

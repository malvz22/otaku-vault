/* eslint-disable react/jsx-key */
import AnimeList from "@/app/components/AnimeList";
import Header from "@/app/components/AnimeList/Header";

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

const Home = async ({ params }: { params: { keyword: string } }) => {
  const { keyword } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}`
  );
  const searchAnime: ApiResponse = await response.json();
  // const response2 = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/top/anime?limit=8`
  // );
  // const newAnime = await response.json();
  return (
    <>
      <section className="flex flex-col px-3 w-full max-w-full pb-3">
        <Header
          title={`Search result for "${keyword}"`}
          linkHref=""
          linkTitle=""
        />
        <AnimeList api={searchAnime} />
      </section>
    </>
  );
};

export default Home;

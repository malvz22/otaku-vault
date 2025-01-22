import { getAnimeResponse } from "../libraries/api-library";

interface Data {
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
}

const Page = async () => {
  const topAnime: { data: Data[] } = await getAnimeResponse({
    resource: "top/anime",
    query: "limit=8",
  });

  return <div>New Anime Page</div>;
};

export default Page;

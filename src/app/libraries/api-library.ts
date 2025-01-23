interface ApiProps {
  resource: string;
  query?: string;
}

export const getAnimeResponse: React.FC<ApiProps> = async ({
  resource,
  query = "",
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`
  );
  const animeData = await response.json();
  return animeData;
};

export const getRecommendedAnimeResponse = async ({
  resource,
}: {
  resource: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`
  );
  const animeData = await response.json();
  return animeData.data.flatMap((item: string) => item.entry);
};

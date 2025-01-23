interface ApiProps {
  resource: string;
  query?: string;
}

interface NestedDataItems {
  [key: string]: unknown;
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

export const getNestedAnimeResponse = async ({
  resource,
  objectProperty,
}: {
  resource: string;
  objectProperty: string;
}) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`
  );
  const animeData = await response.json();
  return animeData.data.flatMap(
    (item: NestedDataItems) => item[objectProperty]
  );
};

export const randomizer = (data: any, gap = 5) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const response = {
    data: data.slice(first, last),
  };

  return response;
};

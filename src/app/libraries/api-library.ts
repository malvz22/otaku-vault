interface ApiProps {
  resource: string;
  query?: string;
}

interface NestedDataItems {
  [key: string]: unknown;
}
interface Data {
  push(index: Data[]): unknown;
  some(arg0: (entry: { mal_id: string; entry: Data[] }) => boolean): unknown;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
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

export const randomizer = (data: Data[], gap = 5) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const uniqueData = {
    data: data.slice(first, last).reduce((acc: Data[], index: Data) => {
      if (!acc.some((entry) => entry.mal_id === index.mal_id)) {
        acc.push(index);
      }
      return acc;
    }, [] as Data[]),
  };

  // const response = {
  //   data: data.slice(first, last),
  // };

  // return response;
  return uniqueData;
};

interface ApiProps {
  resource: string;
  query?: string;
}

interface NestedDataItems {
  [key: string]: unknown;
}

interface ApiResponse {
  data: Data[];
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
  year: number;
  score: number;
  rank: number;
  popularity: number;
  episodes: number;
  synopsis: string;
  trailer: {
    youtube_id: string;
  };
}

// interface RandomizedData extends Data {
//   title: string;
//   images: {
//     webp: {
//       image_url: string;
//     };
//   };
//   mal_id: string;
// }

// interface RandomizedDataContainer {
//   data: RandomizedData[];
// }

export const getAnimeResponse = async ({
  resource,
  query = "",
}: ApiProps): Promise<ApiResponse> => {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query ? `?${query}` : ""}`
  // );

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${
    query ? `${query}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const animeData = await response.json();

  if (!animeData || !animeData.data) {
    throw new Error("Invalid API response structure.");
  }

  return animeData;
};

export const getNestedAnimeResponse = async ({
  resource,
  objectProperty,
}: {
  resource: string;
  objectProperty: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}`
  // );
  const animeData = await response.json();

  if (!animeData || !animeData.data) {
    throw new Error("Invalid API Response structure");
  }

  return animeData.data.flatMap(
    (item: NestedDataItems) => item[objectProperty]
  );
};

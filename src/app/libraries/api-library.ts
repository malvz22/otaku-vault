interface ApiProps {
  resource: string;
  query?: string;
}

interface NestedDataItems {
  [key: string]: unknown;
}

interface ApiResponse {
  data: Data;
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

interface RandomizedData {
  title: string;
  images: {
    webp: {
      image_url: string;
    };
  };
  mal_id: string;
}

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
}): Promise<ApiResponse> => {
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

// randomizer without generic

export const randomizer = (data: RandomizedData[], gap = 5) => {
  const first = ~~(Math.random() * (data.length - gap) + 1);
  const last = first + gap;

  const uniqueData = {
    data: data
      .slice(first, last)
      .reduce((acc: RandomizedData[], index: RandomizedData) => {
        if (!acc.some((entry) => entry.mal_id === index.mal_id)) {
          acc.push(index);
        }
        return acc;
      }, [] as RandomizedData[]),
  };

  return uniqueData;
};

// export const genericRandomizer = <T extends { mal_id: string }>(
//   data: T[],
//   gap = 5
// ): { data: T[] } => {
//   const first = ~~(Math.random() * (data.length - gap) + 1);
//   const last = first + gap;

//   const uniqueData = {
//     data: data.slice(first, last).reduce((acc: T[], index: T) => {
//       if (!acc.some((entry) => entry.mal_id === index.mal_id)) {
//         acc.push(index);
//       }
//       return acc;
//     }, [] as T[]),
//   };

//   return uniqueData;
// };

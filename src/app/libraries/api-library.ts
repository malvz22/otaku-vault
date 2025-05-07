interface ApiProps {
  resource: string;
  query?: string;
}

interface NestedDataItems {
  [key: string]: unknown;
}

interface ApiResponse {
  data: Data[];
  pagination?: Pagination;
}

interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: {
    count: number;
    total: number;
    per_page: number;
  };
}

export interface ApiResponseObject {
  data: Data;
}

export interface Data {
  push(index: Data[]): unknown;
  some(arg0: (entry: { mal_id: string; entry: Data[] }) => boolean): unknown;
  title: string;
  images: {
    webp: {
      image_url: string;
    };
    jpg: {
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
  titles: {
    type: string;
    title: string;
  }[];
  type: string;
  status: string;
  aired: {
    string: string;
  };
  broadcast: {
    string: string;
  };
  producers: {
    name: string;
    url: string;
    mal_id: number;
  }[];
  licensors: {
    name: string;
    url: string;
    mal_id: number;
  }[];
  studios: {
    name: string;
    url: string;
    mal_id: number;
  }[];
  source: string;
  genres: {
    name: string;
    url: string;
    mal_id: number;
  }[];
  themes: {
    name: string;
    url: string;
    mal_id: number;
  }[];
  demographics: {
    name: string;
    url: string;
    mal_id: number;
  }[];
  duration: string;
  rating: string;
  relation: string;
  entry: Entry[];
  published: {
    string: string;
  };
  volumes: number;
  serializations: {
    name: string;
    mal_id: number;
  }[];
  authors: {
    mal_id: number;
    name: string;
  }[];
  established: string;
  favorites: number;
  external: {
    name: string;
    url: string;
  }[];
  streaming: {
    name: string;
    url: string;
  }[];
  relations: {
    relation: string;
    entry: Entry[];
  }[];
  voice_actors: {
    language: string;
    person: {
      name: string;
      images: {
        jpg: {
          image_url: string;
        };
      };
    };
  }[];
  character: {
    images: {
      webp: {
        image_url: string;
      };
    };
    mal_id: string;
    name: string;
  };
  role: string;
  name: string;
  chapters: string;
}

interface Entry {
  mal_id: string;
  name: string;
  type: string;
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
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${
    query ? `${query}` : ""
  }`;

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const animeData = await response.json();

  if (!animeData || !animeData.data) {
    throw new Error("Invalid API response structure.");
  }

  const uniqueData = animeData.data.reduce((acc: Data[], anime: Data) => {
    if (!acc.some((entry) => entry.mal_id === anime.mal_id)) {
      acc.push(anime);
    }
    return acc;
  }, []);

  return { ...animeData, data: uniqueData };
};

export const getProducer = async ({
  resource,
  query = "",
}: ApiProps): Promise<ApiResponseObject> => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${
    query ? `${query}` : ""
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const producer = await response.json();

  if (!producer) {
    throw new Error("Invalid API response structure.");
  }

  return producer;
};

export const getDataResponse = async ({
  resource,
  query = "",
}: ApiProps): Promise<ApiResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${
      query ? `${query}` : ""
    }`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

export const getAnimeResponseObject = async ({
  resource,
  query = "",
}: ApiProps): Promise<ApiResponseObject> => {
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

export const randomizer = (data: Data[], gap: number) => {
  const values = data;

  const first = ~~(Math.random() * (values.length - gap) + 1);
  const last = first + gap;

  const uniqueData = {
    data: values.slice(first, last).reduce((acc: Data[], index: Data) => {
      if (!acc.some((entry) => entry.mal_id === index.mal_id)) {
        acc.push(index);
      }
      return acc;
    }, [] as Data[]),
  };

  return uniqueData;
};

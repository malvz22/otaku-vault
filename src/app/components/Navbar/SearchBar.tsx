"use client";
import { getAnimeResponse } from "@/app/libraries/api-library";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

interface Data {
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
}

interface Entry {
  mal_id: string;
  name: string;
  type: string;
}

interface Props {
  setSearchBar: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchBar: React.FC<Props> = ({ setSearchBar }) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [keyword, setKeyword] = useState("");

  const [searchResults, setSearchResults] = useState<Data[]>([]);
  const [searchFilter, setSearchFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("anime");
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (keyword.trim() !== "") {
        fetchData();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [keyword]);

  const fetchData = async () => {
    try {
      const response = await getAnimeResponse({
        resource: `${selectedFilter}`,
        query: `q=${keyword}&limit=6`,
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInput = (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const keyword = searchRef.current?.value;

    if (!keyword) return;

    if (event.type === `keydown`) {
      const keyboardEvent = event as React.KeyboardEvent<HTMLInputElement>;
      if (keyboardEvent.key === `Enter`) {
        event.preventDefault();
        router.push(`/search/${keyword}`);
      }
    } else if (event.type === `click`) {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className="relative w-full max-w-[1024px] px-3">
      <div className="w-full max-w-full mb-3 flex flex-row gap-3 relative items-center">
        <div className="relative flex flex-col items-center">
          <button
            className="flex flex-row gap-2 text-lg"
            onClick={() => setSearchFilter(!searchFilter)}
          >
            <p>
              {selectedFilter.charAt(0).toLocaleUpperCase() +
                selectedFilter.slice(1)}
            </p>
            <p>▼</p>
          </button>
          {searchFilter && (
            <div className="absolute top-10 end-0 bg-[#191A1F] rounded-md px-3 py-2">
              <button
                className="py-1"
                onClick={() => {
                  setSelectedFilter("anime");
                  setSearchFilter(false);
                }}
              >
                Anime
              </button>
              <button
                className="py-1"
                onClick={() => {
                  setSelectedFilter("manga");
                  setSearchFilter(false);
                }}
              >
                Manga
              </button>
            </div>
          )}
        </div>

        <input
          className="w-full p-3 rounded-md border-solid border-[1px] border-black text-black"
          placeholder="Search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          ref={searchRef}
          onKeyDown={handleSearchInput}
        />
        <button
          className="absolute top-3 end-4 text-black"
          onClick={handleSearchInput}
        >
          <HiOutlineMagnifyingGlass size={24} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {searchResults.map((result) => {
          return (
            <Link
              href={`/${selectedFilter}/${result.mal_id}`}
              key={result.mal_id}
              className="w-full max-w-full flex flex-row gap-3 items-center hover:items-start bg-[#191A1F] rounded-md p-3 hover:text-[#1E90FF] transition-all duration-700 group"
              onClick={() => setSearchBar(false)}
            >
              <div className="w-[50px] aspect-[16/22] relative rounded-md overflow-hidden">
                <Image
                  src={result.images.webp.image_url}
                  alt={result.title}
                  width={30}
                  height={50}
                  className="w-full h-full object-cover hover:scale-110 transition-all duration-700"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row gap-1">
                  <p className="text-md md:text-xl leading-6 font-bold">
                    {result.title}
                  </p>
                  <p className="text-md md:text-xl font-bold group-hover:hidden">
                    ({result.type})
                  </p>
                </div>

                <div className="text-sm text-white hidden group-hover:flex flex-col">
                  {selectedFilter === "anime" ? (
                    <p className="">Aired: {result.aired?.string}</p>
                  ) : (
                    <p className="">Published: {result.published?.string}</p>
                  )}
                  <p className="">Score:{result.score}</p>
                  <p className="">Status: {result.status}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;

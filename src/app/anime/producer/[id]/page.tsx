import { getProducer } from "@/app/libraries/api-library";
import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaGlobe,
  FaInstagram,
  FaSquareXTwitter,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const producer = await getProducer({ resource: `producers/${id}/full` });

  const iconMap: Record<string, IconType> = {
    "x.com": FaSquareXTwitter,
    Twitter: FaTwitter,
    Facebook: FaFacebook,
    Instagram: FaInstagram,
    TikTok: FaTiktok,
    Official: FaGlobe,
    YouTube: FaYoutube,
  };

  const establishedDate = new Date(producer.data.established);
  const formattedDate = establishedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="flex flex-col w-full max-w-[1024px] mx-auto">
      <div className="pt-4 px-4">
        <h3 className="text-2xl text-white">{producer.data.titles[0].title}</h3>
      </div>

      <div className="pt-4 px-4 flex flex-col md:flex-row gap-2 w-full max-w-full text-white">
        <Image
          src={producer.data.images.jpg.image_url}
          alt="..."
          width={500}
          height={0}
          className="w-full max-w-full md:hidden aspect-square rounded-md overflow-hidden"
          priority={true}
        />
        <aside className="w-[300px] hidden md:flex flex-col gap-4">
          <Image
            src={producer.data.images.jpg.image_url}
            alt="..."
            width={500}
            height={0}
            className="w-full md:w-[500px] aspect-square rounded-md overflow-hidden"
            priority={true}
          />

          <div className="flex flex-col">
            <p className="text-lg">
              <span className="font-semibold">
                {producer.data.titles[1].type}:
              </span>{" "}
              {producer.data.titles[1].title}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Established:</span>{" "}
              {formattedDate}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Favorites:</span>{" "}
              {producer.data.favorites}
            </p>
          </div>
          {producer.data.external && producer.data.external.length > 0 && (
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold">Available At</h3>
              <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
              <div className="flex flex-col">
                {producer.data.external.map((external, index) => {
                  const Icon =
                    iconMap[external.name as keyof typeof iconMap] || FaGlobe;
                  return (
                    <div
                      className="text-lg flex flex-row gap-1 items-center"
                      key={index}
                    >
                      <Icon />
                      <Link
                        href={external.url}
                        className="text-blue-400 hover:underline"
                        target="_blank"
                      >
                        {external.name}
                      </Link>{" "}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        <div className="flex flex-col w-full">
          <div className="flex flex-col md:hidden">
            <div className="flex flex-col">
              <p className="text-lg">
                <span className="font-semibold">
                  {producer.data.titles[1].type}:
                </span>{" "}
                {producer.data.titles[1].title}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Established:</span>{" "}
                {formattedDate}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Favorites:</span>{" "}
                {producer.data.favorites}
              </p>
            </div>
            {producer.data.external && producer.data.external.length > 0 && (
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold">Available At</h3>
                <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
                <div className="flex flex-col">
                  {producer.data.external.map((external, index) => {
                    const Icon =
                      iconMap[external.name as keyof typeof iconMap] || FaGlobe;
                    return (
                      <div
                        className="text-lg flex flex-row gap-1 items-center"
                        key={index}
                      >
                        <Icon />
                        <Link
                          href={external.url}
                          className="text-blue-400 hover:underline"
                          target="_blank"
                        >
                          {external.name}
                        </Link>{" "}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          {/* <div className="mb-2">
            <p className="font-semibold text-2xl mb-1">Related Entries</p>
            <hr className="w-full border-white/40 border-solid border-[1px] rounded mb-2" />
            <div className="flex flex-col gap-2">
              {relations.data.map((relation, index) => (
                <div key={index}>
                  <p>{relation.relation}</p>
                  {relation.entry.map((entry) => (
                    <div key={entry.mal_id}>
                      <Link
                        className="text-blue-400 hover:underline"
                        href={`/${entry.type}/${entry.mal_id}`}
                      >
                        {entry.name}
                      </Link>{" "}
                      ({entry.type})
                    </div>
                  ))}
                </div>
              ))}

              <div className="flex flex-row gap-2"></div>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default Page;

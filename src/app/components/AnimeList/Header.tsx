import Link from "next/link";

interface Props {
  title: string;
  linkHref: string;
  linkTitle: string;
}

const Header = ({ title, linkHref, linkTitle }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center pt-8 pb-4">
      <h1 className="font-bold text-2xl">{title}</h1>
      <Link href={`${linkHref}`}>
        <p>{linkTitle}</p>
      </Link>
    </div>
  );
};

export default Header;

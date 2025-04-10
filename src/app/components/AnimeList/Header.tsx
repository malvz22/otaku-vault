import Link from "next/link";

interface Props {
  title: string;
  linkHref: string;
  linkTitle: string;
  children?: Readonly<React.ReactNode>;
}

// {
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>

const Header = ({ title, linkHref, linkTitle, children }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center pt-8 pb-4 w-full max-w-full">
      <div className="flex flex-row gap-3 justify-center items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="text-2xl">{children}</div>
      </div>

      {linkHref && linkTitle ? (
        <Link href={`${linkHref}`}>
          <p className="text-white hover:text-[#1E90FF] transition-colors duration-700">
            {linkTitle}
          </p>
        </Link>
      ) : null}
    </div>
  );
};

export default Header;

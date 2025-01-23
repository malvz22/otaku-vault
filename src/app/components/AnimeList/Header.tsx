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
    <div className="flex flex-row justify-between items-center pt-8 pb-4">
      <div className="flex flex-row gap-3 justify-center items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="text-2xl">{children}</div>
      </div>

      {linkHref && linkTitle ? (
        <Link href={`${linkHref}`}>
          <p>{linkTitle}</p>
        </Link>
      ) : null}
    </div>
  );
};

export default Header;

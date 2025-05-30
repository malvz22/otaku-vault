interface TitleProps {
  title: string;
}

const HeaderMenu: React.FC<TitleProps> = ({ title }) => {
  return (
    <div>
      <div className="p-8">
        <h3 className="text-center text-4xl">{title}</h3>
      </div>
    </div>
  );
};

export default HeaderMenu;

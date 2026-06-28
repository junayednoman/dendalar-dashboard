const PageTitle = ({
  title,
  subTitle,
}: {
  title: string;
  subTitle?: string;
}) => {
  return (
    <div className="w-[550px]">
      <h2 className="text-[40px] font-bold">{title}</h2>
      {subTitle && <p className="text-secondary-foreground">{subTitle}</p>}
    </div>
  );
};

export default PageTitle;

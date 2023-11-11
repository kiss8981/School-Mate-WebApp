import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children }) => {
  return (
    <>
      <div className="min-w-[280px] max-w-[540px] m-auto">
        {children}
      </div>
    </>
  );
};

export default Layout;

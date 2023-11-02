import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children, modal }) => {
  return (
    <>
      <div className="min-w-[280px] max-w-[540px] m-auto min-h-screen">
        {children}
      </div>
    </>
  );
};

export default Layout;

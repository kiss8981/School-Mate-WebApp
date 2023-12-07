import { NextPage } from "next";
import BottomNavbar from "./_component/BottomNavbar";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children }) => {
  return (
    <>
      <div className="min-w-[280px] max-w-[540px] m-auto">
        {children}
        <BottomNavbar />
      </div>
    </>
  );
};

export default Layout;

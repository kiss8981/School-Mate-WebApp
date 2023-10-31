import { NextPage } from "next";
import { auth, authOptions } from "../auth";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import BottomNavbar from "./_component/BottomNavbar";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children, modal }) => {
  return (
    <>
      {children}
      <BottomNavbar />
    </>
  );
};

export default Layout;

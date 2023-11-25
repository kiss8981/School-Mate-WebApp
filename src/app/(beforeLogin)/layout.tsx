import { NextPage } from "next";
import { auth, authOptions } from "../auth";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children }) => {
  return <>{children}</>;
};

export default Layout;

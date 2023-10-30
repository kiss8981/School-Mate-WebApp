import { NextPage } from "next";
import { auth, authOptions } from "../auth";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";

interface Props {
  children: React.ReactNode;
  modal: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children, modal }) => {
  const auth = await getServerSession(authOptions);
  if (!auth) return <></>;
  return <></>;
};

export default Layout;

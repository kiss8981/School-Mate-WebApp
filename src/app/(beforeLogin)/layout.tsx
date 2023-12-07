import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = async ({ children }) => {
  return <>{children}</>;
};

export default Layout;

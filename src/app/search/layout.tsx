import { Metadata, NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  viewport:
    "width=device-width, initial-scale=1.0, user-scalable=0, viewport-fit=cover, maximum-scale=1.0",
};

const Layout: NextPage<Props> = async ({ children }) => {
  return (
    <>
      <div className="min-w-[280px] max-w-[540px] m-auto">{children}</div>
    </>
  );
};

export default Layout;

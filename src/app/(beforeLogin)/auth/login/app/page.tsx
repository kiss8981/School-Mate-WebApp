import { Metadata, NextPage } from "next";
import LoginProcess from "./_component/LoginProcess";

export const metadata: Metadata = {
  title: "로그인 중...",
};

const AppLoginPage: NextPage<{
  searchParams: {
    token: string;
  };
}> = async ({ searchParams }) => {
  return (
    <>
      <LoginProcess token={searchParams.token} />
    </>
  );
};

export default AppLoginPage;

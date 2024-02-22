import { Metadata, NextPage } from "next";
import LoginProcess from "./_component/LoginProcess";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "로그인 중...",
};

const AppLoginPage: NextPage<{
  searchParams: {
    token: string;
  };
}> = async ({ searchParams }) => {
  if (!searchParams.token) {
    return redirect("/intro");
  }

  return (
    <>
      <LoginProcess token={searchParams.token} />
    </>
  );
};

export default AppLoginPage;

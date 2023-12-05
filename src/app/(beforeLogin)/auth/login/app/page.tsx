import { NextPage } from "next";
import LoginProcess from "./_component/LoginProcess";

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

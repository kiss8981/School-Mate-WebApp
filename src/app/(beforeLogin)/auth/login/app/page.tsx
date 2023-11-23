import { stackRouterPush } from "@/lib/stackRouter";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";
import { NextPage } from "next";
import { getCsrfToken, getSession, signIn } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import LoginProcess from "./_component/LoginProcess";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { cookies } from "next/headers";

const requestLogin = async (token: string) => {
  const loginData = await getServerSession(authOptions);
  if (!loginData) return null;

  return {
    token,
    isLogged: loginData?.user.user.userSchool ? true : false,
  };
};

const AppLoginPage: NextPage<{
  searchParams: {
    token: string;
  };
}> = async ({ searchParams }) => {
  const loginData = await requestLogin(searchParams.token);

  if (!loginData) return redirect("/");
  if (loginData.isLogged) return redirect("/main");

  return (
    <>
      <LoginProcess loginData={loginData} />
    </>
  );
};

export default AppLoginPage;

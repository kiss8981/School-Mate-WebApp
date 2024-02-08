"use client";

import Lottie from "lottie-react";
import LoadingLogo from "@/assets/lottie/loadingLogo.json";
import { setCookie } from "@/lib/csrUtils";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";

import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { authOptions } from "@/app/auth";

const LoginProcess: React.FC<{
  token: string;
}> = ({ token }) => {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      await signOut({ redirect: false }).finally(() => {
        signIn("credentials", {
          redirect: false,
          code: token,
          provider: "app",
        }).then(async res => {
          if (!res?.ok) {
            toast("error", "로그인 세션이 만료되었습니다.");
            router.replace("/auth/login");
          } else {
            const session = await getSession();
            if (!session?.user) {
              toast("error", "로그인에 실패하였습니다.");
              router.replace("/auth/login");
              return;
            }

            setCookie("Authorization", session?.user.token.accessToken, {
              path: "/",
              maxAge: 60 * 60 * 24 * 7,
              domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
            });

            if (window.ReactNativeWebView) {
              sendWebviewEvent("LOGIN_EVENT", {
                type: "callback",
                loginType: "phone",
                token: {
                  accessToken: session?.user.token.accessToken,
                  refreshToken: session?.user.token.refreshToken,
                },
              });
            }
            router.replace("/main");
          }
        });
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <Lottie className="w-44" animationData={LoadingLogo} />
      </div>
    </>
  );
};

export default LoginProcess;

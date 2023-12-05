"use client";

import { setCookie } from "@/lib/csrUtils";
import { stackRouterPush } from "@/lib/stackRouter";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";

const LoginProcess: React.FC<{
  token: string;
}> = ({ token }) => {
  const router = useRouter();
  useEffect(() => {
    signIn("credentials", {
      redirect: false,
      code: token,
      provider: "app",
    }).then(async res => {
      if (!res?.ok) {
        toast("error", "로그인 세션이 만료되었습니다.");
        stackRouterPush(router, "/auth/login", "reset");
      } else {
        const session = await getSession();
        if (!session?.user) {
          toast("error", "로그인에 실패하였습니다.");
          return;
        }

        setCookie("accessToken", session?.user.token.accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
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
        } else {
          stackRouterPush(router, "/main", "reset");
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default LoginProcess;

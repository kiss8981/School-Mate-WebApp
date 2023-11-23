"use client";

import { stackRouterPush } from "@/lib/stackRouter";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect } from "react";

const LoginProcess: React.FC<{
  loginData: {
    token: string;
  };
}> = ({ loginData }) => {
  const router = useRouter();
  useEffect(() => {
    signIn("credentials", {
      redirect: false,
      code: loginData.token,
      provider: "app",
    }).then(async (res) => {
      if (!res?.ok) {
        toast("error", "로그인 세션이 만료되었습니다.");
        stackRouterPush(router, "/auth/login", "reset");
      } else {
        const session = await getSession();
        if (!session?.user) {
          toast("error", "로그인에 실패하였습니다.");
          return;
        }

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
  }, []);
  return <></>;
};

export default LoginProcess;

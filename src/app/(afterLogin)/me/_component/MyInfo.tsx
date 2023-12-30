"use client";

import Button from "@/app/_component/Button";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MyInfo = ({ auth }: { auth: Session }) => {
  const router = useRouter();

  useEffect(() => {
    const handleComment = async (event: MessageEvent) => {
      try {
        const { type: eventType } = JSON.parse(event.data);
        if (eventType === "LOGOUT_EVENT") {
          await signOut({ redirect: true, callbackUrl: "/intro" });
        }
      } catch (err) {}
    };

    // @ts-ignore
    document.addEventListener("message", handleComment);
    window.addEventListener("message", handleComment);

    return () => {
      window.removeEventListener("message", handleComment);
      // @ts-ignore
      document.removeEventListener("message", handleComment);
    };
  }, []);

  const requestLogout = async () => {
    if (window.ReactNativeWebView) {
      sendWebviewEvent("LOGOUT_EVENT", {});
    } else {
      signOut({ redirect: true, callbackUrl: "/intro" });
    }
  };

  return (
    <div className={classNames("pt-3 pb-20", inter.className)}>
      <div className="flex flex-row justify-between px-5 items-center">
        <div className="flex flex-col">
          <span className="text-xl font-bold text-[#0A1A3A]">
            {auth.user.user.name}
          </span>
          <span className="text-sm text-[#7C7C7C] mt-1">
            {auth.user.user.userSchool?.school.defaultName}{" "}
            {auth.user.user.userSchool?.grade}학년{" "}
          </span>
        </div>
        <div className="relative rounded-full overflow-hidden w-16 h-16">
          <Image
            src={
              auth.user.user.profile
                ? process.env.NEXT_PUBLIC_S3_URL + auth.user.user.profile
                : "/images/schoolmate/logobg.svg"
            }
            alt="article"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="px-5 mt-2">
        <button
          onClick={() => {
            stackRouterPush(router, "/me/modify");
          }}
          className="bg-[#F0F0F0] rounded-full px-3 py-2 text-sm text-[#0A1A3A] font-bold flex flex-row items-center justify-center"
        >
          <span>프로필 변경</span>
          <Image
            src="/icons/Back.svg"
            alt="arrow"
            width={8}
            height={8}
            className="ml-2 rotate-180"
          />
        </button>
      </div>
      <div className="px-5 mt-5">
        <div className="border p-4 px-5 w-full rounded-[10px] flex flex-col justify-start items-start">
          <span className="font-bold text-lg">계정</span>
          <div className="flex flex-col space-y-3.5 mt-3 items-start w-full">
            <button
              className="w-full text-left"
              onClick={() => {
                stackRouterPush(router, "/verify");
              }}
            >
              학교 인증
            </button>
            <button
              onClick={() => {
                stackRouterPush(router, "/me/changepassword");
              }}
              className="w-full text-left"
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => {
                stackRouterPush(router, "/signout");
              }}
              className="w-full text-left"
            >
              계정 탈퇴
            </button>
          </div>
        </div>
        <div className="border p-4 mt-5 px-5 w-full rounded-[10px] flex flex-col justify-start items-start">
          <span className="font-bold text-lg">이용안내</span>
          <div className="flex flex-col space-y-3.5 mt-3 items-start w-full">
            <button
              className="w-full text-left"
              onClick={() => {
                stackRouterPush(router, "/tos");
              }}
            >
              이용 규칙
            </button>
            <button
              className="w-full text-left"
              onClick={() => {
                stackRouterPush(router, "/privacy");
              }}
            >
              개인정보 처리방침
            </button>
            <button
              className="w-full text-left"
              onClick={() => {
                stackRouterPush(router, "/guide");
              }}
            >
              문의하기
            </button>
            <button
              className="w-full text-left"
              onClick={() => {
                stackRouterPush(router, "/opensource");
              }}
            >
              오픈소스 라이선스
            </button>
          </div>
        </div>
        <Button
          className="w-full mt-10 py-3.5 rounded-full"
          onClick={() => {
            requestLogout();
          }}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
};

export default MyInfo;

"use client";

import Button from "@/app/_component/Button";
import { inter, roboto, robotoMono } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LoginLandingPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="h-[100vh] px-8 flex flex-col justify-center">
        <div
          className={classNames(
            "flex flex-col text-2xl font-bold mb-auto",
            roboto.className
          )}
          style={{
            paddingTop: "2rem",
          }}
        >
          <span className="underline underline-offset-[-4px] decoration-[#2545ED]/20 decoration-[10px]">
            간편로그인 후
          </span>
          <span>이용이</span>
          <span>가능합니다</span>
        </div>
        <Image
          src="/images/auth/landing.png"
          alt="landing"
          width={300}
          height={300}
          className="my-7 m-auto"
        />
        <Button
          className={classNames(
            "w-full py-4 font-semibold text-lg rounded-full mt-auto",
            robotoMono.className
          )}
          onClick={() => stackRouterPush(router, "/auth/register", "stack")}
        >
          회원가입
        </Button>
        <button
          className={classNames(
            "w-full font-bold text-base mt-4 text-primary-500",
            roboto.className
          )}
          onClick={() => stackRouterPush(router, "/auth/register", "stack")}
        >
          15초 간편 가입하기
        </button>
        <button
          className={classNames(
            "w-full mt-4 text-[14px] text-[#B6B6B6] underline-offset-4 underline pb-10",
            inter.className
          )}
          onClick={() => stackRouterPush(router, "/auth/login", "stack", false)}
        >
          로그인이 안되셨나요? 로그인 하기
        </button>
      </div>
    </>
  );
};

export default LoginLandingPage;

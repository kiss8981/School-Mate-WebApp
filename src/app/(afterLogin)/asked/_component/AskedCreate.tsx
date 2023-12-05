"use client";

import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AskedCreate = () => {
  const router = useRouter();
  return (
    <>
      <div
        className={classNames(
          "flex flex-col h-[88vh] items-center justify-center",
          inter.className
        )}
      >
        <Image
          src="/images/schoolmate/logo.svg"
          alt="message"
          width={150}
          height={150}
        />
        <span className="font-bold mt-7">
          아직 에스크 프로필을 만드시지 않으셨군요!
        </span>
        <button
          onClick={() => {
            stackRouterPush(router, "/asked/intro");
          }}
          className="mt-5 font-bold flex flex-row items-center bg-[#f0f0f0] px-5 py-2 rounded-full"
        >
          프로필 만들기
          <Image
            src="/icons/Back.svg"
            width={10}
            height={10}
            className="rotate-180 ml-2"
            alt="arrow"
          />
        </button>
      </div>
    </>
  );
};

export default AskedCreate;

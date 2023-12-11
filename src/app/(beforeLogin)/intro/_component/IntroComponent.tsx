"use client";

import Button from "@/app/_component/Button";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/lib/stackRouter";
import { roboto, robotoMono } from "@/lib/fonts";

const RegisterIntroComponent = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const pageOfButton: {
    [key: number]: {
      text: string;
      onClick: () => void;
      image: React.ReactNode;
      title: string;
      subTitle: React.ReactNode;
    };
  } = {
    0: {
      text: "다음",
      onClick: () => setStep(1),
      image: (
        <Image
          width={340}
          height={340}
          alt="items"
          src="/images/auth/items.png"
        />
      ),
      title: "필요한 모든것을 한번에",
      subTitle: (
        <>
          <span>학교에서 필요한 것을 내가 놓치고 있던</span>
          <span>것들을 한번에 확인하세요.</span>
        </>
      ),
    },
    1: {
      text: "다음",
      onClick: () => setStep(2),
      image: (
        <Image
          width={250}
          height={250}
          alt="calendar"
          src="/images/auth/calendar.png"
        />
      ),
      title: "시간표와 일정을 정리하세요",
      subTitle: (
        <>
          <span>학원, 시간표, 과제를 하나로 바쁜</span>
          <span>일정 속 당신과 함께 갑니다.</span>
        </>
      ),
    },
    2: {
      text: "완료",
      onClick: () => stackRouterPush(router, "/auth", "reset", false),
      image: (
        <Image
          width={270}
          height={270}
          alt="chat"
          src="/images/auth/chat.png"
        />
      ),
      title: "에스크로 이야기를 나누세요",
      subTitle: (
        <>
          <span>평소에 묻고 싶었던 것들을 에스크를 통해</span>
          <span>익명으로 물어보세요.</span>
        </>
      ),
    },
  };

  return (
    <>
      <div className="h-[100vh] px-8 flex flex-col justify-center">
        <div className="w-full h-[350px] text-center flex items-center justify-center mt-auto">
          {pageOfButton[step].image}
        </div>
        <div
          className={classNames(
            roboto.className,
            "text-xl mb-4 font-semibold items-center flex justify-center"
          )}
        >
          {pageOfButton[step].title}
        </div>
        <div
          className={classNames(
            roboto.className,
            "text-base font-medium mb-5 flex flex-col items-center text-[#646464]"
          )}
        >
          {pageOfButton[step].subTitle}
        </div>
        <div className="flex flex-row my-10 items-center justify-center space-x-5">
          {[0, 1, 2].map(v => (
            <span
              key={v}
              className={classNames(
                "w-3 h-3 rounded-full",
                step === v ? "bg-primary-500" : "bg-[#DCDCDC]"
              )}
            />
          ))}
        </div>
        <Button
          className={classNames(
            "w-full py-4 font-semibold text-lg rounded-full mt-auto mb-10",
            robotoMono.className
          )}
          onClick={pageOfButton[step].onClick}
        >
          {pageOfButton[step].text}
        </Button>
        <button
          className={classNames(
            "w-full font-bold text-base pb-14 text-[#B6B6B6] ",
            roboto.className
          )}
          onClick={() => stackRouterPush(router, "/auth", "reset", false)}
        >
          건너뛰기
        </button>
      </div>
    </>
  );
};

export default RegisterIntroComponent;

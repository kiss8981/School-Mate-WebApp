"use client";

import Button from "@/app/_component/Button";
import { classNames } from "@/lib/uitls";
import { Roboto, Roboto_Mono } from "next/font/google";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/lib/stackRouter";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const RegisterIntroPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const pageOfButton: {
    [key: number]: {
      text: string;
      onClick: () => void;
      image: React.ReactNode;
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
    },
    2: {
      text: "완료",
      onClick: () => stackRouterPush(router, "/auth/register", "reset"),
      image: (
        <Image
          width={270}
          height={270}
          alt="chat"
          src="/images/auth/chat.png"
        />
      ),
    },
  };

  useEffect(() => {
    // swiperRef.current?.swiper?.slideTo(step);
  }, [step]);

  return (
    <>
      <div className="h-[100vh] px-8 flex flex-col justify-center">
        <div className="w-full h-[400px] text-center flex items-center justify-center">
          {pageOfButton[step].image}
        </div>
        <Button
          className={classNames(
            "w-full py-4 font-semibold text-lg rounded-[30px] mt-auto mb-10",
            robotoMono.className
          )}
          onClick={pageOfButton[step].onClick}
        >
          {pageOfButton[step].text}
        </Button>
        <button
          className={classNames(
            "w-full font-bold text-base pb-10 text-[#B6B6B6] ",
            roboto.className
          )}
          onClick={() => stackRouterPush(router, "/auth/register", "reset")}
        >
          건너뛰기
        </button>
      </div>
    </>
  );
};

export default RegisterIntroPage;

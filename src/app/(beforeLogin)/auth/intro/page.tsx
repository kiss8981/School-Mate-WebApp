"use client";

import Button from "@/app/_component/Button";
import { classNames } from "@/lib/uitls";
import { Roboto, Roboto_Mono } from "next/font/google";
import Slider from "react-slick";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/lib/stackRouter";

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
    };
  } = {
    0: {
      text: "다음",
      onClick: () => setStep(1),
    },
    1: {
      text: "다음",
      onClick: () => setStep(2),
    },
    2: {
      text: "완료",
      onClick: () => stackRouterPush(router, "/auth/register", "reset"),
    },
  };

  useEffect(() => {
    // swiperRef.current?.swiper?.slideTo(step);
  }, [step]);

  return (
    <>
      <div className="h-[100vh] px-8 flex flex-col justify-center">
        <Slider>
          <Image
            src="/images/auth/ch.png"
            alt="landing"
            width={300}
            height={300}
            className="my-7 m-auto"
          />
          <Image
            src="/images/auth/landing.png"
            alt="landing"
            width={300}
            height={300}
            className="my-7 m-auto"
          />
          <Image
            src="/images/auth/landing.png"
            alt="landing"
            width={300}
            height={300}
            className="my-7 m-auto"
          />
        </Slider>
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

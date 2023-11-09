"use client";

import Button from "@/app/_component/Button";
import Header from "@/app/_component/Header";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const requestAppleLogin = () => {
    sendWebviewEvent("LOGIN_EVENT", {
      type: "request",
      loginType: "apple",
    });
  };

  return (
    <>
      <div className="h-[100vh]">
        <Header />

        <div className={classNames("px-10 h-full block", inter.className)}>
          <Image
            src="/images/schoolmate/tm.svg"
            alt="register"
            width={100}
            height={50}
            className="my-2"
          />
          <div className={classNames("font-light w-full space-y-14 mt-16")}>
            <input
              type="text"
              placeholder="휴대폰 번호"
              className={classNames(
                "border-b rounded-none pb-2 w-full px-1 hover:border-primary-500 focus:border-primary-500 ring-0 outline-none",
                phone.length > 3 && "border-primary-500"
              )}
              value={phone}
              onChange={e =>
                setPhone(
                  e.target.value
                    ?.replace(/[^0-9]/g, "")
                    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                    .replace(/(-{1,2})$/g, "")
                )
              }
            />
            <div className="relative w-full">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="비밀번호"
                onChange={e => setPassword(e.target.value)}
                className={classNames(
                  "border-b rounded-none pb-2 w-full px-1 hover:border-primary-500 focus:border-primary-500 ring-0 outline-none",
                  password.length > 3 && "border-primary-500"
                )}
              />
              <button
                className="absolute right-0 top-0 h-full px-2 pb-2"
                onClick={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                <Image src="/icons/Eye.svg" alt="eye" width={20} height={20} />
              </button>
            </div>
          </div>
          <button className="mt-4 text-[#B6B6B6] text-sm w-full text-right flex flex-row items-center justify-end">
            비밀번호 찾기{" "}
            <Image
              src="/icons/Back.svg"
              className="rotate-180 text-[#B6B6B6] ml-1"
              width={6}
              height={6}
              alt="back"
              style={{
                filter:
                  "invert(75%) sepia(29%) saturate(12%) hue-rotate(100deg) brightness(91%) contrast(93%)",
              }}
            />
          </button>
          <Button className="w-full py-4 font-semibold text-[14px] rounded-full mt-10">
            로그인
          </Button>
          <div className="flex flex-row items-center justify-center font-semibold text-[10px] my-6">
            <hr className="w-full h-1 border-[#B6B6B6]" />
            <span className="w-40 text-[#B6B6B6] mx-4">SNS LOGIN</span>
            <hr className="w-full h-1 border-[#B6B6B6]" />
          </div>

          <div className="flex flex-col items-center justify-center mb-10">
            <Button className="w-full font-bold text-[14px] py-4 flex flex-row items-center justify-center rounded-full bg-[#FEE500] text-[#191919] border-none hover:bg-[#FEE500] active:bg-[#FEE500]">
              <Image
                src="/icons/KakaoLogoSm.svg"
                alt="kakao"
                width={20}
                height={20}
                className="mr-2"
              />
              카카오로 계속하기
            </Button>
            <Button
              onClick={requestAppleLogin}
              className="w-full font-bold text-[14px] py-4 flex flex-row items-center justify-center rounded-full mt-4 bg-black text-white border-none hover:bg-black active:bg-black"
            >
              <Image
                src="/icons/AppleLogoSm.svg"
                alt="apple  "
                width={20}
                height={20}
                className="mr-2"
              />
              Apple로 계속하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

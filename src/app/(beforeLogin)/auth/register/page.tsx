"use client";

import Button from "@/app/_component/Button";
import Header from "@/app/_component/Header";
import Input from "@/app/_component/Input";
import Modal from "@/app/_component/Modal";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import Image from "next/image";
import { useState } from "react";

const RegisterPage = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);

  const requestVerfiyPhone = () => {
    setIsVerifyModalOpen(true);
  };

  return (
    <>
      <div className="h-[100vh]">
        <Header title="회원가입" />

        <div
          className={classNames(
            "flex flex-col text-[#7C7C7C] px-4",
            inter.className
          )}
        >
          <span className={"text-[10pt] font-bold text-right w-full"}>
            필수 입력란<span className="text-red-500">*</span>
          </span>
          <div className="flex flex-col">
            <span className="font-bold">
              휴대폰 번호<span className="text-red-500">*</span>
            </span>
            <div className="flex flex-row h-[50px] w-full items-center mt-1">
              <Input
                placeholder="휴대폰 번호"
                className="w-full py-3.5 h-full mr-3"
                value={phone}
                onChange={(e) => {
                  setPhone(
                    e.target.value
                      ?.replace(/[^0-9]/g, "")
                      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                      .replace(/(-{1,2})$/g, "")
                  );
                }}
              />
              <Button
                onClick={requestVerfiyPhone}
                disabled={!(phone.length > 3)}
                className={classNames(
                  "rounded-[10px] text-[14px] font-bold h-full w-fit whitespace-nowrap px-3.5"
                )}
              >
                인증번호 전송
              </Button>
            </div>
            <span className="h-5 mt-1 ml-3 text-sm text-red-500">
              {phone.length > 3 ? "" : "숫자만 입력해주세요."}
            </span>
          </div>
        </div>
      </div>

      <Modal
        onClose={() => {
          console.log("close");
          setIsVerifyModalOpen(false);
        }}
        open={isVerifyModalOpen}
      >
        <div className="py-6 font-bold text-xl border-b w-full">
          <span className="px-7">휴대폰 인증하기</span>
        </div>
        <div className="px-7 py-6">
          <span>문자메세지로 전송된 인증번호를 입력해주세요</span>
          <Button
            variant="outline"
            className="mt-4 w-full font-semibold rounded-[6px] h-11 border-[#7C7C7C] text-[#7C7C7C]"
          >
            인증번호 재요청
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RegisterPage;

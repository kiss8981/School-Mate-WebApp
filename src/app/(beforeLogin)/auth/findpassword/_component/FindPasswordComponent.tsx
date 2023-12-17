"use client";

import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import Modal from "@/app/_component/Modal";
import useFetch from "@/hooks/useFetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { useState } from "react";
import Image from "next/image";
import { Loading } from "@/app/_component/Loading";
import { passwordCheck as passwordCheckr } from "@/lib/uitls";
import { Collapse } from "react-collapse";
import { stackRouterPush } from "@/lib/stackRouter";
import { useRouter } from "next/navigation";

const FindPasswordComponent = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [phoneVerifyed, setPhoneVerifyed] = useState(false);
  const [phoneVerifyToken, setPhoneVerifyToken] = useState("");
  const [loadingPhoneVerify, setLoadingPhoneVerify] = useState(false);
  const [phoneVerifyNumber, setPhoneVerifyNumber] = useState("");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [loadingPasswordChange, setLoadingPasswordChange] = useState(false);
  const { triggerFetch: requestVerfiyPhoneFetch } = useFetch(
    "/auth/findpass/sendsms",
    "POST",
    {
      successToast: {
        message: "인증번호가 전송되었습니다.",
      },
      onError: (status, message) => {
        setLoadingPhoneVerify(false);
        toast("error", message || "인증번호 전송에 실패했습니다.");
      },
      onSuccess: (stauts, statusCode, verifyToken) => {
        setLoadingPhoneVerify(false);
        setIsVerifyModalOpen(true);
        setPhoneVerifyToken(verifyToken);
      },
      onPending: () => setLoadingPhoneVerify(true),
    }
  );

  const { triggerFetch: requestVerfiyPhoneTokenFetch } = useFetch(
    "/auth/verify/phone",
    "POST",
    {
      successToast: {
        message: "인증에 성공했습니다.",
      },
      onError: (status, message) => {
        toast("error", message || "인증에 실패했습니다.");
      },
      onSuccess: () => {
        setPhoneVerifyed(true);
        setIsVerifyModalOpen(false);
      },
    }
  );

  const { triggerFetch: requestChangePasswordFetch } = useFetch(
    "/auth/findpass/updatepass",
    "POST",
    {
      fetchInit: {
        data: {
          phone: phone.replace(/[^0-9]/g, ""),
          password,
          token: phoneVerifyToken,
          code: phoneVerifyNumber,
        },
      },
      successToast: {
        message: "비밀번호가 변경되었습니다.",
      },
      onPending: () => setLoadingPasswordChange(true),
      onError: (status, message) => {
        setLoadingPasswordChange(false);
        toast("error", message || "비밀번호 변경에 실패했습니다.");
      },
      onSuccess: () => {
        setLoadingPasswordChange(false);
        stackRouterPush(router, "/auth/login", "reset");
      },
    }
  );
  return (
    <>
      <div className={classNames(inter.className, "flex flex-col px-5 mt-3")}>
        <div className="flex flex-col">
          <span className="font-bold">
            휴대폰 번호<span className="text-red-500">*</span>
          </span>
          <div className="flex flex-row h-[50px] w-full items-center mt-1">
            <Input
              placeholder="휴대폰 번호"
              className="w-full py-3.5 h-full"
              value={phone}
              disabled={phoneVerifyed}
              autoFocus
              onChange={e => {
                setPhone(
                  e.target.value
                    ?.replace(/[^0-9]/g, "")
                    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
                    .replace(/(-{1,2})$/g, "")
                );
              }}
            />
            <Button
              onClick={async () => {
                await requestVerfiyPhoneFetch({
                  fetchInit: {
                    data: {
                      phone: phone.replace(/[^0-9]/g, ""),
                    },
                  },
                });
              }}
              disabled={
                !(phone.length > 3) || phoneVerifyed || loadingPhoneVerify
              }
              className={classNames(
                "rounded-[10px] text-[14px] font-bold h-full w-40 whitespace-nowrap px-3.5 ml-3 items-center flex justify-center"
              )}
            >
              {loadingPhoneVerify ? (
                <Loading />
              ) : phoneVerifyed ? (
                "인증완료"
              ) : (
                "인증번호 전송"
              )}
            </Button>
          </div>
          <span className="h-4 mt-1 ml-3 text-sm text-red-500">
            {phone.length > 3 ? "" : "숫자만 입력해주세요."}
          </span>
        </div>
        <Collapse isOpened={phoneVerifyed}>
          <div className="flex flex-col mt-5 relative">
            <span className="font-bold">
              비밀번호 변경<span className="text-red-500">*</span>
            </span>
            <span className="absolute right-0 text-red-500 text-sm top-1">
              8자이상 영문, 숫자, 특수문자 조합
            </span>
            <div className="mt-2 h-[50px] relative">
              <Input
                placeholder="비밀번호"
                className="w-full py-3.5 h-full pr-24"
                value={password}
                type="password"
                onChange={e => {
                  setPassword(e.target.value);
                }}
                disabled={loadingPasswordChange}
              />
              {!passwordCheckr(password) && (
                <span className="absolute top-3.5 right-2 text-red-500 text-sm flex flex-row">
                  사용 불가
                  <Image
                    src={"/icons/Warning.svg"}
                    width={13}
                    height={13}
                    alt="warning"
                    className="ml-1"
                  />
                </span>
              )}
            </div>
            <div className="mt-3 h-[50px] relative">
              <Input
                placeholder="비밀번호 확인"
                className="w-full py-3.5 h-full pr-36"
                type="password"
                value={passwordCheck}
                disabled={loadingPasswordChange}
                onChange={e => {
                  setPasswordCheck(e.target.value);
                }}
              />
              {password !== passwordCheck && (
                <span className="absolute top-3.5 right-2 text-red-500 text-sm flex flex-row">
                  일치하지 않습니다
                  <Image
                    src={"/icons/Warning.svg"}
                    width={13}
                    height={13}
                    alt="warning"
                    className="ml-1"
                  />
                </span>
              )}
            </div>
          </div>
        </Collapse>
      </div>
      <div
        className={classNames(
          inter.className,
          "px-5 w-full justify-center fixed bottom-3"
        )}
      >
        <button
          // onClick={handleEditUser}
          disabled={
            !phoneVerifyed ||
            !(password == passwordCheck) ||
            !passwordCheckr(password) ||
            loadingPasswordChange
          }
          className={classNames(
            "mt-5 w-full font-bold flex flex-row items-center justify-center py-2 rounded-full h-14",
            "bg-primary-500 text-white",
            "disabled:bg-[#f0f0f0] disabled:text-[#b6b6b6]"
          )}
          style={{
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.04)",
          }}
          onClick={() => {
            requestChangePasswordFetch({});
          }}
        >
          {loadingPasswordChange ? <Loading /> : "비밀번호 변경"}
        </button>
      </div>

      <Modal onClose={() => {}} open={isVerifyModalOpen}>
        <div
          className={classNames(
            "py-6 font-bold text-xl border-b w-full",
            inter.className
          )}
        >
          <span className="px-7">휴대폰 인증하기</span>
        </div>
        <div className={classNames("px-7 py-6 font-light", inter.className)}>
          <span>문자메세지로 전송된 인증번호를 입력해주세요</span>
          <Button
            onClick={async () => {
              await requestVerfiyPhoneFetch({
                fetchInit: {
                  data: {
                    phone: phone.replace(/[^0-9]/g, ""),
                  },
                },
              });
            }}
            variant="outline"
            className="mt-4 w-full font-semibold rounded-[6px] h-11 border-[#7C7C7C] text-[#7C7C7C]"
          >
            인증번호 재요청
          </Button>

          <div className="relative w-full mt-5 h-20">
            <Image
              src="/icons/Lock.svg"
              alt="lock"
              width={20}
              height={20}
              className="absolute left-1 top-3"
            />
            <Input
              type="number"
              placeholder="인증번호 입력"
              className="w-full bg-white border-b-2 pr-2 pl-9 rounded-none py-3"
              onChange={e => {
                setPhoneVerifyNumber(e.target.value);
              }}
              autoFocus
            />
            <span className="absolute w-full left-0 bottom-1 text-sm text-red-500">
              {phoneVerifyNumber ? "" : "인증번호를 확인해주세요"}
            </span>
          </div>
        </div>
        <div className="flex-row flex rounded-b h-14 font-bold">
          <Button
            onClick={() => {
              setIsVerifyModalOpen(false);
              setPhoneVerifyNumber("");
            }}
            className="w-full rounded-bl-[20px] bg-[#B6B6B6] border-none hover:bg-[#A5A5A5] active:bg-[#A5A5A5]"
          >
            닫기
          </Button>
          <Button
            onClick={async () => {
              await requestVerfiyPhoneTokenFetch({
                fetchInit: {
                  data: {
                    phone: phone.replace(/[^0-9]/g, ""),
                    token: phoneVerifyToken,
                    code: phoneVerifyNumber,
                  },
                },
              });
            }}
            className="w-full rounded-br-[20px] border-none"
          >
            확인
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default FindPasswordComponent;

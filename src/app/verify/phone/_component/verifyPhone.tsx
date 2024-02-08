"use client";

import BottomSheet from "@/app/_component/BottomSheet";
import Button from "@/app/_component/Button";
import Checkbox from "@/app/_component/Checkbox";
import HeaderContainer from "@/app/_component/HeaderContainer";
import Input from "@/app/_component/Input";
import { LoadingFullPage } from "@/app/_component/Loading";
import Modal from "@/app/_component/Modal";
import useFetch from "@/hooks/useFetch";
import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames, passwordCheck as passwordCheckr } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerifyComponent = ({ auth }: { auth: Session }) => {
  const { update } = useSession();
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [loadingPhoneVerify, setLoadingPhoneVerify] = useState(false);
  const [phoneVerifyToken, setPhoneVerifyToken] = useState("");
  const [phoneVerifyNumber, setPhoneVerifyNumber] = useState("");
  const [successRegisterModalOpen, setSuccessRegisterModalOpen] =
    useState(false);
  const { triggerFetch: requestVerfiyPhoneFetch } = useFetch(
    "/auth/verify/phonemessage",
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
        setPhoneVerifyToken(verifyToken);
      },
      onPending: () => setLoadingPhoneVerify(true),
    }
  );

  const requestRegister = async () => {
    try {
      await fetcher.post("/auth/oauth/verify/phone", {
        phone: phone.replace(/[^0-9]/g, ""),
        code: phoneVerifyNumber,
        token: phoneVerifyToken,
      });
      setSuccessRegisterModalOpen(true);

      setTimeout(() => {
        update().then(session => {
          router.replace(
            "/auth/login/app?token=" + session?.user.token.accessToken
          );
        });
      }, 3000);
    } catch (e: any | AxiosError) {
      toast("error", e.response?.data?.message || "회원가입에 실패했습니다.");
      return;
    }
  };

  return (
    <>
      {loadingPhoneVerify && <LoadingFullPage />}
      <div
        className={classNames(
          "flex flex-col text-[#7C7C7C] px-4 min-h-[88vh]",
          inter.className
        )}
      >
        <div className="flex flex-col">
          <span className="font-bold">휴대폰 번호</span>
          <div className="flex flex-row h-[50px] w-full items-center mt-1">
            <Input
              placeholder="휴대폰 번호"
              inputMode="numeric"
              className="w-full py-3.5 h-full"
              value={phone}
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
              disabled={!(phone.length > 3) || !!phoneVerifyToken}
              className={classNames(
                "rounded-[10px] text-[14px] font-bold h-full w-40 whitespace-nowrap px-3.5 ml-3"
              )}
            >
              인증번호 전송
            </Button>
          </div>
          <span className="h-4 mt-1 ml-3 text-sm text-red-500">
            {phone.length > 3 ? "" : "숫자만 입력해주세요."}
          </span>
        </div>
        <div className="flex flex-col mt-3">
          <span className="font-bold">인증번호</span>
          <div className="flex flex-row h-[50px] w-full items-center mt-1">
            <Input
              inputMode="numeric"
              placeholder="인증번호 입력"
              className="w-full py-3.5 h-full"
              onChange={e => {
                setPhoneVerifyNumber(e.target.value);
              }}
            />
          </div>
        </div>

        <Button
          onClick={requestRegister}
          className="w-full h-14 rounded-full flex items-center justify-center mt-auto mb-5"
          variant="primary"
        >
          시작하기
        </Button>
      </div>

      <Modal
        onClose={() => {
          setSuccessRegisterModalOpen(false);
        }}
        open={successRegisterModalOpen}
      >
        <div
          className={classNames(
            "py-6 font-bold w-full px-4 flex flex-col",
            inter.className
          )}
          onDragEnd={e => {}}
        >
          <Image
            src="/icons/Check.svg"
            className="mx-auto"
            alt="check"
            width={30}
            height={30}
          />
          <span className="text-xl mt-2 mx-auto text-center w-full">
            회원가입이 완료 되었습니다
          </span>
          <span className="text-sm text-center w-full">
            로그인 후 서비스를 이용해 주세요
          </span>
        </div>
      </Modal>
    </>
  );
};

export default VerifyComponent;

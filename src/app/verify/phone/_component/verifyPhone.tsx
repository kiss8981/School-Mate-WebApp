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
  const [agreementModalOpen, setAgreementModalOpen] = useState(true);
  const [agreementMarketing, setAgreementMarketing] = useState(false);
  const [agreementTerms, setAgreementTerms] = useState(false);
  const [agreementPrivacy, setAgreementPrivacy] = useState(false);
  const [agreementAge, setAgreementAge] = useState(false);
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
      const sessionData = await update();
      await fetcher.post(
        "/auth/oauth/verify/phone",
        {
          phone: phone.replace(/[^0-9]/g, ""),
          code: phoneVerifyNumber,
          token: phoneVerifyToken,
          marketingAgree: agreementMarketing,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionData?.user.token.accessToken}`,
          },
        }
      );
      setSuccessRegisterModalOpen(true);

      setTimeout(() => {
        update().then(session => {
          stackRouterPush(
            router,
            "/auth/login/app?token=" + session?.user.token.accessToken,
            "reset"
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

      <BottomSheet
        className={classNames(inter.className)}
        canClose={false}
        isOpened={agreementModalOpen}
      >
        <button
          onClick={() => {
            setAgreementPrivacy(true);
            setAgreementTerms(true);
            setAgreementAge(true);
            setAgreementMarketing(true);

            if (
              agreementPrivacy &&
              agreementTerms &&
              agreementAge &&
              agreementMarketing
            ) {
              setAgreementPrivacy(false);
              setAgreementTerms(false);
              setAgreementAge(false);
              setAgreementMarketing(false);
            }
          }}
          className="w-full bg-[#F9F9F9] h-16 flex flex-row items-center px-4 rounded-[10px]"
        >
          <Checkbox
            checked={
              agreementPrivacy &&
              agreementTerms &&
              agreementAge &&
              agreementMarketing
            }
            className="h-5 w-5 mr-3"
          />
          <span className="font-bold text-lg">약관 전체 동의</span>
        </button>

        <div className="w-full h-10 mt-4 flex flex-row justify-between items-center px-4">
          <button
            className="flex items-center justify-center"
            onClick={() => {
              setAgreementTerms(!agreementTerms);
            }}
          >
            <Checkbox className="h-5 w-5 mr-3" checked={agreementTerms} />
            <span className="font-bold text-lg">
              스쿨메이트 이용 약관
              <span className="text-sm font-normal ml-1 text-[#7c7c7c]">
                (필수)
              </span>
            </span>
          </button>
          <button
            onClick={() => {
              stackRouterPush(router, "/tos", "stack");
            }}
          >
            <Image
              src="/icons/Back.svg"
              alt="arrow"
              width={12}
              height={12}
              className="ml-auto rotate-180"
              style={{
                filter:
                  "invert(80%) sepia(2%) saturate(31%) hue-rotate(325deg) brightness(91%) contrast(93%)",
              }}
            />
          </button>
        </div>
        <div className="w-full h-10 mt-4 flex flex-row justify-between items-center px-4">
          <button
            className="flex items-center justify-center"
            onClick={() => {
              setAgreementPrivacy(!agreementPrivacy);
            }}
          >
            <Checkbox
              className="h-5 w-5 mr-3"
              checked={agreementPrivacy}
              onChange={e => {
                setAgreementPrivacy(e.target.checked);
              }}
            />
            <span className="font-bold text-lg">
              개인정보 수집 및 이용
              <span className="text-sm font-normal ml-1 text-[#7c7c7c]">
                (필수)
              </span>
            </span>
          </button>
          <button
            onClick={() => {
              stackRouterPush(router, "/privacy", "stack");
            }}
          >
            <Image
              src="/icons/Back.svg"
              alt="arrow"
              width={12}
              height={12}
              className="ml-auto rotate-180"
              style={{
                filter:
                  "invert(80%) sepia(2%) saturate(31%) hue-rotate(325deg) brightness(91%) contrast(93%)",
              }}
            />
          </button>
        </div>
        <div className="w-full h-10 mt-4 flex flex-row justify-between items-center px-4">
          <button
            className="flex items-center justify-center"
            onClick={() => {
              setAgreementAge(!agreementAge);
            }}
          >
            <Checkbox
              className="h-5 w-5 mr-3"
              checked={agreementAge}
              onChange={e => {
                setAgreementAge(e.target.checked);
              }}
            />
            <span className="font-bold text-lg">
              만 12세 이상입니다.
              <span className="text-sm font-normal ml-1 text-[#7c7c7c]">
                (필수)
              </span>
            </span>
          </button>
        </div>
        <div className="w-full h-10 mt-4 flex flex-row justify-between items-center px-4">
          <button
            onClick={() => {
              setAgreementMarketing(!agreementMarketing);
            }}
            className="flex items-center justify-center"
          >
            <Checkbox
              className="h-5 w-5 mr-3"
              checked={agreementMarketing}
              onChange={e => {
                setAgreementMarketing(e.target.checked);
              }}
            />
            <span className="font-bold text-lg">
              광고성 정보 수신 동의
              <span className="text-sm font-normal ml-1 text-[#7c7c7c]">
                (선택)
              </span>
            </span>
          </button>
        </div>
        <Button
          className="w-full rounded-full h-14 mt-5"
          onClick={() => {
            if (agreementAge && agreementPrivacy && agreementTerms) {
              setAgreementModalOpen(false);
            } else {
              if (
                !agreementPrivacy ||
                !agreementTerms ||
                !agreementAge ||
                !agreementMarketing
              ) {
                setAgreementPrivacy(true);
                setAgreementTerms(true);
                setAgreementAge(true);
                setAgreementMarketing(true);
              }
            }
          }}
        >
          {agreementAge && agreementPrivacy && agreementTerms
            ? "동의하고 가입하기"
            : "전체 동의하기"}
        </Button>
      </BottomSheet>
    </>
  );
};

export default VerifyComponent;

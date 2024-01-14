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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterComponent = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  // const [email, setEmail] = useState("");
  // const [emailDomain, setEmailDomain] = useState("");
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [loadingPhoneVerify, setLoadingPhoneVerify] = useState(false);
  const [phoneVerifyToken, setPhoneVerifyToken] = useState("");
  const [phoneVerifyNumber, setPhoneVerifyNumber] = useState("");
  const [phoneVerifyed, setPhoneVerifyed] = useState(false);
  const [useCustomEmail, setUseCustomEmail] = useState(false);
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

  const requestRegister = async () => {
    try {
      await fetcher.post("/auth/signup", {
        // email: email + "@" + emailDomain,
        phone: phone.replace(/[^0-9]/g, ""),
        provider: "id",
        password,
        name,
        code: phoneVerifyNumber,
        token: phoneVerifyToken,
        marketingAgree: agreementMarketing,
      });
      setSuccessRegisterModalOpen(true);

      setTimeout(() => {
        stackRouterPush(router, "/auth/login", "reset", false);
      }, 2500);
    } catch (e: any | AxiosError) {
      toast("error", e.response?.data?.message || "회원가입에 실패했습니다.");
      return;
    }
  };

  return (
    <>
      {loadingPhoneVerify && <LoadingFullPage />}
      <HeaderContainer title="회원가입">
        <div
          className={classNames(
            "flex flex-col text-[#7C7C7C] px-4 min-h-[88vh]",
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
                className="w-full py-3.5 h-full"
                value={phone}
                disabled={phoneVerifyed}
                autoFocus
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
                onClick={async () => {
                  await requestVerfiyPhoneFetch({
                    fetchInit: {
                      data: {
                        phone: phone.replace(/[^0-9]/g, ""),
                      },
                    },
                  });
                }}
                disabled={!(phone.length > 3) || phoneVerifyed}
                className={classNames(
                  "rounded-[10px] text-[14px] font-bold h-full w-40 whitespace-nowrap px-3.5 ml-3"
                )}
              >
                {phoneVerifyed ? "인증완료" : "인증번호 전송"}
              </Button>
            </div>
            <span className="h-4 mt-1 ml-3 text-sm text-red-500">
              {phone.length > 3 ? "" : "숫자만 입력해주세요."}
            </span>
          </div>
          <div className="flex flex-col mt-5">
            <span className="font-bold">
              이름<span className="text-red-500">*</span>
            </span>
            <Input
              placeholder="이름을 입력하세요"
              className="w-full py-3.5 h-[50px] mt-1"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col mt-9 relative">
            <span className="font-bold">
              비밀번호<span className="text-red-500">*</span>
            </span>
            <span className="absolute right-0 text-red-500 text-sm top-2">
              8자이상 영문, 숫자, 특수문자 조합
            </span>
            <div className="mt-3 h-[50px] relative">
              <Input
                placeholder="비밀번호"
                className="w-full py-3.5 h-full pr-24"
                value={password}
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                onChange={(e) => {
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
          {/* <div className="flex flex-col mt-9">
            <span className="font-bold">
              이메일<span className="text-red-500">*</span>
            </span>
            <div className="mt-3 h-[50px] flex flex-row items-center">
              <Input
                placeholder="이메일"
                className="w-full py-3.5 h-full"
                value={email}
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
              <span className="mx-2">@</span>
              {useCustomEmail ? (
                <Input
                  className="w-full py-3.5 h-full"
                  value={emailDomain}
                  onChange={e => {
                    setEmailDomain(e.target.value);
                  }}
                />
              ) : (
                <>
                  <select
                    className="w-full h-full text-[14px] font-bold rounded-[10px] px-2 bg-[#f9f9f9]"
                    defaultValue="선택"
                    onChange={e => {
                      if (e.target.value === "직접입력") {
                        setUseCustomEmail(true);
                        return;
                      }
                      setEmailDomain(e.target.value);
                    }}
                  >
                    <option value="naver.com">naver.com</option>
                    <option value="gmail.com">gmail.com</option>
                    <option value="daum.net">daum.net</option>
                    <option value="kakao.com">kakao.com</option>
                    <option value="직접입력">직접입력</option>
                    <option value="선택">선택</option>
                  </select>
                </>
              )}
            </div>
            <span className="mt-1 ml-3 text-sm text-[#b6b6b6]">
              더 안전하게 계정을 보호하려면 가입 후 [내정보 {">"} 회원정보
              수정]에서 이메일 인증을 진행해주세요.
            </span>
          </div> */}

          <Button
            disabled={
              !(
                (
                  phone.length > 3 &&
                  name.length > 0 &&
                  passwordCheckr(password) &&
                  password === passwordCheck
                )
                // && email.length > 0 &&
                // emailDomain.length > 0
              )
            }
            onClick={requestRegister}
            className="w-full h-14 rounded-full flex items-center justify-center mt-auto"
            variant="primary"
          >
            가입하기
          </Button>
        </div>
      </HeaderContainer>

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
              onChange={(e) => {
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
            인증
          </Button>
        </div>
      </Modal>

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
          onDragEnd={(e) => {}}
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
              onChange={(e) => {
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
              onChange={(e) => {
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
              onChange={(e) => {
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

export default RegisterComponent;

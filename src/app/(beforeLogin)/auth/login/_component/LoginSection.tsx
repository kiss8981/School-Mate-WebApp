"use client";

import { classNames } from "@/lib/uitls";
import { getSession, signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/app/_component/Button";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/lib/stackRouter";
import { setCookie } from "@/lib/csrUtils";
import { Loading } from "@/app/_component/Loading";

const LoginSection = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loginfLoading, setLoginLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loadingKakao, setLoadingKakao] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);

  useEffect(() => {
    const handleLogin = async (event: MessageEvent) => {
      try {
        const { type: eventType, data } = JSON.parse(event.data);
        if (eventType === "LOGIN_EVENT") {
          if (data.type === "callback") {
            const res = await signIn("credentials", {
              redirect: false,
              provider: data.provider,
              code: data.code,
            });

            if (!res?.ok) {
              setLoadingKakao(false);
              setLoadingApple(false);
            } else {
              const session = await getSession();

              if (!session?.user) {
                toast("error", "로그인에 실패하였습니다.");
                return;
              }

              if (window.ReactNativeWebView) {
                sendWebviewEvent("LOGIN_EVENT", {
                  type: "callback",
                  token: {
                    accessToken: session?.user.token.accessToken,
                    refreshToken: session?.user.token.refreshToken,
                  },
                });
              }
              setTimeout(() => {
                setLoadingKakao(false);
                setLoadingApple(false);
                stackRouterPush(
                  router,
                  `/auth/login/app?token=${session?.user.token.accessToken}`,
                  "reset"
                );
              }, 1000);
            }
          } else if (data.type === "cancel") {
            setLoadingKakao(false);
            setLoadingApple(false);
          }
        }
      } catch (err) {}
    };

    // @ts-ignore
    document.addEventListener("message", handleLogin);
    window.addEventListener("message", handleLogin);

    return () => {
      window.removeEventListener("message", handleLogin);
      // @ts-ignore
      document.removeEventListener("message", handleLogin);
    };
  }, []);

  const requestLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      phone,
      provider: "id",
      password,
    });

    if (!res?.ok) {
      setLoginLoading(false);
      toast("error", "아이디 또는 비밀번호가 일치하지 않습니다.");
    } else {
      setLoginLoading(false);
      const session = await getSession();

      if (!session?.user) {
        toast("error", "로그인에 실패하였습니다.");
        return;
      }

      setCookie("Authorization", session?.user.token.accessToken, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
        domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
      });

      if (window.ReactNativeWebView) {
        sendWebviewEvent("LOGIN_EVENT", {
          type: "callback",
          loginType: "phone",
          token: {
            accessToken: session?.user.token.accessToken,
            refreshToken: session?.user.token.refreshToken,
          },
        });
      }
      stackRouterPush(router, "/main", "reset");
    }
  };

  const requestKakaoLogin = async () => {
    setLoadingKakao(true);
    sendWebviewEvent("LOGIN_EVENT", {
      type: "request",
      loginType: "kakao",
    });
  };

  const requestAppleLogin = async () => {
    setLoadingApple(true);
    sendWebviewEvent("LOGIN_EVENT", {
      type: "request",
      loginType: "apple",
    });
  };

  return (
    <>
      <form
        className={classNames("font-light w-full mt-16")}
        onSubmit={requestLogin}
      >
        <div className="space-y-14 flex flex-col">
          <input
            inputMode="numeric"
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
              type="button"
              className="absolute right-0 top-0 h-full px-2 pb-2"
              onClick={() => {
                setIsPasswordVisible(!isPasswordVisible);
              }}
            >
              <Image src="/icons/Eye.svg" alt="eye" width={20} height={20} />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            stackRouterPush(router, "/auth/findpassword");
          }}
          className="mt-4 text-[#B6B6B6] text-sm w-full text-right flex flex-row items-center justify-end"
        >
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
        <Button
          type="submit"
          isLoading={loginfLoading}
          className="w-full py-4 font-semibold text-[14px] rounded-full mt-10"
        >
          로그인
        </Button>
      </form>
      <div className="flex flex-row items-center justify-center font-semibold text-[10px] my-6">
        <hr className="w-full h-1 border-[#B6B6B6]" />
        <span className="w-40 text-[#B6B6B6] mx-4">SNS LOGIN</span>
        <hr className="w-full h-1 border-[#B6B6B6]" />
      </div>

      <div className="flex flex-col items-center justify-center mb-10 mt-auto">
        <Button
          onClick={requestKakaoLogin}
          className="w-full font-bold text-[14px] py-4 flex flex-row items-center justify-center rounded-full bg-[#FEE500] text-[#191919] border-none hover:bg-[#FEE500] active:bg-[#FEE500]"
          isLoading={loadingKakao}
        >
          {loadingKakao ? (
            <Loading color="white" />
          ) : (
            <>
              <Image
                src="/icons/KakaoLogoSm.svg"
                alt="kakao"
                width={20}
                height={20}
                className="mr-2"
              />
              카카오로 계속하기
            </>
          )}
        </Button>
        {typeof window !== "undefined" &&
          navigator?.userAgent.includes("ios") && (
            <Button
              onClick={requestAppleLogin}
              className="w-full font-bold text-[14px] py-4 flex flex-row items-center justify-center rounded-full mt-4 bg-black text-white border-none hover:bg-black active:bg-black"
              isLoading={loadingApple}
            >
              {loadingApple ? (
                <Loading color="white" />
              ) : (
                <>
                  <Image
                    src="/icons/AppleLogoSm.svg"
                    alt="apple  "
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Apple로 계속하기
                </>
              )}
            </Button>
          )}
      </div>
    </>
  );
};

export default LoginSection;

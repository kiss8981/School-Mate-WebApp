import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import { LoadingFullPage } from "@/app/_component/Loading";
import fetcher from "@/lib/fetch";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignoutConfirm = ({ auth }: { auth: Session }) => {
  const [verifyCode, setVerifyCode] = useState("");
  const [verfiyToken, setVerifyToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleSignout = async (event: MessageEvent) => {
      try {
        const { type: eventType, data } = JSON.parse(event.data);
        if (eventType === "LOGOUT_EVENT") {
          await signOut({ redirect: true, callbackUrl: "/intro" });
        } else if (eventType === "APPLE_SIGNOUT_EVENT") {
          await requestSignout(data.code);
        }
      } catch (err) {}
    };

    // @ts-ignore
    document.addEventListener("message", handleSignout);
    window.addEventListener("message", handleSignout);

    return () => {
      window.removeEventListener("message", handleSignout);
      // @ts-ignore
      document.removeEventListener("message", handleSignout);
    };
  }, [verifyCode, verfiyToken]);

  const requestLogout = async () => {
    if (window.ReactNativeWebView) {
      sendWebviewEvent("LOGOUT_EVENT", {});
    } else {
      signOut({ redirect: true, callbackUrl: "/intro" });
    }
  };

  const requestSignout = async (applelogoutcode?: string) => {
    try {
      await fetcher.delete("/auth/me", {
        data: {
          phone: auth.user.user.phone,
          code: verifyCode,
          token: verfiyToken,
          ...(applelogoutcode && { applelogoutcode: applelogoutcode }),
        },
      });
      requestLogout();
      toast("success", "계정이 삭제되었습니다.");
    } catch (error: any) {
      toast(
        "error",
        error.response?.data?.message ||
          "계정 삭제에 실패했습니다. 문제가 지속될 경우 고객센터로 문의해주세요."
      );
    }
  };

  const requestSignoutPhoneVerify = async () => {
    try {
      setLoading(true);
      await fetcher.post("/auth/verify/phone", {
        phone: auth.user.user.phone,
        code: verifyCode,
        token: verfiyToken,
      });

      if (auth.user.user.socialLogin?.provider == "apple") {
        sendWebviewEvent("APPLE_SIGNOUT_EVENT", {});
      } else {
        await requestSignout();
      }
    } catch (error: any) {
      toast(
        "error",
        error.response?.data?.message ||
          "계정 삭제에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  const requestPhoneVerify = async () => {
    try {
      setLoading(true);
      const { data } = await fetcher.post("/auth/verify/login/phonemessage", {
        phone: auth.user.user.phone,
      });
      toast("success", "인증번호가 전송되었습니다.");
      setVerifyToken(data.data);
    } catch (error: any) {
      toast(
        "error",
        error.response?.data?.message ||
          "인증번호 전송에 실패했습니다. 다시 시도해주세요."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {loading && <LoadingFullPage />}
      <div className="flex flex-col items-start px-5 h-[88vh]">
        <div className="w-full flex flex-col">
          <span className="text-[#7C7C7C] tex-sm font-bold">전화번호 인증</span>
          <Input
            className="mt-1 h-12"
            placeholder={
              verfiyToken
                ? "인증번호를 입력해주세요."
                : "인증번호를 전송해주세요."
            }
            value={verifyCode}
            disabled={!verfiyToken}
            onChange={e => setVerifyCode(e.target.value)}
          />
        </div>
        <Button
          className="mt-auto rounded-full h-14 w-full mb-5"
          onClick={verfiyToken ? requestSignoutPhoneVerify : requestPhoneVerify}
        >
          {verfiyToken ? "계정 삭제" : "인증번호 전송"}
        </Button>
      </div>
    </>
  );
};

export default SignoutConfirm;

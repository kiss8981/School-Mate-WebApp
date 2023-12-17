"use client";

import Input from "@/app/_component/Input";
import { inter } from "@/lib/fonts";
import { classNames, passwordCheck } from "@/lib/uitls";
import { useState } from "react";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { stackRouterPush } from "@/lib/stackRouter";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/webviewHandler";
import { Loading } from "@/app/_component/Loading";

const ChangePassword = () => {
  const router = useRouter();
  const [beforePassword, setBeforePassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("");
  const [loadingPassword, setLoadingPassword] = useState<boolean>(false);

  const { triggerFetch: changepasswordHandler } = useFetch(
    "/auth/changepass",
    "POST",
    {
      fetchInit: {
        data: {
          password: beforePassword,
          newPassword: newPassword,
        },
      },
      successToast: {
        message: "비밀번호가 변경되었습니다.",
      },
      onSuccess: () => {
        setLoadingPassword(false);
        stackRouterPush(router, "/me", "reset");
      },
      onPending: () => setLoadingPassword(true),
      onError(statusCode, statusText, body) {
        setLoadingPassword(false);
        toast("error", statusText || "비밀번호 변경에 실패하였습니다.");
      },
    }
  );

  return (
    <>
      <div className={classNames(inter.className, "flex flex-col px-5 pt-2")}>
        <div className="flex flex-col">
          <span className="text-[#7C7C7C] text-sm font-bold">
            기존 비밀번호
          </span>
          <div className="flex flex-row items-center mt-2 w-full">
            <Input
              value={beforePassword}
              type="password"
              className="py-3 w-full text-sm"
              placeholder="기존 비밀번호"
              onChange={e => {
                setBeforePassword(e.target.value);
              }}
            />
          </div>
        </div>
        <hr className="my-4 w-full" />
        <div className="flex flex-col">
          <div className="w-full flex flex-row">
            <span className="text-[#7C7C7C] text-sm font-bold">새비밀번호</span>
            <span className="font-light text-[#FF6363] ml-auto text-[0.7rem] mt-auto">
              8자이상 영문, 숫자, 특수문자 조합
            </span>
          </div>
          <div className="flex flex-row items-center mt-2 w-full relative">
            <Input
              value={newPassword}
              type="password"
              className="py-3 w-full text-sm"
              placeholder="새비밀번호"
              onChange={e => {
                setNewPassword(e.target.value);
              }}
            />
            {!passwordCheck(newPassword) && (
              <span className="absolute top-3 right-2 text-red-500 text-sm flex flex-row">
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
        </div>
        <div className="flex flex-col mt-2">
          <div className="flex flex-row items-center w-full relative">
            <Input
              value={newPasswordConfirm}
              type="password"
              className="py-3 w-full text-sm"
              placeholder="비밀번호 확인"
              onChange={e => {
                setNewPasswordConfirm(e.target.value);
              }}
            />
            {newPassword != newPasswordConfirm && (
              <span className="absolute top-3 right-2 text-red-500 text-sm flex flex-row">
                일치하지 않음
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
      </div>

      <div className="px-5 w-full justify-center fixed bottom-3">
        <button
          className={classNames(
            "mt-5 w-full font-bold flex flex-row items-center justify-center py-2 rounded-full h-14",
            "bg-primary-500 text-white",
            "disabled:bg-[#f0f0f0] disabled:text-[#b6b6b6]"
          )}
          disabled={
            !passwordCheck(newPassword) ||
            newPassword != newPasswordConfirm ||
            loadingPassword
          }
          onClick={() => {
            changepasswordHandler({});
          }}
          style={{
            boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.04)",
          }}
        >
          {loadingPassword ? <Loading /> : <span>비밀번호 변경</span>}
        </button>
      </div>
    </>
  );
};

export default ChangePassword;

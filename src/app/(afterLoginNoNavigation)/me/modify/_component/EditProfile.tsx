"use client";

import { classNames } from "@/lib/uitls";
import { Session } from "next-auth";
import { useRef, useState } from "react";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { toast } from "@/lib/webviewHandler";
import { LoadingFullPage } from "@/app/_component/Loading";
import { stackRouterBack, stackRouterPush } from "@/lib/stackRouter";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { inter } from "@/lib/fonts";

const EditProfile = ({ auth }: { auth: Session }) => {
  const router = useRouter();
  const { update: updateSession } = useSession();
  const [profile, setProfile] = useState(auth.user.user.profile);
  const [nickname, setNickname] = useState(auth.user.user.name);
  const [phone, setPhone] = useState(auth.user.user.phone as string);
  const [email, setEmail] = useState(auth.user.user.email as string);
  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const uploadImageRef = useRef<HTMLInputElement>(null);
  const nameOutsideRef = useOutsideClick(() => {
    setEditName(false);
  });
  const emailOutsideRef = useOutsideClick(() => {
    setEditEmail(false);
  });

  const { triggerFetch: updateEmail } = useFetch("/auth/me/email", "PATCH", {
    onPending: () => setLoading(true),
    onSuccess: async (status, message, data) => {
      await updateSession();
      stackRouterBack(router);
    },
    onError: (status, message) => {
      setLoading(false);
      toast("error", message);
    },
    successToast: {
      message: "이메일이 변경되었습니다.",
    },
  });

  const { triggerFetch: updateNickname } = useFetch(
    "/auth/me/nickname",
    "PATCH",
    {
      onPending: () => setLoading(true),
      onSuccess: async (status, message, data) => {
        await updateSession();
        stackRouterBack(router);
      },
      onError: (status, message) => {
        setLoading(false);
        toast("error", message);
      },
      successToast: {
        message: "닉네임이 변경되었습니다.",
      },
    }
  );
  const { triggerFetch: updateProfile } = useFetch(
    "/auth/me/profile",
    "PATCH",
    {
      fetchInit: {
        headers: {
          "Content-Type": "multipart/form-data",
          storage: "profile",
        },
      },
      onPending: () => setLoading(true),
      onSuccess: async (status, message, data) => {
        await updateSession();
        setLoading(false);
        setProfile(data);
        stackRouterBack(router);
      },
      onError: (status, message) => {
        setLoading(false);
        toast("error", message);
      },
      successToast: {
        message: "프로필이 변경되었습니다.",
      },
    }
  );

  return (
    <>
      {loading && <LoadingFullPage />}
      <div className={classNames(inter.className, "px-5 pt-5")}>
        <div className="flex flex-col mx-auto items-center justify-center border-b pb-7">
          <div
            onClick={() => {
              uploadImageRef.current?.click();
            }}
            className="w-[120px] h-[120px] bg-[#d9d9d9] rounded-full relative"
            style={{
              backgroundImage: `url(${
                profileFile
                  ? URL.createObjectURL(profileFile)
                  : profile
                  ? process.env.NEXT_PUBLIC_S3_URL + profile
                  : "/images/schoolmate/logobg.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input
              ref={uploadImageRef}
              onChange={e => {
                if (e.target.files) {
                  const file = e.target.files[0];
                  setProfileFile(file);
                  const formData = new FormData();
                  formData.append("img", file);
                  updateProfile({
                    fetchInit: {
                      data: formData,
                    },
                  });
                  e.target.value = "";
                }
              }}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
            />
            <button className="absolute bottom-0 right-0 bg-white border rounded-full w-10 h-10">
              <Image
                src="/icons/Camera.svg"
                alt="plus"
                width={20}
                height={20}
                className="mx-auto"
              />
            </button>
          </div>
          <button
            onClick={() => {
              updateProfile({});
            }}
            disabled={!profile}
            className={classNames(
              "mt-5 font-bold flex flex-row items-center text-sm",
              profile ? "text-primary-500" : "text-gray-400"
            )}
          >
            기본 이미지
          </button>
        </div>
        <div className="mt-5">
          <div className="flex flex-row w-full" ref={nameOutsideRef}>
            <div className="text-[#7C7C7C] w-24">이름</div>
            <div className="relative w-full">
              {editName ? (
                <>
                  <input
                    className="w-full border-b border-[#7C7C7C] focus:outline-none pb-1 rounded-none"
                    value={nickname}
                    onChange={e => {
                      setNickname(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      setEditName(false);
                      updateNickname({
                        fetchInit: {
                          data: {
                            nickname,
                          },
                        },
                      });
                    }}
                    className="absolute right-2 pb-2"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Image
                      src="/icons/Save.svg"
                      alt="save"
                      width={15}
                      height={15}
                      className="mx-auto"
                    />
                  </button>
                </>
              ) : (
                <>
                  <span>{nickname}</span>
                  <button
                    className="absolute right-2"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => {
                      setEditName(true);
                    }}
                  >
                    <Image
                      src="/icons/Edit.svg"
                      alt="edit"
                      width={15}
                      height={15}
                      className="mx-auto"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-row w-full">
            <div className="text-[#7C7C7C] w-24">연락처</div>
            <div className="relative w-full">
              <span>{phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex flex-row w-full" ref={emailOutsideRef}>
            <div className="text-[#7C7C7C] w-24">이메일</div>
            <div className="relative w-full">
              {editEmail ? (
                <>
                  <input
                    className="w-full border-b border-[#7C7C7C] focus:outline-none pb-1 rounded-none"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      setEditEmail(false);
                      updateEmail({
                        fetchInit: {
                          data: {
                            email,
                          },
                        },
                      });
                    }}
                    className="absolute right-2 pb-2"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    <Image
                      src="/icons/Save.svg"
                      alt="save"
                      width={15}
                      height={15}
                      className="mx-auto"
                    />
                  </button>
                </>
              ) : (
                <>
                  <span>{email}</span>
                  <button
                    className="absolute right-2"
                    style={{
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                    onClick={() => {
                      setEditEmail(true);
                    }}
                  >
                    <Image
                      src="/icons/Edit.svg"
                      alt="edit"
                      width={15}
                      height={15}
                      className="mx-auto"
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

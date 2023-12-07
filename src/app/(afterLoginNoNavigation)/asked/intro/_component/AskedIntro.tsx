"use client";

import Input from "@/app/_component/Input";
import { LoadingFullPage } from "@/app/_component/Loading";
import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const AskedIntro = ({ auth }: { auth: Session }) => {
  const router = useRouter();
  const upoadImageRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [profileKey, setProfileKey] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");

  const uploadImage = async (profile: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.set("img", profile);

    try {
      const { data } = await fetcher("/image", {
        method: "POST",
        data: formData,
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
          storage: "asked",
          "Content-Type": "multipart/form-data",
        },
      });
      setProfileKey(data.data);
      setProfile(profile);
      toast("success", "프로필 사진이 업로드 되었습니다.");
    } catch (e: any) {
      setProfile(null);
      setProfileKey(undefined);
      toast("error", e.response.data.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async () => {
    setLoading(true);
    try {
      await fetcher(`/image/${profileKey}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      });
      setProfileKey(undefined);
      setProfile(null);
    } catch (e: any) {
      toast("error", e.response.data.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      await fetcher("/asked/create", {
        method: "POST",
        data: {
          image: profileKey,
          id: name,
          tag1,
          tag2,
        },
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      });
      toast("success", "프로필이 생성되었습니다.");
      stackRouterPush(router, "/asked", "reset");
    } catch (e: any) {
      toast("error", e.response.data.message || e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingFullPage />}
      <div className={classNames("h-[88vh] w-full px-5 pt-5", inter.className)}>
        <div className="flex flex-col mx-auto items-center justify-center">
          <div
            onClick={() => {
              upoadImageRef.current?.click();
            }}
            className="w-[140px] h-[140px] bg-[#d9d9d9] rounded-full relative"
            style={{
              backgroundImage: `url(${
                profile
                  ? URL.createObjectURL(profile)
                  : "/images/schoolmate/logobg.svg"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <input
              ref={upoadImageRef}
              onChange={e => {
                if (e.target.files) {
                  uploadImage(e.target.files[0]);
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
              deleteImage();
            }}
            disabled={!profileKey}
            className={classNames(
              "mt-5 font-bold flex flex-row items-center text-sm",
              profile ? "text-primary-500" : "text-gray-400"
            )}
          >
            기본 이미지
          </button>

          <div className="w-full flex flex-col mt-5">
            <span className="text-lg font-bold">에스크 아이디</span>
            <Input
              className="mt-2 h-12"
              value={name}
              placeholder="schoolmate"
              onChange={e => {
                if (e.target.value.length > 10) return;
                if (/^[a-zA-Z0-9]*$/.test(e.target.value) === false) return;
                setName(e.target.value);
              }}
            />
            <span className="ml-2 mt-1 text-[#b6b6b6] text-sm">
              에스크 내에서만 사용하는 아이디에요 (영문, 숫자만 가능)
            </span>
          </div>
          <div className="w-full flex flex-col mt-5 pb-32">
            <div className="w-full flex flex-row space-x-3">
              <div className="flex w-full flex-col">
                <span className="text-lg font-bold">소개 태그 1</span>
                <Input
                  className="mt-2 h-12 w-full"
                  maxLength={4}
                  value={tag1}
                  placeholder="게임"
                  onChange={e => {
                    if (e.target.value.length > 4) return;
                    setTag1(e.target.value);
                  }}
                />
              </div>
              <div className="flex w-full flex-col">
                <span className="text-lg font-bold">소개 태그 2</span>
                <Input
                  className="mt-2 h-12 w-full"
                  maxLength={4}
                  value={tag2}
                  placeholder="운동"
                  onChange={e => {
                    if (e.target.value.length > 4) return;
                    setTag2(e.target.value);
                  }}
                />
              </div>
            </div>
            <span className="ml-2 mt-1 text-[#b6b6b6] text-sm">
              태그는 2~3자 이내로 작성하는게 좋아요
            </span>
          </div>
        </div>
      </div>
      {name && tag1 && tag2 && (
        <div className="px-5 w-full justify-center fixed bottom-3">
          <button
            onClick={handleCreateUser}
            disabled={!(name && tag1 && tag2)}
            className={classNames(
              "mt-5 w-full font-bold flex flex-row items-center justify-center py-2 rounded-full h-14",
              name && tag1 && tag2
                ? "bg-primary-500 text-white"
                : "bg-[#f0f0f0] text-[#b6b6b6]"
            )}
            style={{
              boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.04)",
            }}
          >
            완료
          </button>
        </div>
      )}
    </>
  );
};

export default AskedIntro;

"use client";

import Input from "@/app/_component/Input";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import { useRef, useState } from "react";

const AskedIntro = () => {
  const upoadImageRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [tag1, setTag1] = useState("");
  const [tag2, setTag2] = useState("");

  return (
    <>
      <div className={classNames("h-[88vh] w-full px-5 pt-5", inter.className)}>
        <div className="flex flex-col mx-auto items-center justify-center">
          <div
            onClick={() => {
              upoadImageRef.current?.click();
            }}
            className="w-[160px] h-[160px] bg-[#d9d9d9] rounded-full relative"
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
              onChange={(e) => {
                if (e.target.files) {
                  setProfile(e.target.files[0]);
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
              setProfile(null);
            }}
            className={classNames(
              "mt-5 font-bold flex flex-row items-center text-sm",
              profile ? "text-primary-500" : "text-gray-400"
            )}
          >
            기본 이미지
          </button>

          <div className="w-full flex flex-col mt-5">
            <span className="text-lg font-bold">에스크 이름</span>
            <Input
              className="mt-2 h-12"
              placeholder="에스크 이름을 입력해주세요."
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <span className="ml-2 mt-1 text-[#b6b6b6] text-sm">
              에스크 내에서만 사용하는 이름이에요
            </span>
          </div>
          <div className="w-full flex flex-col mt-5">
            <div className="w-full flex flex-row space-x-3">
              <div className="flex w-full flex-col">
                <span className="text-lg font-bold">소개 태그 1</span>
                <Input
                  className="mt-2 h-12 w-full"
                  maxLength={4}
                  onChange={(e) => {
                    setTag1(e.target.value);
                  }}
                />
              </div>
              <div className="flex w-full flex-col">
                <span className="text-lg font-bold">소개 태그 2</span>
                <Input
                  className="mt-2 h-12 w-full"
                  maxLength={4}
                  onChange={(e) => {
                    setTag2(e.target.value);
                  }}
                />
              </div>
            </div>
            <span className="ml-2 mt-1 text-[#b6b6b6] text-sm">
              태그는 2~3자 이내로 작성하는게 좋아요
            </span>
          </div>
          <div className="px-5 w-full justify-center fixed bottom-3">
            <button
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
        </div>
      </div>
    </>
  );
};

export default AskedIntro;

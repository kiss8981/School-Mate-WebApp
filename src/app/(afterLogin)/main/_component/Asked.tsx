import Button from "@/app/_component/Button";
import Image from "next/image";
import { classNames } from "@/lib/uitls";
import { AskedWithUser } from "@/types/asked";
import { AxiosResponse } from "axios";
import React from "react";
import { roboto } from "@/lib/fonts";

interface Props {
  data: Promise<AxiosResponse>;
}

const Asked = async ({ data }: Props) => {
  const askeds = (await data.then(res => res.data.data)) as AskedWithUser[];
  return (
    <>
      <div
        className={classNames(
          "mt-3 flex flex-row overflow-scroll space-x-4 scrollbar-hide",
          roboto.className
        )}
      >
        {askeds.map((asked, index) => (
          <div
            key={index}
            className={classNames(
              `w-[140px] h-[200px] flex-shrink-0 relative bg-no-repeat bg-center rounded-[10px]`,
              asked.user.profile ? "bg-cover" : ""
            )}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.44), rgba(0, 0, 0, 0.44)), url(${
                asked.user.profile
                  ? asked.user.profile
                  : "/images/schoolmate/logo.svg"
              })`,
            }}
          >
            <span className="absolute text-center text-white font-bold top-[50%] left-[50%] transform text-xl translate-x-[-50%] translate-y-[-50%]">
              {asked.user.name}
            </span>

            <div className="absolute bottom-3 left-[50%] transform translate-x-[-50%] w-full px-4">
              <Button className="flex flex-row items-center rounded-full bg-white text-black border-none py-1.5 w-full justify-center">
                <Image
                  src="/icons/PlusOnly.svg"
                  alt="더보기"
                  className="mr-1"
                  width={12}
                  height={12}
                  style={{
                    filter:
                      "invert(100%) sepia(0%) saturate(7492%) hue-rotate(218deg) brightness(100%) contrast(99%)",
                  }}
                />
                <span className="font-bold text-sm">에스크</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const AskedSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;
  return (
    <>
      <div className="h-[200px] mt-4 flex flex-row space-x-4 w-full">
        <div
          className={`relative h-[200px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
    </>
  );
};

export { Asked, AskedSkeleton };

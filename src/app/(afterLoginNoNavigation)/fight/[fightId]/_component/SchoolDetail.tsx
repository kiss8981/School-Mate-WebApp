"use client";

import { NanumGothic } from "@/lib/fonts";
import { classNames, numberWithCommas } from "@/lib/uitls";
import { School } from "schoolmate-types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/lib/stackRouter";

export const SchoolDetailWithImage = ({
  index,
  rank,
  fightId,
}: {
  index: number;
  fightId: string;
  rank: {
    schoolId: string;
    school: School;
    totalScore: number;
  };
}) => {
  const router = useRouter();

  return (
    <>
      <button
        className={classNames(
          "w-full border rounded-[20px] flex flex-row py-3 min-h-[95px] cursor-pointer px-4 bg-white relative overflow-hidden z-0",
          NanumGothic.className
        )}
        onClick={() => {
          stackRouterPush(router, `/fight/${fightId}/${rank.schoolId}`);
        }}
      >
        <div className="flex flex-col items-start z-10">
          <span>#{index + 1}</span>
          <span className="leading-none mt-0.5 font-bold">
            {rank.school.defaultName}
          </span>
        </div>
        <span className="mt-auto ml-auto text-lg font-bold">
          {numberWithCommas(rank.totalScore)}점
        </span>
        <div className="absolute opacity-50 -left-12 z-0 top-1/2 transform -translate-y-1/2">
          <Image
            src={`/icons/Tropy${index + 1}.svg`}
            alt="logo"
            width={160}
            height={160}
          />
        </div>
      </button>
    </>
  );
};

export const SchoolDetail = ({
  rank,
  index,
  fightId,
}: {
  index: number;
  fightId: string;
  rank: {
    schoolId: string;
    school: School;
    totalScore: number;
  };
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => {
        stackRouterPush(router, `/fight/${fightId}/${rank.schoolId}`);
      }}
      className="w-full border rounded-[20px] flex flex-row items-center py-3 px-4 bg-white"
    >
      <span className="font-bold">
        #{index + 1} {rank.school.defaultName}
      </span>
      <span className="mt-auto ml-auto font-bold">
        {numberWithCommas(rank.totalScore)}점
      </span>
    </button>
  );
};

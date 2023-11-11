"use client";

import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { stackRouterPush } from "@/lib/stackRouter";

const HeaderBadage: React.FC<{
  title: string;
  description: string;
  link: string;
}> = ({ title, description, link }) => {
  const router = useRouter();
  return (
    <>
      <button
        onClick={() => {
          stackRouterPush(router, link, "stack");
        }}
        className="w-full rounded-[14px] bg-[#f3f4f8] justify-between items-center pl-4 pr-5 flex flex-row py-4"
      >
        <div className="flex flex-col items-start">
          <span
            className={classNames("font-bold text-[14px]", inter.className)}
            style={{
              lineHeight: "normal",
            }}
          >
            {title}
          </span>
          <span
            className={classNames(
              "font-semibold text-[12px] text-[#646464] mt-1",
              inter.className
            )}
            style={{
              lineHeight: "normal",
            }}
          >
            {description}
          </span>
        </div>
        <Image
          src="/icons/Back.svg"
          alt="arrow"
          width={10}
          height={10}
          className="rotate-180"
        />
      </button>
    </>
  );
};

export default HeaderBadage;

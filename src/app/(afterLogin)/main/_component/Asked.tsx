import Button from "@/app/_component/Button";
import Image from "next/image";
import { classNames } from "@/lib/uitls";
import { AskedWithUser } from "@/types/asked";
import { AxiosResponse } from "axios";
import React from "react";
import { roboto } from "@/lib/fonts";
import AskedItem from "./AskedItem";

interface Props {
  data: Promise<AxiosResponse>;
}

const Asked = async ({ data }: Props) => {
  const askeds = (await data.then(res => res.data.data)) as AskedWithUser[];
  return (
    <>
      <div
        className={classNames(
          "mt-3 flex flex-row overflow-scroll space-x-4 scrollbar-hide pr-5",
          roboto.className
        )}
      >
        {askeds.map((asked, index) => (
          <AskedItem asked={asked} key={index} index={index} />
        ))}
      </div>
    </>
  );
};

const AskedSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;
  return (
    <>
      <div className="h-[200px] mt-4 flex flex-row space-x-4 w-full px-4">
        <div
          className={`relative h-[200px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
    </>
  );
};

export { Asked, AskedSkeleton };
export default Asked;

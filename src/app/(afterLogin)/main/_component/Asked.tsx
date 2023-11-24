import { AskedWithUser } from "@/types/asked";
import { AxiosResponse } from "axios";
import React from "react";

interface Props {
  data: Promise<AxiosResponse>;
}

const Asked = async ({ data }: Props) => {
  const askeds = (await data.then(res => res.data.data)) as AskedWithUser[];
  return (
    <>
      {askeds.map((asked, index) => (
        <div key={index} className="w-[140px] h-[200px] relative px-3">
          <span className="absolute">{asked.user.name}</span>
        </div>
      ))}
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

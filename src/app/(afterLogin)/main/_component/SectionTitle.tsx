"use client";

import { stackRouterPush } from "@/lib/stackRouter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  subTitle: string;
  path: string;
}

const SectionTitle = ({ title, subTitle, path }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-row mb-4">
      <div className="flex flex-col w-full">
        <span className="text-[#b6b6b6] text-sm">{title}</span>
        <div className="flex items-center justify-between w-full">
          <span className="text-xl font-bold">{subTitle}</span>
          <button
            className="ml-auto"
            onClick={() => {
              stackRouterPush(router, path, "stack");
            }}
          >
            <Image
              src="/icons/Back.svg"
              alt="more"
              width={11}
              height={11}
              className="rotate-180"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;

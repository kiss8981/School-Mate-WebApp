"use client";

import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { stackRouterPush } from "@/lib/stackRouter";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Props {
  title: string;
  subTitle: string;
  path: string;
  children: React.ReactNode;
}

const SectionContainer = ({ children, title, path, subTitle }: Props) => {
  return (
    <>
      <div className={classNames("px-5 pt-4", inter.className)}>
        <SectionTitle title={title} subTitle={subTitle} path={path} />
        {children}
      </div>
    </>
  );
};

const SectionTitle = ({
  title,
  subTitle,
  path,
}: {
  title: string;
  subTitle: string;
  path: string;
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-full">
        <span className="text-[#b6b6b6] text-sm">{subTitle}</span>
        <button
          onClick={() => {
            stackRouterPush(router, path, "stack");
          }}
          className="flex items-center justify-between w-full"
        >
          <span className="text-xl font-bold">{title}</span>
          <div className="ml-auto">
            <Image
              src="/icons/Back.svg"
              alt="more"
              width={11}
              height={11}
              className="rotate-180"
            />
          </div>
        </button>
      </div>
    </div>
  );
};

export default SectionContainer;

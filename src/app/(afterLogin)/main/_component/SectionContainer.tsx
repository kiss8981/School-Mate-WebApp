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
  pathType?: "stack" | "replace";
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

const SectionContainer = ({
  children,
  title,
  path,
  subTitle,
  className,
  titleClassName,
  pathType = "stack",
}: Props) => {
  return (
    <>
      <div className={classNames("px-5 pt-4", inter.className, className)}>
        <SectionTitle
          title={title}
          subTitle={subTitle}
          path={path}
          pathType={pathType}
          className={titleClassName}
        />
        {children}
      </div>
    </>
  );
};

const SectionTitle = ({
  title,
  subTitle,
  path,
  className,
  pathType = "stack",
}: {
  title: string;
  subTitle: string;
  path: string;
  pathType?: "stack" | "replace";
  className?: string;
}) => {
  const router = useRouter();

  return (
    <div className={classNames("flex flex-row", className)}>
      <div className="flex flex-col w-full">
        <span className="text-[#b6b6b6] text-sm">{subTitle}</span>
        <button
          onClick={() => {
            {
              pathType === "stack"
                ? stackRouterPush(router, path, "stack")
                : router.push(path);
            }
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

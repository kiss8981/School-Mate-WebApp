"use client";

import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { AskedWithUser } from "@/types/asked";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AskedItem = ({
  asked,
  index,
}: {
  asked: AskedWithUser;
  index: number;
}) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        stackRouterPush(router, `/asked/${asked.customId || asked.userId}`);
      }}
      className={classNames(
        `w-[140px] h-[200px] flex-shrink-0 relative bg-no-repeat bg-center rounded-[10px]`,
        asked.user.profile ? "bg-cover" : "",
        index === 0 ? "ml-5" : ""
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
        <button className="flex flex-row items-center rounded-full bg-white text-black border-none py-1.5 w-full justify-center">
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
        </button>
      </div>
    </button>
  );
};

export default AskedItem;

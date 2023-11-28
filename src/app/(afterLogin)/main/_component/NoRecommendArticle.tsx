"use client";

import Button from "@/app/_component/Button";
import { stackRouterPush } from "@/lib/stackRouter";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NoRecommendArticle = () => {
  const router = useRouter();

  return (
    <>
      <div className="w-full h-32 flex flex-col items-center justify-center mt-3">
        <span className="text-lg">아직 인기 게시물이 없어요!</span>
        <Button
          onClick={() => {
            stackRouterPush(router, "/write", "stack");
          }}
          className="mt-2 flex flex-row items-center rounded-full px-5 py-2 font-bold text-sm"
        >
          <Image
            src="/icons/PlusOnly.svg"
            alt="write"
            width={15}
            height={15}
            className="mr-2 text-base"
          />
          글쓰기
        </Button>
      </div>
    </>
  );
};

export default NoRecommendArticle;

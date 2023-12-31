"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import fetcher, { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { PaginationParams } from "@/types/fetcher";
import Image from "next/image";

const FightList = () => {
  const fightFetcher = (params: PaginationParams) =>
    fetcher.get(`/fight`, { params });
  const {
    isFetching,
    data: fights,
    fetchNextPage,
  } = useInfiniteScroll(fightFetcher, {});

  return (
    <>
      <div
        className={classNames(
          "flex flex-col h-[88vh] items-center justify-center",
          inter.className
        )}
      >
        <Image
          src="/images/schoolmate/logo.svg"
          alt="message"
          width={150}
          height={150}
        />
        <span className="font-bold mt-7">아직 준비중인 기능이에요</span>
        <span className="font-bold">조금만 기다려주세요!</span>
      </div>
    </>
  );
};

export default FightList;

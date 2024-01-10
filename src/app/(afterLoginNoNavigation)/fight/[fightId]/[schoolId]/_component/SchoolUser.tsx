"use client";

import Advisement from "@/app/_component/Advisement";
import { Loading } from "@/app/_component/Loading";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import fetcher from "@/lib/fetch";
import { NanumGothic } from "@/lib/fonts";
import { classNames, numberWithCommas } from "@/lib/uitls";
import { PaginationParams } from "@/types/fetcher";
import Image from "next/image";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FightRankingUser } from "schoolmate-types";

const SchoolUser = ({
  schoolId,
  fightId,
}: {
  schoolId: string;
  fightId: string;
}) => {
  const fightFetcher = (params: PaginationParams) =>
    fetcher.get(`/fight/${fightId}/${schoolId}`, { params });
  const {
    isFetching,
    data: fights,
    fetchNextPage,
  } = useInfiniteScroll<
    FightRankingUser & {
      user: {
        name: string;
      };
    }
  >(fightFetcher, {});
  const [viewRef, inView] = useInView();

  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView]);

  return (
    <div className="mt-3 px-4 space-y-3">
      {fights.map((rank, index) =>
        index < 3 ? (
          <>
            <div
              key={index}
              className={classNames(
                "w-full border rounded-[20px] flex flex-row py-3 min-h-[95px] cursor-pointer px-4 bg-white relative overflow-hidden z-0",
                NanumGothic.className
              )}
            >
              <div className="flex flex-col z-10 items-start">
                <span>#{index + 1}</span>
                <span className="leading-none mt-0.5 font-bold">
                  {rank.user.name}
                </span>
              </div>
              <span className="mt-auto ml-auto text-lg font-bold">
                {numberWithCommas(rank.score)}점
              </span>
              <div className="absolute opacity-50 -left-12 z-0 top-1/2 transform -translate-y-1/2">
                <Image
                  src={`/icons/Tropy${index + 1}.svg`}
                  alt="logo"
                  width={160}
                  height={160}
                />
              </div>
            </div>
            {index === 2 && (
              <Advisement className="my-2" unit="DAN-nWFYoUxwD11CzhGS" />
            )}
          </>
        ) : (
          <>
            <div
              key={index}
              className="w-full border rounded-[20px] flex flex-row items-center py-3 px-4 bg-white"
            >
              <span className="font-bold">
                #{index + 1} {rank.user.name}
              </span>
              <span className="mt-auto ml-auto font-bold">
                {numberWithCommas(rank.score)}점
              </span>
            </div>
          </>
        )
      )}
      <div ref={viewRef} />
      {isFetching && (
        <div className="flex justify-center">
          <Loading color="primary" />
        </div>
      )}
    </div>
  );
};

export default SchoolUser;

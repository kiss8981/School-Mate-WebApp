"use client";

import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import fetcher, { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames, timeForToday } from "@/lib/uitls";
import { PaginationParams } from "@/types/fetcher";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fight } from "schoolmate-types";
import Advisement from "@/app/_component/Advisement";

const FightList = () => {
  const router = useRouter();
  const fightFetcher = (params: PaginationParams) =>
    fetcher.get(`/fight`, { params });
  const {
    isFetching,
    data: fights,
    fetchNextPage,
  } = useInfiniteScroll<Fight>(fightFetcher, {});

  return (
    <>
      <div
        className={classNames(
          "flex flex-col h-[88vh] items-center justify-start",
          inter.className
        )}
      >
        {fights.length === 0 && !isFetching ? (
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
              <span className="font-bold mt-7">
                아직 진행중인 대결이 없어요!
              </span>
            </div>
          </>
        ) : (
          <>
            {fights.map((fight, index) => (
              <FightComponent key={index} fight={fight} />
            ))}
            {isFetching && <FightListSkeleton />}
            <Advisement className="my-2" unit="DAN-OrP8Xa0B8jI2qojd" />
          </>
        )}
      </div>
    </>
  );
};

const FightComponent = ({ fight }: { fight: Fight }) => {
  const router = useRouter();
  return (
    <>
      <div className="px-4 mt-3 w-full">
        <div
          onClick={() => {
            stackRouterPush(router, `/fight/${fight.id}`);
          }}
          className={classNames(
            "w-full border rounded-[20px] flex flex-row py-3 min-h-[70px] cursor-pointer px-4 bg-white",
            inter.className
          )}
        >
          <div className="mr-4 my-auto">
            <Image
              src={fight.icon as string}
              alt="logo"
              width={60}
              height={60}
            />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-sm font-bold">{fight.title}</span>
            <span className="text-sm mb-auto break-words">
              {fight.description}
            </span>
            <div className="text-[#7c7c7c] text-[0.75rem] mt-auto ml-auto">
              <span>
                {dayjs(fight.startAt).format("YYYY. MM. DD")} ~{" "}
                {fight.endAt ? dayjs(fight.endAt).format("HH:mm") : ""}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const FightListSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-col mt-3 pb-4 px-4 items-center w-full space-y-2">
      <div
        className={`relative h-[120px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[120px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[120px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
    </div>
  );
};

export default FightList;

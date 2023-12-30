"use client";

import Advertisement from "@/app/_component/Advisement";
import { LoadingFullPage } from "@/app/_component/Loading";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import fetcher, { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames, timeForToday } from "@/lib/uitls";
import { AskedDetailWithAskedUser, AskedDetailWithUser } from "@/types/asked";
import { PaginationParams } from "@/types/fetcher";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Process } from "schoolmate-types";
import Image from "next/image";

const MyAskedQuestions = () => {
  const myAskedQuestionsFetcher = (params: PaginationParams) =>
    fetcher("/auth/me/askedquestions", {
      params,
    });
  const {
    data: askeds,
    isFetching,
    fetchNextPage,
    resetPage,
    hasNextPage,
    page,
  } = useInfiniteScroll<AskedDetailWithAskedUser>(myAskedQuestionsFetcher, {});
  const [viewRef, inView] = useInView();
  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  return (
    <>
      {askeds.length === 0 && isFetching ? (
        <>
          <div className="flex justify-center items-center my-auto">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
          </div>
        </>
      ) : (
        <>
          {askeds.length === 0 ? (
            <>
              <div className="flex flex-col items-center justify-center h-[88vh] text-[#B6B6B6]">
                <span>아직 에스크 질문이 없어요</span>
                <span>다른 사람에게 궁금한 점을 물어보세요!</span>
              </div>
            </>
          ) : (
            <>
              <div ref={viewRef} />
              {isFetching && (
                <div className="flex justify-center items-center my-10 pt-10">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
                </div>
              )}
              {askeds
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((askedItem, key) => (
                  <>
                    <AskedItem asked={askedItem} />
                    {key === 5 && (
                      <Advertisement
                        unit="DAN-JIpVKY9LRZGb864w"
                        className="pt-3"
                      />
                    )}
                  </>
                ))}
              <div ref={viewRef} />
            </>
          )}
        </>
      )}
    </>
  );
};

const AskedItem = ({ asked }: { asked: AskedDetailWithAskedUser }) => {
  const router = useRouter();
  const AskedProcess: {
    [key in Process]: JSX.Element;
  } = {
    denied: <span className="text-[#b6b6b6] text-sm">(거절됨)</span>,
    pending: <span className="text-orange-500 text-sm">(대기중)</span>,
    success: <span className="text-green-500 text-sm">(답장완료)</span>,
  };

  return (
    <>
      <div
        className={classNames("flex flex-row border-b py-4", inter.className)}
      >
        <div className="px-5 flex flex-row items-center w-full">
          <div
            onClick={() => {
              stackRouterPush(
                router,
                `/asked/${asked.askedUserId}/${asked.id}`
              );
            }}
            className="flex flex-row items-center w-full"
          >
            <div className="relative w-14 h-14">
              <Image
                src={
                  asked.askedUser.image
                    ? process.env.NEXT_PUBLIC_S3_URL + asked.askedUser.image
                    : "/images/schoolmate/logobg.svg"
                }
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt="profile"
              />
            </div>
            <div className="flex flex-col ml-3">
              <div className="flex flex-row">
                <span className="font-bold">
                  {asked.askedUser.user.name} {AskedProcess[asked.process]}
                </span>
              </div>
              <span
                className={classNames(
                  "text-[0.7rem] font-bold text-[#b6b6b6] truncate max-w-[12rem]"
                )}
              >
                {asked.question}
              </span>
            </div>
          </div>
          <div className="flex flex-col ml-auto h-full w-32">
            <span
              className={classNames(
                "text-[0.7rem] font-bold text-[#b6b6b6] ml-auto mt-auto"
              )}
            >
              {timeForToday(asked.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAskedQuestions;

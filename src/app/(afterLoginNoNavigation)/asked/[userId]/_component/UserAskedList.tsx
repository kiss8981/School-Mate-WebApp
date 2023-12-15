"use client";

import { Hyperlink } from "@/app/_component/Hyperlink";
import { LoadingFullPage } from "@/app/_component/Loading";
import useFetch from "@/hooks/useFetch";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import {
  AskedDetailWithUser,
  AskedListWithUser,
  AskedUserDetail,
} from "@/types/asked";
import { PaginationParams } from "@/types/fetcher";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const UserAksedList = ({
  asked: defaultAsked,
}: {
  asked: AskedListWithUser;
}) => {
  const askedFetcher = (params: PaginationParams) =>
    fetcher.get(`/asked/${defaultAsked.user.userId}`, {
      params,
    });
  const {
    data: askeds,
    isFetching,
    fetchNextPage,
    resetPage,
    hasNextPage,
    page,
  } = useInfiniteScroll<AskedDetailWithUser>(askedFetcher, {});
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [viewRef, inView] = useInView();
  const [loadingMessage, setLoadingMessage] = useState(false);

  useEffect(() => {
    if (inView && hasNextPage) fetchNextPage();
  }, [inView]);

  const { triggerFetch: addAsked } = useFetch(
    `/asked/${defaultAsked.user.userId}`,
    "POST",
    {
      onPending: () => setLoadingMessage(true),
      onSuccess: () => {
        setLoadingMessage(false);
        resetPage();
      },
      onError(statusCode, statusText, body) {
        setLoadingMessage(false);
        toast("error", statusText || "알 수 없는 오류가 발생했습니다.");
      },
    }
  );

  useEffect(() => {
    const handleComment = async (event: MessageEvent) => {
      try {
        const { type: eventType, data } = JSON.parse(event.data);
        if (eventType === "ASKED_QUESTION") {
          await addAsked({
            fetchInit: {
              data: {
                question: data.question,
                isAnonymous: data.isAnonymous,
              },
            },
          });
        }
      } catch (err) {}
    };

    // @ts-ignore
    document.addEventListener("message", handleComment);
    window.addEventListener("message", handleComment);

    return () => {
      window.removeEventListener("message", handleComment);
      // @ts-ignore
      document.removeEventListener("message", handleComment);
    };
  }, []);

  useEffect(() => {
    if (messageEndRef.current && (page === 1 || page === 2)) {
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
    }
  }, [page]);

  return (
    <>
      {askeds.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center h-[88vh] text-[#B6B6B6]">
            <span>아직 에스크 질문이 없어요</span>
            <span>질문을 가장 먼저 남겨보세요.</span>
          </div>
        </>
      ) : (
        <>
          <div ref={viewRef} />
          {loadingMessage && <LoadingFullPage />}
          {isFetching && (
            <div className="flex justify-center items-center my-10 pt-10">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
            </div>
          )}
          {askeds
            .sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            )
            .map((askedItem, key) => (
              <UserAskedItem
                key={key}
                asked={askedItem}
                askedUser={defaultAsked.user}
              />
            ))}
          <div ref={messageEndRef} />
        </>
      )}
    </>
  );
};

const UserAskedItem = ({
  asked,
  askedUser,
}: {
  asked: AskedDetailWithUser;
  askedUser: AskedUserDetail;
}) => {
  return (
    <>
      <div className={classNames("w-full mt-4 px-5", inter.className)}>
        <div className="flex flex-row ml-auto w-full">
          <div className="flex flex-col ml-auto mr-3">
            <span className="text-right items-center flex justify-end">
              {asked.isMyAsked && (
                <span className="mr-1 text-sm text-[#0A1A3A]">(내 질문)</span>
              )}
              {asked.isAnonymous ? "익명" : asked.questionUser.name}
            </span>
            <div className="border rounded-[10px] p-2 bg-[#f0f0f0] ml-auto flex flex-row mt-1 w-fit">
              <Hyperlink
                className="max-w-[13.5rem] whitespace-pre-wrap w-fit break-all"
                text={asked.question}
              />
            </div>
          </div>
          <div className="relative w-[50px] h-[50px] rounded-full">
            <Image
              src={
                asked.questionUser.profile
                  ? process.env.NEXT_PUBLIC_S3_URL + asked.questionUser.profile
                  : "/images/schoolmate/logobg.svg"
              }
              layout="fill"
              objectFit="cover"
              className="rounded-full"
              alt="profile"
            />
          </div>
        </div>
        {asked.answer && (
          <div className="flex flex-row mt-4 w-full">
            <div className="relative w-[50px] h-[50px] rounded-full">
              <Image
                src={
                  askedUser.user.profile
                    ? process.env.NEXT_PUBLIC_S3_URL + askedUser.user.profile
                    : "/images/schoolmate/logobg.svg"
                }
                layout="fill"
                objectFit="cover"
                className="rounded-full"
                alt="profile"
              />
            </div>
            <div className="flex flex-col ml-3">
              <span>{askedUser.user.name}</span>
              <div className="border rounded-[10px] p-2 flex flex-row mt-1 w-fit">
                <Hyperlink
                  className="max-w-[13.5rem] whitespace-pre-wrap w-fit break-all"
                  text={asked.answer}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserAksedList;

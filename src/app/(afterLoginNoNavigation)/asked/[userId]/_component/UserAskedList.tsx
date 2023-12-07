"use client";

import { LoadingFullPage } from "@/app/_component/Loading";
import useFetch from "@/hooks/useFetch";
import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import {
  AskedDetailWithUser,
  AskedListWithUser,
  AskedUserDetail,
} from "@/types/asked";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const UserAksedList = ({
  asked: defaultAsked,
  auth,
}: {
  asked: AskedListWithUser;
  auth: Session;
}) => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(defaultAsked.pages);
  const [viewRef, inView] = useInView();
  const [loadingMessage, setLoadingMessage] = useState(false);
  const [askeds, setAskeds] = useState<AskedDetailWithUser[]>(
    defaultAsked.askeds
  );
  const { triggerFetch: addAsked } = useFetch(
    `/asked/${defaultAsked.user.userId}`,
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onPending: () => setLoadingMessage(true),
      onSuccess: () => {
        setLoadingMessage(false);
        setPage(1);
        fetchMessage(1);
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
    if (messageEndRef.current)
      messageEndRef.current.scrollIntoView({ behavior: "instant" });
  }, []);

  useEffect(() => {
    if (totalPage === page) return;
    if (inView && !loadingMessage) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loadingMessage]);

  useEffect(() => {
    if (page === 1) return;
    if (page > totalPage) return;
    if (totalPage === 1) return;
    fetchMessage();
  }, [page]);

  const fetchMessage = async (prpsPage?: number) => {
    try {
      setLoadingMessage(true);
      const { data } = await fetcher<{
        data: {
          askeds: AskedDetailWithUser[];
          pages: number;
        };
      }>(`/asked/${defaultAsked.user.userId}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
        params: {
          page: prpsPage ? prpsPage : page,
        },
      });
      if (prpsPage) {
        setAskeds(
          data.data.askeds.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
        messageEndRef?.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        const datas = [...data.data.askeds, ...askeds];
        setAskeds(
          datas.sort(
            (a, b) =>
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
        );
      }
      setTotalPage(data.data.pages);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(
          "error",
          err.response?.data.message || "알 수 없는 오류가 발생했습니다."
        );
      }
    } finally {
      setLoadingMessage(false);
    }
  };

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
          {askeds.map((askedItem, key) => (
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
            <div className="border rounded-[10px] p-2 bg-[#f0f0f0] ml-auto flex flex-row mt-1">
              <pre
                className={classNames(
                  inter.className,
                  "max-w-[13.5rem] whitespace-pre-wrap break-all"
                )}
              >
                {asked.question}
              </pre>
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
              <div className="border rounded-[10px] p-2 flex flex-row mt-1">
                <pre
                  className={classNames(
                    "max-w-[13.5rem] whitespace-pre-wrap break-all",
                    inter.className
                  )}
                >
                  {asked.answer}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserAksedList;

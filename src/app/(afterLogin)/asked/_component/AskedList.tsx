"use client";

import { inter } from "@/lib/fonts";
import { classNames, timeForToday } from "@/lib/uitls";
import { AskedDetailWithUser } from "@/types/asked";
import Image from "next/image";
import { useEffect, useState } from "react";
import AskedMore from "./AskedMore";
import { useRouter } from "next/navigation";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import useFetch from "@/hooks/useFetch";
import { Session } from "next-auth";
import { toast } from "@/lib/webviewHandler";
import { LoadingFullPage } from "@/app/_component/Loading";
import { Process } from "schoolmate-types";
import { useInView } from "react-intersection-observer";
import fetcher from "@/lib/fetch";
import { AxiosError } from "axios";
import { stackRouterPush } from "@/lib/stackRouter";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { PaginationParams } from "@/types/fetcher";
import Advertisement from "@/app/_component/Advisement";
import CopyToClipboard from "react-copy-to-clipboard";
import { AnimatePresence, motion } from "framer-motion";

const AskedList = ({ askedId }: { askedId: string }) => {
  const askedFetch = (params: PaginationParams) =>
    fetcher.get(`/auth/me/asked`, {
      params,
    });
  const {
    isFetching,
    data: askeds,
    fetchNextPage,
  } = useInfiniteScroll<AskedDetailWithUser>(askedFetch, {});
  const [viewRef, inView] = useInView();

  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView]);

  return (
    <>
      {askeds.length === 0 ? (
        <CopyToClipboard
          text={`https://schoolmate.kr/asked/${askedId}`}
          onCopy={() => {
            toast("success", "에스크 링크가 복사되었습니다!");
          }}
        >
          <div
            className={classNames(
              "flex flex-col h-[70vh] items-center justify-center",
              inter.className
            )}
          >
            <Image
              src="/images/schoolmate/logo.svg"
              alt="message"
              width={150}
              height={150}
            />
            <span className="font-bold mt-7">아직 받은 에스크가 없군요!</span>
            <button className="mt-5 font-bold flex flex-row items-center bg-[#f0f0f0] px-5 py-2 rounded-full">
              프로필 공유하기
              <Image
                src="/icons/Share.svg"
                width={15}
                height={15}
                className="ml-2"
                alt="share"
              />
            </button>
          </div>
        </CopyToClipboard>
      ) : (
        <>
          {askeds
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((asked, index) => (
              <>
                <AskedCard asked={asked} key={index} />
                {index == 5 && (
                  <div className="w-full border-b">
                    <Advertisement unit="DAN-ks59KP1dNxSw0XX1" />
                  </div>
                )}
              </>
            ))}
        </>
      )}

      {isFetching && (
        <div className="flex justify-center items-center my-10 pb-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
        </div>
      )}
      <div ref={viewRef} />
    </>
  );
};

const AskedCard = ({ asked: defaultAsked }: { asked: AskedDetailWithUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [asked, setAsked] = useState<AskedDetailWithUser>(defaultAsked);
  const { triggerFetch: denyAsked } = useFetch(
    `/asked/${asked.id}/deny`,
    "POST",
    {
      onSuccess(statusCode, statusText, body) {
        setLoading(false);
        setAsked(body);
        toast("success", "거절되었습니다.");
      },
      onError(statusCode, statusText, body) {
        setLoading(false);
        toast("error", statusText);
      },
      onPending: () => setLoading(true),
    }
  );

  const AskedProcess: {
    [key in Process]: JSX.Element;
  } = {
    denied: <span className="text-[#b6b6b6] text-sm">(거절됨)</span>,
    pending: <span className="text-orange-500 text-sm">(대기중)</span>,
    success: <span className="text-green-500 text-sm">(답장완료)</span>,
  };

  return (
    <>
      {loading && <LoadingFullPage />}
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
                  asked.questionUser.profile
                    ? process.env.NEXT_PUBLIC_S3_URL +
                      asked.questionUser.profile
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
                  {asked.isAnonymous ? "익명" : asked.questionUser.name}{" "}
                  {AskedProcess[asked.process]}
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
            <AskedDeny
              asked={asked}
              callbackDeny={() => {
                denyAsked({});
              }}
            />
            <div
              className={classNames(
                "text-[0.7rem] font-bold text-[#b6b6b6] ml-auto flex flex-row w-full"
              )}
            >
              {asked.isOtherSchool && (
                <span className="text-[#b6b6b6] text-[0.7rem] min-w-fit border rounded-full px-2 mr-2">
                  다른학교
                </span>
              )}
              <p className="min-w-fit">{timeForToday(asked.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AskedDeny = ({
  asked,
  callbackDeny,
}: {
  asked: AskedDetailWithUser;
  callbackDeny: () => void;
}) => {
  const [modal, setModal] = useState(false);
  const outsideRef = useOutsideClick(() => {
    setModal(false);
  });

  return (
    <button
      className="ml-auto mb-auto relative"
      onClick={() => {
        setModal(true);
      }}
      ref={outsideRef}
    >
      <Image
        src="/icons/More.svg"
        alt="more"
        width={4}
        height={4}
        className="mx-auto"
      />
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.15,
              },
            }}
            className="absolute right-0 bg-white border rounded-lg"
          >
            {modal && (
              <div
                className={classNames(
                  "absolute right-0 bg-white border border-[#ff5353] rounded-lg ",
                  asked.process !== "pending" ? "border-[#b6b6b6]" : ""
                )}
              >
                <div className="flex flex-col">
                  <button
                    disabled={asked.process !== "pending"}
                    onClick={() => {
                      setModal(false);
                      callbackDeny();
                    }}
                    className="flex flex-row items-center px-3 justify-center text-[#ff5353] w-20 h-8 disabled:text-[#b6b6b6]"
                  >
                    거절하기
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AskedList;

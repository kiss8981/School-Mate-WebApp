"use client";

import { Hyperlink } from "@/app/_component/Hyperlink";
import useFetch from "@/hooks/useFetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent, toast } from "@/lib/webviewHandler";
import { AskedDetailWithUser } from "@/types/asked";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AskedReply = ({
  auth,
  asked: defaultAsked,
}: {
  auth: Session;
  asked: AskedDetailWithUser;
}) => {
  const router = useRouter();
  const [asked, setAskeds] = useState<AskedDetailWithUser>(defaultAsked);
  const { triggerFetch: askedReplyTrigger } = useFetch(
    `/asked/${defaultAsked.id}/reply`,
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      successToast: {
        message: "답변이 등록되었습니다.",
      },
      onError: (status, message) => {
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess(statusCode, statusText, body) {
        stackRouterPush(router, `/asked`, "reset");
        setAskeds(body);
      },
    }
  );

  useEffect(() => {
    if (window.ReactNativeWebView) {
      sendWebviewEvent("ASKED_REPLAY_EVENT", {
        replyed: asked.process === "pending" ? false : true,
      });
    }
  }, [asked]);

  useEffect(() => {
    const handleComment = async (event: MessageEvent) => {
      try {
        const { type: eventType, data } = JSON.parse(event.data);
        if (eventType === "ASKED_REPLAY") {
          await askedReplyTrigger({
            fetchInit: {
              data: {
                answer: data.answer,
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

  return (
    <>
      <div className={classNames("w-full mt-4 px-5", inter.className)}>
        <div className="flex flex-row w-full">
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
          <div className="flex flex-col ml-3">
            <span className="text-right items-center flex justify-start">
              {asked.isAnonymous ? "익명" : asked.questionUser.name}
            </span>
            <div className="border rounded-[10px] p-2 bg-[#fff] flex flex-row mt-1">
              <Hyperlink
                text={asked.question}
                className="max-w-[13.5rem] whitespace-pre-wrap break-all"
              />
            </div>
          </div>
        </div>
        {asked.answer && (
          <div className="flex flex-row mt-4 w-full">
            <div className="flex flex-col ml-auto ">
              <div className="border rounded-[10px] p-2 flex flex-row mt-1 bg-[#f0f0f0]">
                <Hyperlink
                  text={asked.answer}
                  className="max-w-[13.5rem] whitespace-pre-wrap break-all"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AskedReply;

"use client";

import Modal from "@/app/_component/Modal";
import useFetch from "@/hooks/useFetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Report } from "schoolmate-types";

interface ReportComponentProps {
  report: Report;
  auth: Session;
}

const ReportComponent = (props: ReportComponentProps) => {
  const router = useRouter();
  const [showCheckAlert, setShowCheckAlert] = useState(false);
  const [blindUserFetching, setBlindUserFetching] = useState(false);
  const { triggerFetch: blindUser } = useFetch(
    `/report/${props.report.id}/blind`,
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${props.auth.user.token.accessToken}`,
        },
      },
      onPending: () => setBlindUserFetching(true),
      onSuccess: () => {
        toast("success", "해당 유저의 게시글을 보지 않도록 설정했습니다.");
        stackRouterPush(router, "/board", "reset");
      },
      onError: () => setBlindUserFetching(false),
    }
  );
  return (
    <>
      {showCheckAlert && (
        <Modal
          open={showCheckAlert}
          onClose={() => {
            setShowCheckAlert(false);
          }}
        >
          <div className={classNames(inter.className, "px-5 py-4")}>
            <div className="w-full">
              <span className="text-xl font-bold">
                해당 유저 게시글 보지 않기
              </span>
              <span className="text-sm text-gray-500 block mt-2">
                해당 유저의 게시글을 보지 않도록 설정하시겠습니까?
              </span>
              <div className="flex flex-row mt-5">
                <button
                  onClick={() => {
                    setShowCheckAlert(false);
                  }}
                  className="flex-1 text-center py-2 text-gray-500 border border-gray-300 rounded-[10px] text-sm"
                >
                  취소
                </button>
                <button
                  onClick={async () => {
                    blindUser({});
                    setShowCheckAlert(false);
                  }}
                  disabled={blindUserFetching}
                  className="flex-1 text-center py-2 text-white bg-red-500 rounded-[10px] text-sm ml-3"
                >
                  {blindUserFetching ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </>
                  ) : (
                    <>확인</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div
        className={classNames(
          "flex flex-col items-start px-5",
          inter.className
        )}
      >
        <div className="mt-3 w-full">
          <div className="text-xl font-bold">추가조치</div>
          <button
            onClick={() => {
              setShowCheckAlert(true);
            }}
            className="mt-3 text-lg text-gray-500 w-full flex flex-row items-center"
          >
            <span>해당 유저의 게시글 보지 않기</span>
            <Image
              src="/icons/Back.svg"
              alt="arrow"
              className="rotate-180 ml-auto"
              width={10}
              height={10}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ReportComponent;

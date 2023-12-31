"use client";

import Button from "@/app/_component/Button";
import Modal from "@/app/_component/Modal";
import useFetch from "@/hooks/useFetch";
import { inter } from "@/lib/fonts";
import { stackRouterBack, stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  provider: string;
  providerName: string;
}

const DisconnectAccountTemplate = ({ provider, providerName }: IProps) => {
  const [disconnectModal, setDisconnectModal] = useState(false);
  const [disconnetLoading, setDisconnectLoading] = useState(false);
  const router = useRouter();

  const { triggerFetch: disconnectaccount } = useFetch(
    "/auth/me/disconnectaccount/" + provider,
    "DELETE",
    {
      onSuccess: () => {
        stackRouterBack(router);
        setDisconnectLoading(false);
      },
      onError: (status, message) => {
        toast("error", message);
        setDisconnectLoading(false);
      },
      onPending: () => {
        setDisconnectLoading(true);
      },
    }
  );

  return (
    <>
      <Modal
        open={disconnectModal}
        onClose={() => {
          setDisconnectModal(false);
        }}
      >
        <div className={classNames(inter.className, "px-5 py-4")}>
          <div className="w-full">
            <span className="text-xl font-bold">
              {providerName} 계정 연동해제
            </span>
            <span className="text-sm text-gray-500 block mt-2">
              {providerName} 계정 연동을 해제하시겠습니까?
            </span>
            <div className="flex flex-row mt-5">
              <button
                onClick={() => setDisconnectModal(false)}
                className="flex-1 text-center py-2 text-gray-500 border border-gray-300 rounded-[10px] text-sm"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  disconnectaccount({});
                  setDisconnectModal(false);
                }}
                disabled={disconnetLoading}
                className="flex-1 text-center py-2 text-white bg-red-500 rounded-[10px] text-sm ml-3"
              >
                {disconnetLoading ? (
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
      <div
        className={classNames(
          inter.className,
          "px-5 flex flex-col h-[88vh] pt-3"
        )}
      >
        <span className="font-bold text-xl">
          {providerName} 연동을 해제하시겠습니까?
        </span>
        <div className="flex flex-col text-[#7C7C7C] mt-3">
          <span>{providerName} 연동을 해제하는 경우:</span>
          <div className="flex flex-col ml-3">
            <div className="flex flex-row space-x-2">
              <span>•</span>
              <span>
                해당 {providerName} 계정으로 연동된 대결에서 점수가
                초기화됩니다.
              </span>
            </div>
            <div className="flex flex-row space-x-2">
              <span>•</span>
              <span>계속하시겠습니까?</span>
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            setDisconnectModal(true);
          }}
          className="mt-auto rounded-full h-14 w-full mb-5"
        >
          계속
        </Button>
      </div>
    </>
  );
};

export default DisconnectAccountTemplate;

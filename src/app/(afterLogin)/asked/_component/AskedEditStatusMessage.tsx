"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useState } from "react";
import { debounce } from "lodash";
import useFetch from "@/hooks/useFetch";
import { Session } from "next-auth";
import { toast } from "@/lib/webviewHandler";

const AskedEditStatusMessage = ({
  statusMessage: defaultStatusMessage,
  auth,
}: {
  statusMessage?: string;
  auth: Session;
}) => {
  const [editStatusMessage, setEditStatusMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState(defaultStatusMessage);
  const { triggerFetch: updateStatusMessage } = useFetch(
    "/asked/changestatusmessage",
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      successToast: {
        message: "상태 메시지가 변경되었습니다.",
      },
      onError: (code, msg) => {
        toast("error", msg || "상태 메시지 변경에 실패하였습니다.");
      },
      onSuccess: () => {
        setEditStatusMessage(false);
      },
    }
  );

  const outsideRef = useOutsideClick(() => {
    setEditStatusMessage(false);
  });

  return (
    <>
      <div
        className="mt-1 text-sm text-gray-400 relative w-[210px]"
        ref={outsideRef}
        onClick={() => {
          setEditStatusMessage(true);
        }}
      >
        {editStatusMessage ? (
          <>
            <div className=" relative w-56 ">
              <input
                className="outline-none border-b pb-2 pr-12 w-full"
                value={statusMessage}
                placeholder="상태 메시지를 입력해 주세요"
                onChange={e => {
                  if (e.target.value.length > 20) return;
                  setStatusMessage(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  if (!statusMessage || statusMessage.length === 0)
                    return toast("error", "상태 메시지를 입력해 주세요.");
                  updateStatusMessage({
                    fetchInit: {
                      data: {
                        message: statusMessage,
                      },
                    },
                  });
                }}
                className="absolute right-0 border h-full px-2 flex items-center bottom-1 rounded"
              >
                저장
              </button>
            </div>
          </>
        ) : (
          <p className="truncate">
            {statusMessage
              ? statusMessage
              : "여길 눌러 상태 메시지를 변경해 주세요"}
          </p>
        )}
      </div>
    </>
  );
};

export default AskedEditStatusMessage;

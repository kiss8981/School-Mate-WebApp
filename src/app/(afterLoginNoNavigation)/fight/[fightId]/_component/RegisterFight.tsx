"use client";
import Button from "@/app/_component/Button";
import { Loading } from "@/app/_component/Loading";
import Modal from "@/app/_component/Modal";
import useFetch from "@/hooks/useFetch";
import { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames, numberWithCommas } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { ConnectionAccount, Fight } from "schoolmate-types";
import useSWR from "swr";

const RegisterFight = ({
  fight,
  isRegistration,
  ourRanking,
  auth,
}: {
  fight: Fight;
  isRegistration: boolean;
  ourRanking: number;
  auth: Session;
}) => {
  const router = useRouter();
  const { data: connectAccount, isLoading } = useSWR<ConnectionAccount[]>(
    "/auth/me/connectaccount",
    swrFetcher,
    {
      refreshInterval: 5000,
    }
  );
  const [registerFightFetching, setRegisterFightFetching] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [shardFight, setShardFight] = useState(false);
  const { triggerFetch: registerFight } = useFetch(
    `/fight/${fight.id}/registration`,
    "POST",
    {
      onPending: () => setRegisterFightFetching(true),
      onSuccess: () => {
        toast("success", "대결 참가가 완료되었어요");
        toast(
          "success",
          "순위정보가 업데이트 되는데 시간이 조금 걸릴 수 있어요"
        );
        setRegisterFightFetching(false);
      },
      onError: (status, message) => {
        toast("error", message);
        setRegisterFightFetching(false);
      },
    }
  );

  return (
    <>
      <div
        className={classNames(inter.className, "absolute px-4 bottom-4 w-full")}
      >
        <Button
          className="w-full h-14 rounded-full flex items-center justify-center"
          color="primary"
          onClick={() => {
            if (
              !fight.needTo.some((item) =>
                connectAccount?.map((item) => item.provider).includes(item)
              )
            ) {
              stackRouterPush(router, `/me/connectaccount`);
            } else if (!isRegistration) {
              setOpenRegisterModal(true);
            }
          }}
        >
          {isLoading || !connectAccount ? (
            <Loading />
          ) : (
            <>
              {fight.needTo.some((item) =>
                connectAccount.map((item) => item.provider).includes(item)
              ) ? (
                <>
                  {isRegistration ? (
                    <>
                      {shardFight ? (
                        <button
                          onClick={() => {
                            stackRouterPush(
                              router,
                              `/fight/${fight.id}/${auth.user.user.userSchoolId}`
                            );
                          }}
                        >
                          우리학교는 {numberWithCommas(ourRanking)}점 (상세보기)
                        </button>
                      ) : (
                        <CopyToClipboard
                          text={`https://schoolmate.kr/fight/${fight.id}`}
                          onCopy={() => {
                            setShardFight(true);
                            toast("success", "링크가 복사되었어요!");
                          }}
                        >
                          <span>공유하고 우리학교 확인하기</span>
                        </CopyToClipboard>
                      )}
                    </>
                  ) : (
                    <>참가하고 우리학교 점수보기</>
                  )}
                </>
              ) : (
                <>인스타그램 연동 후 참가가 가능해요</>
              )}
            </>
          )}
        </Button>
      </div>

      <Modal
        open={openRegisterModal}
        onClose={() => setOpenRegisterModal(false)}
      >
        <div className={classNames(inter.className, "px-5 py-4")}>
          <div className="w-full">
            <span className="text-xl font-bold">
              {fight.title} 대결 참가하기
            </span>
            <span className="text-sm text-gray-500 block mt-2">
              {fight.title} 대결에 참가하시겠어요?
            </span>
            <div className="flex flex-row mt-5">
              <button
                onClick={() => {
                  setOpenRegisterModal(false);
                }}
                className="flex-1 text-center py-2 text-gray-500 border border-gray-300 rounded-[10px] text-sm"
              >
                취소
              </button>
              <button
                onClick={async () => {
                  registerFight({});
                  setOpenRegisterModal(false);
                }}
                disabled={registerFightFetching}
                className="flex-1 text-center py-2 text-white bg-primary-500 rounded-[10px] text-sm ml-3 flex items-center justify-center"
              >
                {registerFightFetching ? (
                  <>
                    <Loading />
                  </>
                ) : (
                  <>확인</>
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RegisterFight;

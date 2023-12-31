"use client";

import Button from "@/app/_component/Button";
import { Loading } from "@/app/_component/Loading";
import { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const ConnectAccountPage = ({ token }: { token: string }) => {
  const router = useRouter();
  const { data: connectAccount, isLoading } = useSWR<any[]>(
    "/auth/me/connectaccount",
    swrFetcher,
    {
      refreshInterval: 2000,
    }
  );
  if (isLoading)
    return (
      <div className="flex flex-col h-[88vh] items-center justify-center">
        <Loading color="primary" />
      </div>
    );
  return (
    <>
      <div className={classNames("flex flex-col px-5 pt-3", inter.className)}>
        <div className="flex flex-row">
          <div className="flex flex-row items-center">
            <Image
              src="/icons/instagram.svg"
              alt="instagram"
              width={30}
              height={30}
            />
            <span className="ml-2">인스타그램</span>
          </div>
          <Button
            className="ml-auto rounded-2xl px-4 py-1"
            variant={
              connectAccount?.find(item => item.provider === "instagram")
                ? "outline"
                : "primary"
            }
            onClick={
              connectAccount?.find(item => item.provider === "instagram")
                ? async () => {
                    stackRouterPush(
                      router,
                      "/me/connectaccount/disconnect/instagram",
                      "stack",
                      false
                    );
                  }
                : async () => {
                    sendWebviewEvent("OPEN_BROWSER_EVENT", {
                      url:
                        process.env.NEXT_PUBLIC_API_URL +
                        `/auth/instagram?token=${token}`,
                    });
                  }
            }
          >
            {connectAccount?.find(item => item.provider === "instagram")
              ? "연동해제"
              : "연동하기"}
          </Button>
        </div>
      </div>
    </>
  );
};
export default ConnectAccountPage;

import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

async function ConnectAccountCheck(message: string): Promise<{
  error: boolean;
  message?: string;
  connected: boolean;
}> {
  const token = cookies().get("Authorization")?.value;

  if (!token)
    return {
      error: true,
      message: "잘못된 접근입니다.",
      connected: false,
    };

  if (message) {
    return {
      error: true,
      message: message,
      connected: false,
    };
  }

  try {
    const { data: connectAccount } = await fetcher.get<{
      data: any[];
    }>("/auth/me/connectaccount", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (connectAccount.data?.find(item => item.provider === "leagueoflegends"))
      return {
        error: false,
        connected: true,
      };
    return {
      error: true,
      message: "연동된 계정이 없습니다",
      connected: false,
    };
  } catch (error) {
    return {
      error: true,
      message: "잘못된 접근입니다.",
      connected: false,
    };
  }
}

const ConnectInstagramPage = async ({
  searchParams,
}: {
  searchParams: {
    message: string;
  };
}) => {
  const token = await ConnectAccountCheck(searchParams.message);

  if (token.error)
    return (
      <>
        <div
          className={classNames(
            "flex flex-col h-[88vh] items-center justify-center",
            inter.className
          )}
        >
          <Image
            src="/images/schoolmate/logo.svg"
            alt="message"
            width={150}
            height={150}
          />
          <span className="font-bold mt-7">{token.message}</span>
        </div>
      </>
    );

  return (
    <>
      <div
        className={classNames(
          "flex flex-col h-[100vh] items-center justify-center",
          inter.className
        )}
      >
        <Image
          src="/images/schoolmate/logo.svg"
          alt="message"
          width={150}
          height={150}
        />
        <span className="font-bold mt-7">
          리그오브레전드 계정 연동이 완료되었습니다
        </span>
        <span className="font-light">앱으로 돌아가주세요</span>
      </div>
    </>
  );
};

export default ConnectInstagramPage;

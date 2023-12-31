import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { AskedListWithUser, AskedWithUser } from "@/types/asked";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect, useParams } from "next/navigation";
import UserAksedList from "./_component/UserAskedList";
import { cache } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";

const getUserAsked = cache(async (userId: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const authorizationToken = cookies().get("Authorization");

  try {
    const asked = await fetcher(`/asked/${userId}`, {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });

    return {
      ...asked.data.data,
      auth,
    } as AskedListWithUser & {
      auth: Session;
    };
  } catch (e) {
    return null;
  }
});

interface Props {
  params: {
    userId: string;
  };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const asked = await getUserAsked(params.userId);
  if (!asked)
    return {
      title: "찾을 수 없는 에스크",
      description: "존재하지 않는 에스크입니다.",
    };

  return {
    title: `${asked.user.user.name}의 에스크 / ${asked.auth.user.user.userSchool?.school.defaultName}`,
  };
};

const AskedUser = async ({ params }: Props) => {
  const asked = await getUserAsked(params.userId);

  if (!asked)
    return (
      <>
        <LeftHeaderContainer
          title="이런..."
          className="pb-20"
          searchIcon={false}
        >
          <div
            className={classNames(
              "flex flex-col items-center justify-center h-[88vh] text-[#B6B6B6]",
              inter.className
            )}
          >
            <span className="text-lg mb-5">학생 정보를 찾을 수 없어요!</span>
            <span>상대방 학생이 다른 학교 학생의 질문을</span>
            <span>받지 않도록 설정했을 수도 있어요</span>
          </div>
        </LeftHeaderContainer>
      </>
    );
  return (
    <>
      <LeftHeaderContainer
        title={asked.user.user.name + "의 에스크"}
        className="pb-20"
        searchIcon={false}
      >
        <UserAksedList asked={asked} />
      </LeftHeaderContainer>
    </>
  );
};

export default AskedUser;

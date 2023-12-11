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

const getUserAsked = cache(async (userId: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  try {
    const asked = await fetcher(`/asked/${userId}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
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
    title: asked.user.user.name + "의 에스크",
  };
};

const AskedUser = async ({ params }: Props) => {
  const asked = await getUserAsked(params.userId);

  if (!asked) return <></>;
  return (
    <>
      <LeftHeaderContainer
        title={asked.user.user.name + "의 에스크"}
        className="pb-20"
        seachIcon={false}
      >
        <UserAksedList asked={asked} auth={asked.auth} />
      </LeftHeaderContainer>
    </>
  );
};

export default AskedUser;

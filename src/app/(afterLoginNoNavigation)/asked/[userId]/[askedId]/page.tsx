import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { AskedDetailWithUser, AskedWithUser } from "@/types/asked";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AskedReply from "./_component/AskedReply";
import { cache } from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";

const getAskedDetail = cache(async (userId: string, askedId: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const authorizationToken = cookies().get("Authorization");

  try {
    const asked = await fetcher(`/asked/${userId}/${askedId}`, {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });
    return {
      ...asked.data.data,
      auth,
    } as AskedDetailWithUser & {
      auth: Session;
    };
  } catch (e) {
    return null;
  }
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const asked = await getAskedDetail(params.userId, params.askedId);
  if (!asked)
    return {
      title: "찾을 수 없는 에스크",
      description: "존재하지 않는 에스크입니다.",
    };

  return {
    title: asked.isAnonymous
      ? "익명님의 질문"
      : asked.questionUser.name + "님의 질문",
  };
};

interface Props {
  params: {
    userId: string;
    askedId: string;
  };
}

const AskedReplyPage = async ({ params }: Props) => {
  const asked = await getAskedDetail(params.userId, params.askedId);

  if (!asked) return <></>;
  return (
    <LeftHeaderContainer
      title={
        asked.isAnonymous
          ? "익명님의 질문"
          : asked.questionUser.name + "님의 질문"
      }
      seachIcon={false}
    >
      <AskedReply asked={asked} auth={asked.auth} />
    </LeftHeaderContainer>
  );
};

export default AskedReplyPage;

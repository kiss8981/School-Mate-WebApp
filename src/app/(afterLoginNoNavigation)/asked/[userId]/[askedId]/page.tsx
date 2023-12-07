import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { AskedDetailWithUser, AskedWithUser } from "@/types/asked";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import AskedReply from "./_component/AskedReply";

const getAskedDetail = async (
  userId: string,
  askedId: string,
  auth: Session
) => {
  try {
    const asked = await fetcher(`/asked/${userId}/${askedId}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
      },
    });
    return asked.data.data as AskedDetailWithUser;
  } catch (e) {
    return null;
  }
};

const AskedReplyPage = async ({
  params,
}: {
  params: {
    userId: string;
    askedId: string;
  };
}) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const asked = await getAskedDetail(params.userId, params.askedId, auth);

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
      <AskedReply asked={asked} auth={auth} />
    </LeftHeaderContainer>
  );
};

export default AskedReplyPage;

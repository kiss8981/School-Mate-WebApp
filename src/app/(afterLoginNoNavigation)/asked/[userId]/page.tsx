import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { AskedListWithUser, AskedWithUser } from "@/types/asked";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect, useParams } from "next/navigation";
import UserAksedList from "./_component/UserAskedList";

const getUserAsked = async (userId: string, auth: Session) => {
  try {
    const asked = await fetcher(`/asked/${userId}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
      },
    });
    return asked.data.data as AskedListWithUser;
  } catch (e) {
    return null;
  }
};

const AskedUser = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const asked = await getUserAsked(params.userId, auth);

  if (!asked) return <></>;
  return (
    <>
      <LeftHeaderContainer
        title={asked.user.user.name + "의 에스크"}
        className="pb-20"
        seachIcon={false}
      >
        <UserAksedList asked={asked} auth={auth} />
      </LeftHeaderContainer>
    </>
  );
};

export default AskedUser;

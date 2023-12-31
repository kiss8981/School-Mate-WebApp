import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import AskedModify from "./_component/AskedModify";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { Session } from "next-auth";
import { AskedListWithUser } from "@/types/asked";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "에스크 프로필 수정",
};

const getAsked = async (auth: Session) => {
  const authorizationToken = cookies().get("Authorization");

  try {
    const asked = await fetcher(`/asked/${auth.user.user.id}`, {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });

    return asked.data.data as AskedListWithUser;
  } catch (e) {
    return null;
  }
};

const AskedPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  const asked = await getAsked(auth);
  if (!asked) return redirect("/asked");

  return (
    <LeftHeaderContainer title="프로필 수정" searchIcon={false}>
      <AskedModify auth={auth} asked={asked} />
    </LeftHeaderContainer>
  );
};
export default AskedPage;

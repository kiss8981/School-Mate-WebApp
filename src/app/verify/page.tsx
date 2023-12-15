import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import fetcher from "@/lib/fetch";
import { UserSchoolVerify } from "schoolmate-types";
import Error from "@/app/_component/Error";
import VerifyRequest from "./_component/verfiyRequest";
import HeaderContainer from "@/app/_component/HeaderContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";

async function getVerifyList(
  auth: Session
): Promise<UserSchoolVerify[] | null> {
  const authorizationToken = cookies().get("Authorization");
  try {
    const { data: verifyList } = await fetcher("/auth/me/schoolverify", {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });

    return verifyList.data;
  } catch (e) {
    return null;
  }
}

export const metadata: Metadata = {
  title: "학교인증",
};

const VerifyPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  const verifyList = await getVerifyList(auth);
  if (!verifyList)
    return <Error message="인증 목록을 불러오는데 실패했습니다." />;

  return (
    <>
      <HeaderContainer
        backIcon={false}
        title="학교인증"
        className="relative h-[100vh]"
      >
        <VerifyRequest verifys={verifyList} auth={auth} />
      </HeaderContainer>
    </>
  );
};

export default VerifyPage;

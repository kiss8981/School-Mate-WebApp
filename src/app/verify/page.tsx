import { Session, getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";
import fetcher from "@/lib/fetch";
import { UserSchoolVerify } from "schoolmate-types";
import Error from "../_component/Error";
import VerifyRequest from "./_component/verfiyRequest";
import HeaderContainer from "../_component/HeaderContainer";

async function getVerifyList(
  auth: Session
): Promise<UserSchoolVerify[] | null> {
  try {
    const { data: verifyList } = await fetcher("/auth/me/schoolverify", {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
      },
    });

    return verifyList.data;
  } catch (e) {
    return null;
  }
}

const VerifyPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  const verifyList = await getVerifyList(auth);
  if (!verifyList)
    return <Error message="인증 목록을 불러오는데 실패했습니다." />;

  return (
    <>
      <HeaderContainer backIcon={false} title="학교인증" className="relative h-[100vh] w-[100vw]">
        <VerifyRequest verifys={verifyList} auth={auth} />
      </HeaderContainer>
    </>
  );
};

export default VerifyPage;

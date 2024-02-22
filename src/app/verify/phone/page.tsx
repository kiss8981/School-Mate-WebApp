import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import fetcher from "@/lib/fetch";
import { UserSchoolVerify } from "schoolmate-types";
import Error from "@/app/_component/Error";
import VerifyPhone from "./_component/verifyPhone";
import HeaderContainer from "@/app/_component/HeaderContainer";
import { Metadata } from "next";
import { cookies } from "next/headers";
export const metadata: Metadata = {
  title: "전화번호 인증",
};

const VerifyPhonePage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (auth.user.user.isVerified) return redirect("/main");

  return (
    <>
      <HeaderContainer
        backIcon={true}
        title="전화번호 인증"
        className="relative h-[100vh]"
        backPath="/intro"
      >
        <VerifyPhone auth={auth} />
      </HeaderContainer>
    </>
  );
};

export default VerifyPhonePage;

import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import SignoutComponent from "./_component/SignoutComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "회원탈퇴",
};

const SignOut = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <>
      <LeftHeaderContainer title="회원탈퇴" searchIcon={false}>
        <SignoutComponent auth={auth} />
      </LeftHeaderContainer>
    </>
  );
};

export default SignOut;

import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import ConnectAccountInfo from "./_component/ConnectAccountInfo";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const getAuth = async () => {
  const authorizationToken = cookies().get("Authorization");

  if (!authorizationToken) return redirect("/intro");
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return {
    auth,
    token: authorizationToken?.value,
  };
};

const ConnectAccountPage = async () => {
  const auth = await getAuth();

  return (
    <>
      <LeftHeaderContainer title="계정 연동" searchIcon={false}>
        <ConnectAccountInfo token={auth.token} />
      </LeftHeaderContainer>
    </>
  );
};

export default ConnectAccountPage;

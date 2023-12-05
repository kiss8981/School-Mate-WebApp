import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import AskedIntro from "./_component/AskedIntro";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/auth";

const AskedPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <LeftHeaderContainer title="에스크 프로필 만들기" seachIcon={false}>
      <AskedIntro auth={auth} />
    </LeftHeaderContainer>
  );
};
export default AskedPage;

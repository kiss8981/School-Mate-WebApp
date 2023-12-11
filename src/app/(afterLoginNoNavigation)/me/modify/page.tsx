import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import EditProfile from "./_component/EditProfile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "프로필 수정",
};

const MeModifyPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <>
      <LeftHeaderContainer title="프로필 수정" seachIcon={false}>
        <EditProfile auth={auth} />
      </LeftHeaderContainer>
    </>
  );
};

export default MeModifyPage;

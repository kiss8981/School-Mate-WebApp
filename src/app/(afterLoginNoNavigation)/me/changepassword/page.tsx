import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import ChangePassword from "./_component/ChagePassword";

const changePasswordPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <LeftHeaderContainer title="비밀번호 재설정" searchIcon={false}>
      <ChangePassword />
    </LeftHeaderContainer>
  );
};

export default changePasswordPage;

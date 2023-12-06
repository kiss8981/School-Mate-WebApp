import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import HeaderContainer from "@/app/_component/HeaderContainer";
import MyInfo from "./_component/MyInfo";

const Home: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <HeaderContainer title="내 정보" backIcon={false}>
      <MyInfo auth={auth} />
    </HeaderContainer>
  );
};

export default Home;

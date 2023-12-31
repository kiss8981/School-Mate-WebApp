import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { Metadata, NextPage } from "next";
import HeaderContainer from "@/app/_component/HeaderContainer";
import MyInfo from "./_component/MyInfo";
import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";

export const metadata: Metadata = {
  title: `내 정보`,
};

const Home: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <LeftHeaderContainer title="내 정보" searchIcon={false}>
      <MyInfo auth={auth} />
    </LeftHeaderContainer>
  );
};

export default Home;

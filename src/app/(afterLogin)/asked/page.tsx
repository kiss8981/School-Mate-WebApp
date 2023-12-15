import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { Metadata, NextPage } from "next";
import AskedMe from "./_component/AskedMe";
import HeaderContainer from "@/app/_component/HeaderContainer";
import SerachButton from "@/app/_component/SearchButton";

export const metadata: Metadata = {
  title: "에스크",
};

const AkedPage: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <HeaderContainer
      backIcon={false}
      title="에스크"
      rightIcon={<SerachButton searchPath="/searchasked" />}
    >
      <AskedMe />
    </HeaderContainer>
  );
};

export default AkedPage;

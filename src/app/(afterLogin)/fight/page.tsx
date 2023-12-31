import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import FightList from "./_component/FightList";

const FightPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  return (
    <>
      <LeftHeaderContainer
        title="진행중인 대결"
        searchPath="/searchfight"
        backIcon={false}
      >
        <FightList />
      </LeftHeaderContainer>
    </>
  );
};

export default FightPage;

import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { Metadata, NextPage } from "next";
import BoardList from "./_component/BoardList";

export const metadata: Metadata = {
  title: "게시판 목록",
};

const BoardPage: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <>
      <LeftHeaderContainer
        title="게시판 목록"
        className="bg-[#f9f9f9] min-h-[100vh] pb-24"
        backIcon={false}
      >
        <BoardList />
      </LeftHeaderContainer>
    </>
  );
};

export default BoardPage;

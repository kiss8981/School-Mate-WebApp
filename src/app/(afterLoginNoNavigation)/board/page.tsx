import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { BoardListSkeleton } from "./_component/BoardList";
import { Suspense } from "react";
import fetcher from "@/lib/fetch";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { NextPage } from "next";

const BoardItem = dynamic(() => import("./_component/BoardList"), {
  loading: () => <BoardListSkeleton />,
  ssr: false,
});

const BoardPage: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <>
      <LeftHeaderContainer
        title="게시판 목록"
        className="bg-[#f9f9f9] min-h-[100vh] pb-10"
      >
        <Suspense fallback={<BoardListSkeleton />}>
          <BoardItem
            data={fetcher("/board", {
              headers: {
                Authorization: `Bearer ${auth.user.token.accessToken}`,
              },
            })}
          />
        </Suspense>
      </LeftHeaderContainer>
    </>
  );
};

export default BoardPage;

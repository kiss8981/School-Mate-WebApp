import HeaderContainer from "@/app/_component/HeaderContainer";
import SerachButton from "@/app/_component/SearchButton";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { ArticleWithImage } from "@/types/article";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Board } from "schoolmate-types";
import Image from "next/image";
import ArticleList from "./_component/ArticleList";
import { cache } from "react";
import { Session } from "next-auth";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { AxiosError } from "axios";

const getBoard = cache(async (boardId: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const authorizationToken = cookies().get("Authorization");

  try {
    const board = await fetcher(`/board/${boardId}`, {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });

    return {
      ...board.data.data,
      auth,
    } as Board & { article: ArticleWithImage[] } & {
      auth: Session;
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) return null;
      if (e.response.status === 401) return redirect("/intro");
      if (e.response.status === 404) return null;
    }
    return null;
  }
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const board = await getBoard(params.boardId);
  if (!board)
    return {
      title: "찾을 수 없는 게시판",
      description: "존재하지 않는 게시판입니다.",
    };
  return {
    title: `${board.name} / ${board.auth.user.user.userSchool?.school.defaultName}`,
    description: board.description,
  };
};

interface Props {
  params: {
    articleId: string;
    boardId: string;
  };
}

const BoardPage = async ({ params }: Props) => {
  const board = await getBoard(params.boardId);

  if (!board) return <></>;
  return (
    <>
      <HeaderContainer
        title={
          board.icon
            ? board.icon + " " + board.name
            : board.default
            ? "📌 " + board.name
            : params.boardId === "hot"
            ? "🔥 HOT 게시판"
            : board.name
        }
        rightIcon={<SerachButton />}
      >
        <div className={classNames("w-full", inter.className)}>
          <div className="border-b pt-4">
            <div className="px-4 flex flex-row justify-between pb-5">
              <div className="flex flex-col">
                <div className="px-3 py-1 bg-[#F9F9F9] text-[#7C7C7C] w-fit rounded-[13px] text-[0.8rem]">
                  {board.default
                    ? "즐겨찾는 게시판"
                    : params.boardId === "hot"
                    ? "인기 게시판"
                    : "학교 게시판"}
                </div>
                <div className="mt-1 text-xl font-bold">
                  {board.icon
                    ? board.icon + " " + board.name
                    : board.default
                    ? "📌 " + board.name
                    : params.boardId === "hot"
                    ? "🔥 HOT 게시판"
                    : board.name}
                </div>
              </div>
              <Image
                src="/images/schoolmate/logo.svg"
                alt="logo"
                width={70}
                height={70}
                className="mt-auto"
              />
            </div>
          </div>
          <ArticleList boardId={params.boardId} />
        </div>
      </HeaderContainer>
    </>
  );
};

export default BoardPage;

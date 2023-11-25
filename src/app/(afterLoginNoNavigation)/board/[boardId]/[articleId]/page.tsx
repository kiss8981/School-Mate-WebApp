import HeaderContainer from "@/app/_component/HeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { ArticleWithImage } from "@/types/article";
import { NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Image from "next/image";
import Article from "./_component/Article";

const getArticle = async (boardId: string, articleId: string) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  const article = await fetcher(`/board/${boardId}/article/${articleId}`, {
    headers: {
      Authorization: `Bearer ${auth.user.token.accessToken}`,
    },
  });
  if (article.data.status === 401) return redirect("/intro");
  if (article.data.status === 404) return null;

  return article.data.data as ArticleWithImage;
};

interface Props {
  params: {
    articleId: string;
    boardId: string;
  };
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const article = await getArticle(params.boardId, params.articleId);
  if (!article) return redirect("/intro");
  return (
    <HeaderContainer
      title={article.board.name}
      rightIcon={
        <button className="flex flex-row space-x-2">
          <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
        </button>
      }
    >
      <Article article={article} />
    </HeaderContainer>
  );
};

export default ArticlePage;

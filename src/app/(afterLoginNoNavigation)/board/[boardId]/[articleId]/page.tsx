import HeaderContainer from "@/app/_component/HeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { ArticleWithImage, CommentWithUser } from "@/types/article";
import { NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Article from "./_component/Article";
import SerachButton from "@/app/_component/SearchButton";
import { Session } from "next-auth";

const getArticle = async (
  boardId: string,
  articleId: string,
  auth: Session
) => {
  const article = await fetcher(`/board/${boardId}/article/${articleId}`, {
    headers: {
      Authorization: `Bearer ${auth.user.token.accessToken}`,
    },
  });
  if (article.data.status === 401) return redirect("/intro");
  if (article.data.status === 404) return null;

  return article.data.data as ArticleWithImage & {
    comments: {
      comments: CommentWithUser[];
      totalPage: number;
    };
  };
};

interface Props {
  params: {
    articleId: string;
    boardId: string;
  };
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const article = await getArticle(params.boardId, params.articleId, auth);
  if (!article) return <></>;
  return (
    <HeaderContainer title={article.board.name} rightIcon={<SerachButton />}>
      <Article article={article} auth={auth} />
    </HeaderContainer>
  );
};

export default ArticlePage;

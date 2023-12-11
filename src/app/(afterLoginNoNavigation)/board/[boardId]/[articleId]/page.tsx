import HeaderContainer from "@/app/_component/HeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { ArticleWithImage, CommentWithUser } from "@/types/article";
import { Metadata, NextPage } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Article from "./_component/Article";
import SerachButton from "@/app/_component/SearchButton";
import { Session } from "next-auth";
import { cache } from "react";

const getArticle = cache(async (boardId: string, articleId: string) => {
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

  return {
    ...article.data.data,
    auth: auth,
  } as ArticleWithImage & {
    comments: {
      comments: CommentWithUser[];
      totalPage: number;
    };
  } & {
    auth: Session;
  };
});

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const article = await getArticle(params.boardId, params.articleId);
  if (!article)
    return {
      title: "찾을 수 없는 게시글",
      description: "존재하지 않는 게시글입니다.",
    };

  return {
    title: `${article.title} / ${article.board.name}`,
    description: article.content,
    openGraph: {
      ...(article.images && {
        images: [
          {
            url: process.env.NEXT_PUBLIC_S3_URL + article.images[0],
          },
        ],
      }),
      siteName: "스쿨메이트",
    },
  };
};

interface Props {
  params: {
    articleId: string;
    boardId: string;
  };
}

const ArticlePage: NextPage<Props> = async ({ params }) => {
  const article = await getArticle(params.boardId, params.articleId);
  if (!article) return <></>;
  return (
    <HeaderContainer title={article.board.name} rightIcon={<SerachButton />}>
      <Article article={article} auth={article.auth} />
    </HeaderContainer>
  );
};

export default ArticlePage;

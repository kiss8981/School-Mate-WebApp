import { ArticleWithImage } from "@/types/article";
import { AxiosResponse } from "axios";
import ArticleList from "./ArticleList";
import { Session } from "next-auth";
import { Board } from "schoolmate-types";

const ArticleListSSR = async ({
  data,
  auth,
  board,
}: {
  data: Promise<AxiosResponse>;
  auth: Session;
  board: Board;
}) => {
  const articles = (await data.then(res => res.data.data)) as {
    articles: ArticleWithImage[];
    totalPage: number;
  };

  return <ArticleList articles={articles} auth={auth} board={board} />;
};

const ArticleListSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-col mt-3 pb-4 px-4 items-center w-full space-y-2">
      <div
        className={`relative h-[100px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[100px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[100px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
    </div>
  );
};

export default ArticleListSSR;
export { ArticleListSkeleton };

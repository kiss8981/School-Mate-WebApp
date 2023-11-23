import Button from "@/app/_component/Button";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { ArticleWithImage } from "@/types/article";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NoRecommendArticle from "./NoRecommendArticle";

export const RecommentArticle = async ({
  data,
}: {
  data: Promise<AxiosResponse>;
}) => {
  const articles = (await data.then(
    (res) => res.data.data
  )) as ArticleWithImage[];

  return (
    <>
      {articles.length === 0 ? (
        <NoRecommendArticle />
      ) : (
        <>
          {articles.map((article, index) => (
            <div key={index}>{article.title}</div>
          ))}
        </>
      )}
    </>
  );
};

export const RecommnedArticleSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-row space-x-4">
      <div className="flex flex-col w-1/2 space-y-4">
        <div
          className={`relative h-[90px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
        <div
          className={`relative h-[170px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-1/2 space-y-4">
        <div
          className={`relative h-[140px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
        <div
          className={`relative h-[120px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
    </div>
  );
};

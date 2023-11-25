import Button from "@/app/_component/Button";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames, timeForToday } from "@/lib/uitls";
import { ArticleWithImage } from "@/types/article";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import NoRecommendArticle from "./NoRecommendArticle";
import dayjs from "dayjs";

export const RecommentArticle = async ({
  data,
}: {
  data: Promise<AxiosResponse>;
}) => {
  const articles = (await data.then(
    res => res.data.data
  )) as ArticleWithImage[];

  return (
    <>
      {articles.length === 0 ? (
        <NoRecommendArticle />
      ) : (
        <>
          <div
            style={{
              columnCount: 2,
              columnGap: "0.75rem",
            }}
          >
            {articles.splice(0, 6).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>

          <div className="w-full flex flex-row justify-center mt-4">
            <button className="flex flex-row items-center justify-center text-[#7c7c7c] bg-[#F9F9F9] rounded-full px-4 border py-1.5">
              <Image
                src="/icons/PlusOnly.svg"
                alt="더보기"
                className="mr-2"
                width={12}
                height={12}
                style={{
                  filter:
                    "invert(48%) sepia(13%) saturate(20%) hue-rotate(315deg) brightness(99%) contrast(93%)",
                }}
              />
              더보기
            </button>
          </div>
        </>
      )}
    </>
  );
};

const ArticleCard = ({ article }: { article: ArticleWithImage }) => {
  return (
    <>
      <div className="bg-white border border-[#f0f0f0] rounded-[20px] p-3 w-full h-fit inline-block break-inside-avoid mt-3">
        <div className="flex flex-row items-center bg-[#EFF2FF] w-fit px-2 rounded-full py-1">
          <span
            className="text-[#0029FF] font-bold"
            style={{
              fontSize: "0.65rem",
            }}
          >
            {article.board.name}
          </span>
        </div>

        {article.images.length > 0 && (
          <div className="relative h-[70px] rounded-[10px] overflow-hidden my-2">
            <Image
              src={process.env.NEXT_PUBLIC_S3_URL + article.images[0]}
              alt="article"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div className="w-full flex flex-col mt-1 px-1">
          <span className="font-bold text-sm">{article.title}</span>
          <pre
            className={classNames(
              "text-[#8c8c8c] mt-1 truncate",
              inter.className
            )}
            style={{
              fontSize: "0.7rem",
            }}
          >
            {article.content}
          </pre>
          <div className="flex flex-row mt-1">
            <div
              className="flex flex-row items-center"
              style={{
                fontSize: "0.7rem",
              }}
            >
              <Image src="/icons/Like.svg" alt="Like" width={12} height={12} />
              <span className="text-[#8c8c8c] ml-1">{article.likeCounts}</span>
            </div>
            <div
              className="flex flex-row items-center ml-2"
              style={{
                fontSize: "0.7rem",
              }}
            >
              <Image
                src="/icons/Comment.svg"
                alt="comment"
                width={12}
                height={12}
              />
              <span className="text-[#8c8c8c] ml-1">
                {article.commentCounts}
              </span>
            </div>

            <span
              className="flex flex-row ml-auto text-[#8c8c8c]"
              style={{
                fontSize: "0.7rem",
              }}
            >
              {timeForToday(article.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export const RecommnedArticleSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-row space-x-4 mt-3">
      <div className="flex flex-col w-1/2 space-y-4">
        <div
          className={`relative h-[140px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
        <div
          className={`relative h-[200px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
      <div className="flex flex-col w-1/2 space-y-4">
        <div
          className={`relative h-[220px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
        <div
          className={`relative h-[120px] rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
        />
      </div>
    </div>
  );
};

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
              columnGap: "1rem",
            }}
          >
            {articles.splice(0, 6).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>

          <div className="w-full flex flex-row justify-center mt-7">
            <Button className="flex flex-row items-center justify-center text-[#7c7c7c] bg-[#F9F9F9] rounded-full px-4">
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
            </Button>
          </div>
        </>
      )}
    </>
  );
};

const ArticleCard = ({ article }: { article: ArticleWithImage }) => {
  return (
    <>
      <div className="bg-white border border-[#f0f0f0] rounded-[20px] shadow-[0px 4px 10px rgba(0, 0, 0, 0.14)] p-3 w-full h-fit inline-block break-inside-avoid mt-4">
        <div className="flex flex-row items-center bg-[#EFF2FF] w-fit px-2 rounded-full py-1">
          <span className="text-[#0029FF] text-sm font-bold">
            {article.board.name}
          </span>
        </div>

        {article.images.length > 0 && (
          <div className="relative h-[75px] rounded-[10px] overflow-hidden my-2">
            <Image
              src={process.env.NEXT_PUBLIC_S3_URL + article.images[0]}
              alt="article"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}

        <div className="w-full flex flex-col mt-1 px-1">
          <span className="font-bold">{article.title}</span>
          <pre
            className={classNames(
              "text-sm text-[#8c8c8c] mt-1 truncate",
              inter.className
            )}
          >
            {article.content}
          </pre>
          <div className="flex flex-row mt-1">
            <div className="flex flex-row items-center">
              <Image src="/icons/Like.svg" alt="Like" width={12} height={12} />
              <span className="text-[#8c8c8c] text-sm ml-1">
                {article.likeCounts}
              </span>
            </div>
            <div className="flex flex-row items-center ml-2">
              <Image
                src="/icons/Comment.svg"
                alt="comment"
                width={12}
                height={12}
              />
              <span className="text-[#8c8c8c] text-sm ml-1">
                {article.commentCounts}
              </span>
            </div>

            <span className="flex flex-row ml-auto text-[#8c8c8c] text-sm">
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

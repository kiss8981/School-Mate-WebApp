import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { ArticleWithImage } from "@/types/article";
import dayjs from "dayjs";
import Image from "next/image";

const Article = ({ article }: { article: ArticleWithImage }) => {
  return (
    <>
      <div
        className={classNames(
          "flex flex-col min-h-[100vh] px-4 pb-10",
          inter.className
        )}
      >
        <div className="flex flex-row w-full items-center">
          <div className="relative h-[50px] w-[50px] rounded-full overflow-hidden my-2">
            <Image
              src={
                !article.isAnonymous
                  ? article.user.profile
                    ? process.env.NEXT_PUBLIC_S3_URL + article.user.profile
                    : "/images/schoolmate/logobg.svg"
                  : "/images/schoolmate/logobg.svg"
              }
              alt="article"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex flex-col ml-3">
            <span className="text-[#66738C] text-base font-bold items-center flex justify-center">
              {article.isAnonymous ? "익명" : article.user.name}
              {article.isMe && (
                <span className="font-light border border-primary-500 rounded-full text-primary-500 px-1 ml-1 text-[0.75rem] leading-[1rem]">
                  작성자
                </span>
              )}
            </span>
            <span className="text-[#66738C] text-sm font-light">
              {dayjs(article.createdAt).format("MM/DD HH:mm")}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start">
          <span className="text-lg font-bold h-full whitespace-pre-wrap break-words w-full">
            {article.title}
          </span>
          <pre
            className={classNames(
              "mt-1 text-start w-full h-full whitespace-pre-wrap break-words text-base",
              inter.className
            )}
          >
            {article.content}
          </pre>
        </div>
        {article.images.length > 0 && (
          <div className="flex flex-col w-full mt-4">
            {article.images.map((image, index) => (
              <div
                key={index}
                className="relative h-60 w-full rounded-[20px] overflow-hidden my-2"
              >
                <Image
                  src={process.env.NEXT_PUBLIC_S3_URL + image}
                  alt="article"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        )}
        <div className="flex flex-row w-full mt-4 space-x-3">
          <div className="flex flex-row">
            <Image src="/icons/Like.svg" alt="Like" width={20} height={20} />
            <span className="text-[#8c8c8c] ml-1">{article.likeCounts}</span>
          </div>
          <div className="flex flex-row">
            <Image
              src="/icons/Comment.svg"
              alt="Commnet"
              width={20}
              height={20}
            />
            <span className="text-[#8c8c8c] ml-1">{article.commentCounts}</span>
          </div>
          <div className="flex flex-row">
            <Image src="/icons/View.svg" alt="View" width={23} height={23} />
            <span className="text-[#8c8c8c] ml-1">{article.likeCounts}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;

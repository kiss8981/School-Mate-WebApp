import { stackRouterPush } from "@/lib/stackRouter";
import { classNames, timeForToday } from "@/lib/uitls";
import { ArticleWithImage } from "@/types/article";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ArticleCard = ({
  article,
  className,
}: {
  article: ArticleWithImage;
  className?: string;
}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        stackRouterPush(router, `/board/${article.boardId}/${article.id}`);
      }}
      className={classNames(
        "w-full border-b flex flex-row py-3 min-h-[95px]",
        className
      )}
    >
      <div className="flex flex-col h-auto justify-between w-2/3">
        <span className="font-bold">{article.title}</span>
        <span className="text-sm text-[#7c7c7c] mb-auto">
          {article.content.length > 15
            ? article.content.slice(0, 15) + "..."
            : article.content}
        </span>
        <div className="text-[#7c7c7c] text-[0.75rem] mt-auto">
          <span>{timeForToday(article.createdAt)}</span>
          <span className="mx-1">·</span>
          <span>조회 {article.views}</span>
        </div>
      </div>
      <div className="mt-auto ml-auto">
        {article.images.length > 0 && (
          <div className="relative h-[70px] w-20 border rounded-[10px] overflow-hidden">
            <Image
              src={process.env.NEXT_PUBLIC_S3_URL + article.images[0]}
              alt="article"
              layout="fill"
              objectFit="cover"
            />
          </div>
        )}
        <div className="mt-auto flex flex-row space-x-2 justify-end text-[0.75rem]">
          <div className="flex flex-row mt-1">
            <Image alt="like" src="/icons/like.svg" width={13} height={13} />
            <span className="text-[#7c7c7c] text-[0.75rem] ml-1">
              {article.likeCounts}
            </span>
          </div>
          <div className="flex flex-row mt-1">
            <Image
              alt="comment"
              src="/icons/Comment.svg"
              width={13}
              height={13}
            />
            <span className="text-[#7c7c7c] text-[0.75rem] ml-1">
              {article.commentCounts}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

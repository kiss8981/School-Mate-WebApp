import ArticleCard from "@/app/_component/ArticleCard";
import fetcher, { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { classNames, timeForToday } from "@/lib/uitls";
import { ArticleWithImage } from "@/types/article";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const SearchModalResult = ({
  keyword,
  auth,
}: {
  keyword: string | undefined;
  auth: Session;
}) => {
  fetcher.defaults.headers[
    "Authorization"
  ] = `Bearer ${auth?.user.token.accessToken}`;
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useSWR<ArticleWithImage[]>(
    `/board/search?keyword=${keyword}&page=${page}`,
    swrFetcher
  );

  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;
  if (isLoading || !keyword)
    return (
      <>
        <div
          className={classNames(
            "mx-auto flex flex-col items-center justify-center pt-20 w-full",
            inter.className
          )}
        >
          <div
            className={classNames(
              "relative rounded-[20px] overflow-hidden h-[100px] border bg-[#CCCCCC] w-28",
              isLoading ? shimmer : ""
            )}
          />
          <span className="text-[#CCCCCC] mt-3 text-lg font-bold">
            {isLoading
              ? "게시글을 찾고 있어요..."
              : !keyword
              ? "게시글을 검색해보세요"
              : ""}
          </span>
        </div>
      </>
    );

  if (data && data.length === 0)
    return (
      <>
        <div
          className={classNames(
            "mx-auto flex flex-col items-center justify-center pt-32 w-full text-[#CCCCCC] text-lg px-5",
            inter.className
          )}
        >
          <span>
            {auth.user.user.userSchool?.school.name
              ? auth.user.user.userSchool?.school.name
              : auth.user.user.userSchool?.school.defaultName}{" "}
            게시판에
          </span>
          <span>
            <span className="font-bold">
              {"'"}
              {keyword}
              {"'"}
            </span>
            에 대한 게시글이 없어요.
          </span>
        </div>
      </>
    );

  return (
    <>
      <div className={classNames("px-5", inter.className)}>
        {data?.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </>
  );
};

export default SearchModalResult;

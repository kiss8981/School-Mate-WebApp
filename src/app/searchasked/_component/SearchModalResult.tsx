import fetcher, { swrFetcher } from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { AskedUserDetail } from "@/types/asked";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
  const { data, error, isLoading } = useSWR<{
    totalPage: number;
    contents: AskedUserDetail[];
  }>(`/asked/search?keyword=${keyword}&page=${page}`, swrFetcher);

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
              ? "학생들을 찾고 있어요..."
              : !keyword
              ? "질문할 사람을 검색해보세요"
              : ""}
          </span>
        </div>
      </>
    );

  if (data && data.contents.length === 0)
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
            에스크에
          </span>
          <span>
            <span className="font-bold">
              {"'"}
              {keyword}
              {"'"}
            </span>
            에 관련된 학생이 없어요.
          </span>
        </div>
      </>
    );

  return (
    <>
      <div className={classNames("px-5 space-y-3", inter.className)}>
        {data?.contents.map((asked, index) => (
          <AskedCard key={index} asked={asked} />
        ))}
      </div>
    </>
  );
};

const AskedCard = ({ asked }: { asked: AskedUserDetail }) => {
  const router = useRouter();
  return (
    <>
      <div
        className="w-full flex flex-row items-center py-2"
        onClick={() => {
          stackRouterPush(router, `/asked/${asked.userId}`);
        }}
      >
        <div
          className={classNames(
            "relative rounded-full w-16 h-16 overflow-hidden border bg-[#CCCCCC]"
          )}
        >
          <Image
            src={
              asked.user.profile
                ? process.env.NEXT_PUBLIC_S3_URL + asked.user.profile
                : "/images/schoolmate/logobg.svg"
            }
            layout="fill"
            objectFit="cover"
            className="rounded-full"
            alt="profile"
          />
        </div>
        <div className="flex flex-col ml-3">
          <span className="text-lg font-bold">{asked.user.name}</span>
          <div className="text-sm text-[#CCCCCC] space-x-2">
            {asked.tags.slice(0, 2).map((item, key) => (
              <span
                key={key}
                className={classNames(
                  "text-[0.7rem] font-bold text-white px-2 py-[0.14rem] rounded-full truncate",
                  "bg-[#0a1a3a]"
                )}
              >
                #{item}
              </span>
            ))}
          </div>
        </div>
        <div className="ml-auto flex flex-row bg-[#f0f0f0] px-4 py-2 rounded-full">
          <Image
            src="/icons/PlusOnly.svg"
            width={15}
            height={15}
            alt="arrow"
            className="mr-2"
            style={{
              filter: "invert(1)",
            }}
          />
          에스크
        </div>
      </div>
    </>
  );
};

export default SearchModalResult;

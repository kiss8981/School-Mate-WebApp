import { Loading } from "@/app/_component/Loading";
import fetcher from "@/lib/fetch";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { toast } from "@/lib/webviewHandler";
import { AskedUserDetail } from "@/types/asked";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const SearchModalResult = ({
  keyword,
  auth,
}: {
  keyword: string | undefined;
  auth: Session;
}) => {
  const [lastKeyword, setLastKeyword] = useState<string | undefined>();
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [viewRef, inView] = useInView();
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [askeds, setAskeds] = useState<AskedUserDetail[]>([]);

  useEffect(() => {
    if (inView && page < totalPage) {
      if (isLoading) return;
      if (!keyword) return;
      if (lastKeyword !== keyword) return;
      setPage(prev => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    if (!keyword) return setAskeds([]);
    setLastKeyword(keyword);
    fetchData();
  }, [keyword, page]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const {
        data: {
          data: { contents, totalPage },
        },
      } = await fetcher.get(`/asked/search?keyword=${keyword}&page=${page}`);

      if (lastKeyword !== keyword) {
        setPage(1);
        setAskeds(contents);
      } else {
        setAskeds(prev => [...prev, ...contents]);
      }
      setTotalPage(totalPage);
    } catch (e: any) {
      toast("error", e.response.data.message || e.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (askeds && askeds.length === 0)
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
        {askeds.map((asked, index) => (
          <AskedCard key={index} asked={asked} auth={auth} />
        ))}
        {isLoading && <Loading />}
        <div ref={viewRef} />
      </div>
    </>
  );
};

const AskedCard = ({
  asked,
  auth,
}: {
  asked: AskedUserDetail;
  auth: Session;
}) => {
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
          <div className="flex flex-row items-center">
            <span className="text-lg font-bold">{asked.user.name}</span>
            {asked.user.userSchool.school.schoolId !=
              auth.user.user.userSchoolId && (
              <span className="font-light border border-[#0a1a3a] rounded-full text-[#0a1a3a] px-1 ml-1 text-[0.75rem] leading-[1rem] max-w-[6rem] flex items-center justify-center">
                <p className="truncate">
                  {asked.user.userSchool.school.name
                    ? asked.user.userSchool.school.name
                    : asked.user.userSchool.school.defaultName}
                </p>
              </span>
            )}
          </div>
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

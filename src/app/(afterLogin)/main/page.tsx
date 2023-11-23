import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import SchoolHeaderContainer from "./_component/SchoolHeadetContainer";
import HeaderBadage from "./_component/HeaderBadage";
import Advertisement from "./_component/Advertisement";
import { Suspense } from "react";
import {
  RecommnedArticleSkeleton,
  RecommentArticle,
} from "./_component/RecommnedArticle";
import fetcher from "@/lib/fetch";
import { classNames } from "@/lib/uitls";
import { inter } from "@/lib/fonts";
import Image from "next/image";
import SectionTitle from "./_component/SectionTitle";

const Main: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <>
      <SchoolHeaderContainer
        title="가천고등학교"
        badage={
          <HeaderBadage
            title="👀 스쿨메이트를 잘 사용하고 계신가요?"
            description="캘린더를 확인 해 오늘 할 일들을 체크하세요!"
            link="/timetable"
          />
        }
      >
        <Advertisement
          advertisement={[
            {
              image: "https://via.placeholder.com/350x200.png?text=350x200",
              link: "https://via.placeholder.com/728x90.png?text=728x90",
            },
            {
              image: "https://via.placeholder.com/350x200.png?text=350x200",
              link: "https://via.placeholder.com/728x90.png?text=728x90",
            },
          ]}
        />

        <div className={classNames("px-5 pt-4", inter.className)}>
          <SectionTitle title="인기 게시물" subTitle="즐겨찾는 게시판" path="/suggest" />
          <Suspense fallback={<RecommnedArticleSkeleton />}>
            <RecommentArticle
              data={fetcher(`/board/suggest`, {
                headers: {
                  Authorization: `Bearer ${auth.user.token.accessToken}`,
                },
              })}
            />
          </Suspense>
        </div>
      </SchoolHeaderContainer>
    </>
  );
};

export default Main;

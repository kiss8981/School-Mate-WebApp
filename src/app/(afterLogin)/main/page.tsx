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
import SectionContainer from "./_component/SectionContainer";
import TipsSection from "./_component/TipsSection";
import { Asked, AskedSkeleton } from "./_component/Asked";

const Main: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <>
      <SchoolHeaderContainer
        title={
          auth.user.user.userSchool.school.name
            ? auth.user.user.userSchool.school.name
            : auth.user.user.userSchool.school.defaultName
        }
        // badage={
        //   <HeaderBadage
        //     title="👀 스쿨메이트를 잘 사용하고 계신가요?"
        //     description="캘린더를 확인 해 오늘 할 일들을 체크하세요!"
        //     link="/timetable"
        //   />
        // }
      >
        <Advertisement
          advertisement={[
            {
              image: "https://via.placeholder.com/350x200.png?text=350x100",
              link: "https://via.placeholder.com/728x90.png?text=728x90",
            },
            {
              image: "https://via.placeholder.com/350x200.png?text=350x100",
              link: "https://via.placeholder.com/728x90.png?text=728x90",
            },
          ]}
        />
        <SectionContainer
          title="인기 게시물"
          subTitle="즐겨찾는 게시판"
          path="/suggest"
        >
          <Suspense fallback={<RecommnedArticleSkeleton />}>
            <RecommentArticle
              data={fetcher(`/board/suggest`, {
                headers: {
                  Authorization: `Bearer ${auth.user.token.accessToken}`,
                },
              })}
            />
          </Suspense>
        </SectionContainer>
        <TipsSection
          title="가이드 보러가기"
          description="스쿨메이트가 처음이세요?"
          link="/tips"
        />
        <SectionContainer
          title="교내 친구들 찾기"
          subTitle="에스크 기능을 통해"
          path="/ask"
        >
          <Suspense fallback={<AskedSkeleton />}>
            <Asked
              data={fetcher(`/asked`, {
                headers: {
                  Authorization: `Bearer ${auth.user.token.accessToken}`,
                },
              })}
            />
          </Suspense>
        </SectionContainer>
      </SchoolHeaderContainer>
    </>
  );
};

export default Main;

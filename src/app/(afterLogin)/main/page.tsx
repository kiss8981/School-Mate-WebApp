import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import SchoolHeaderContainer from "./_component/SchoolHeaderContainer";
import { AdvertisementSkeleton } from "./_component/Advertisement";
import { Suspense } from "react";
import { RecommnedArticleSkeleton } from "./_component/RecommnedArticle";
import fetcher from "@/lib/fetch";
import SectionContainer from "./_component/SectionContainer";
import TipsSection from "./_component/TipsSection";
import { AskedSkeleton } from "./_component/Asked";
import dynamic from "next/dynamic";

const Asked = dynamic(() => import("./_component/Asked"), {
  loading: () => <AskedSkeleton />,
  ssr: false,
});

const RecommentArticle = dynamic(
  () => import("./_component/RecommnedArticle"),
  {
    loading: () => <RecommnedArticleSkeleton />,
    ssr: false,
  }
);

const Advertisement = dynamic(() => import("./_component/Advertisement"), {
  loading: () => <AdvertisementSkeleton />,
  ssr: false,
});

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
        <Suspense fallback={<AdvertisementSkeleton />}>
          <Advertisement
            data={fetcher(`/ad`, {
              headers: {
                Authorization: `Bearer ${auth.user.token.accessToken}`,
              },
            })}
          />
        </Suspense>
        <SectionContainer
          title="인기 게시물"
          subTitle="즐겨찾는 게시판"
          path="/board"
        >
          <Suspense fallback={<RecommnedArticleSkeleton />}>
            <RecommentArticle
              data={fetcher(`/board/hot`, {
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
          path="/asked"
          className="px-0"
          titleClassName="px-5"
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

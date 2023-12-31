import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { Metadata, NextPage } from "next";
import SchoolHeaderContainer from "./_component/SchoolHeaderContainer";
import { cache } from "react";
import SectionContainer from "./_component/SectionContainer";
import TipsSection from "./_component/TipsSection";
import AdvertisementAds from "@/app/_component/Advisement";
import Advertisement from "./_component/Advertisement";
import RecommentArticle from "./_component/RecommnedArticle";
import Asked from "./_component/Asked";
import HeaderBadage from "./_component/HeaderBadage";

const getAuth = cache(async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return auth;
});

export const generateMetadata = async (): Promise<Metadata> => {
  const auth = await getAuth();
  if (!auth)
    return {
      title: "로그인이 필요합니다.",
    };

  return {
    title: auth.user.user.userSchool?.school.defaultName || "스쿨메이트",
  };
};

const Main: NextPage = async () => {
  const auth = await getAuth();

  return (
    <>
      <SchoolHeaderContainer
        title={
          auth.user.user.userSchool?.school.name
            ? auth.user.user.userSchool.school.name
            : auth.user.user.userSchool?.school.defaultName
        }
        auth={auth}
        // badage={
        //   <HeaderBadage
        //     title="👀 스쿨메이트를 잘 사용하고 계신가요?"
        //     description="캘린더를 확인 해 오늘 할 일들을 체크하세요!"
        //     link="/timetable"
        //   />
        // }
      >
        <SectionContainer
          title="인기 게시물"
          subTitle="즐겨찾는 게시판"
          path="/board"
          pathType="replace"
        >
          <RecommentArticle />
        </SectionContainer>
        <TipsSection
          title="가이드 보러가기"
          description="스쿨메이트가 처음이세요?"
          link="/guide"
        />
        <AdvertisementAds unit="DAN-3yaEXlo6qBdb5YXL" className="px-5 pt-5" />
        <SectionContainer
          title="교내 친구들 찾기"
          subTitle="에스크 기능을 통해"
          path="/asked"
          className="px-0"
          titleClassName="px-5"
          pathType="replace"
        >
          <Asked />
        </SectionContainer>
      </SchoolHeaderContainer>
    </>
  );
};

export default Main;

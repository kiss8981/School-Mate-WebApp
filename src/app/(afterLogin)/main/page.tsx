import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import SchoolHeaderContainer from "./_component/SchoolHeadetContainer";
import HeaderBadage from "./_component/HeaderBadage";

const Main: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");

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
      ></SchoolHeaderContainer>
    </>
  );
};

export default Main;

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import SchoolHeaderContainer from "./_component/SchoolHeadetContainer";
import HeaderBadage from "./_component/HeaderBadage";
import Advertisement from "./_component/Advertisement";

const Main: NextPage = async () => {
  const auth = await getServerSession(authOptions);
  console.log(auth);

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
      </SchoolHeaderContainer>
    </>
  );
};

export default Main;

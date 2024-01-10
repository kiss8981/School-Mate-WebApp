import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { NanumGothic, inter } from "@/lib/fonts";
import { classNames, numberWithCommas } from "@/lib/uitls";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Fight, School } from "schoolmate-types";
import Image from "next/image";
import RegisterFight from "./_component/RegisterFight";
import Advisement from "@/app/_component/Advisement";
import { SchoolDetail, SchoolDetailWithImage } from "./_component/SchoolDetail";

const getFight = async (fightId: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const authorizationToken = cookies().get("Authorization");

  try {
    const fight = await fetcher(`/fight/${fightId}`, {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });

    return {
      ...fight.data.data,
      auth,
    } as Fight & {
      ranking: {
        schoolId: string;
        school: School;
        totalScore: number;
      }[];
      isRegistration: boolean;
      ourRanking: number;
    } & {
      auth: Session;
    };
  } catch (e) {
    if (e instanceof AxiosError) {
      if (!e.response) return null;
      if (e.response.status === 401) return redirect("/intro");
      if (e.response.status === 404) return null;
    }
    return null;
  }
};

const FightPage = async ({
  params,
}: {
  params: {
    fightId: string;
  };
}) => {
  const fight = await getFight(params.fightId);

  if (!fight)
    return (
      <>
        <LeftHeaderContainer
          title="이런..."
          searchIcon={false}
          className="pb-20"
        >
          <div
            className={classNames(
              "flex flex-col items-center justify-center h-[88vh] text-[#B6B6B6]",
              inter.className
            )}
          >
            <span className="text-lg mb-5">대결 정보를 찾을 수 없어요!</span>
            <span>대결이 종료되었거나, 존재하지 않는 대결입니다.</span>
          </div>
        </LeftHeaderContainer>
      </>
    );

  return (
    <>
      <LeftHeaderContainer title={fight.title} searchIcon={false} className="pb-24">
        <div className="mt-3 px-4 space-y-3">
          {fight.ranking.map((rank, index) =>
            index < 3 ? (
              <>
                <SchoolDetailWithImage
                  fightId={fight.id}
                  rank={rank}
                  index={index}
                  key={index}
                />
                {index === 2 && (
                  <Advisement className="my-2" unit="DAN-nWFYoUxwD11CzhGS" />
                )}
              </>
            ) : (
              <>
                <SchoolDetail
                  fightId={fight.id}
                  index={index}
                  rank={rank}
                  key={index}
                />
              </>
            )
          )}
        </div>
        <RegisterFight
          fight={fight}
          isRegistration={fight.isRegistration}
          ourRanking={fight.ourRanking}
          auth={fight.auth}
        />
      </LeftHeaderContainer>
    </>
  );
};

export default FightPage;

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
      <LeftHeaderContainer title={fight.title} searchIcon={false}>
        <div className="mt-3 px-4 space-y-3">
          {fight.ranking.map((rank, index) =>
            index < 3 ? (
              <>
                <div
                  key={index}
                  className={classNames(
                    "w-full border rounded-[20px] flex flex-row py-3 min-h-[95px] cursor-pointer px-4 bg-white relative overflow-hidden",
                    NanumGothic.className
                  )}
                >
                  <div className="flex flex-col z-10">
                    <span>#{index + 1}</span>
                    <span className="leading-none mt-0.5 font-bold">
                      {rank.school.defaultName}
                    </span>
                  </div>
                  <span className="mt-auto ml-auto text-lg font-bold">
                    {numberWithCommas(rank.totalScore)}점
                  </span>
                  <div className="absolute opacity-50 -left-12 z-0 top-1/2 transform -translate-y-1/2">
                    <Image
                      src={`/icons/Tropy${index + 1}.svg`}
                      alt="logo"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full border rounded-[20px] flex flex-row items-center py-3 px-4 bg-white">
                  <span className="font-bold">
                    #{index + 1} {rank.school.defaultName}
                  </span>
                  <span className="mt-auto ml-auto font-bold">
                    {numberWithCommas(rank.totalScore)}점
                  </span>
                </div>
              </>
            )
          )}
        </div>
        <RegisterFight fight={fight} isRegistration={fight.isRegistration} ourRanking={fight.ourRanking} />
      </LeftHeaderContainer>
    </>
  );
};

export default FightPage;

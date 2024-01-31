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
import SchoolUser from "./_component/SchoolUser";

const getFightDetail = async (schoolId: string) => {
  const auth = await getServerSession(authOptions);
  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const authorizationToken = cookies().get("Authorization");

  try {
    const fight = await fetcher(`/school/${schoolId}`, {
      headers: {
        Authorization: `Bearer ${authorizationToken?.value}`,
      },
    });

    return {
      ...fight.data.data,
      auth,
    } as School & {
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
    schoolId: string;
  };
}) => {
  const schoolDetail = await getFightDetail(params.schoolId);

  if (!schoolDetail)
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
      <LeftHeaderContainer
        title={schoolDetail.name ? schoolDetail.name : schoolDetail.defaultName}
        searchIcon={false}
        className="pb-5"
      >
        <SchoolUser schoolId={schoolDetail.schoolId} fightId={params.fightId} />
      </LeftHeaderContainer>
    </>
  );
};

export default FightPage;

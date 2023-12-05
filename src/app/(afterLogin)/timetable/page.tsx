import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import TimetableContainer from "./_component/HeaderContainer";
import { Suspense } from "react";
import DatetimeList from "./_component/DatetimeList";
import { TimetableSkeleton } from "./_component/Timetable";
import fetcher from "@/lib/fetch";
import dayjs from "dayjs";
import dynamic from "next/dynamic";

const TimetableList = dynamic(() => import("./_component/Timetable"), {
  loading: () => <TimetableSkeleton />,
  ssr: false,
});

const Timetable: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <TimetableContainer>
      <DatetimeList />
      <div className="px-5 mt-5">
        <Suspense fallback={<TimetableSkeleton />}>
          <TimetableList
            data={fetcher(`/school/${auth.user.user.userSchoolId}/timetable`, {
              headers: {
                Authorization: `Bearer ${auth.user.token.accessToken}`,
              },
              params: {
                grade: auth.user.user.userSchool.grade,
                class: auth.user.user.userSchool.class,
                date: dayjs().format("YYYY-MM-DD"),
                ...(auth.user.user.userSchool.dept
                  ? { dept: auth.user.user.userSchool.dept }
                  : {}),
              },
            })}
          />
        </Suspense>
      </div>
    </TimetableContainer>
  );
};

export default Timetable;

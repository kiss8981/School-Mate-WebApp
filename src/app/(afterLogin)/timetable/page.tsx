import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import TimetableContainer from "./_component/HeaderContainer";
import { Suspense } from "react";
import DatetimeList from "./_component/DatetimeList";

const Timetable: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <TimetableContainer className="bg-[#F8F8F8]">
      <DatetimeList />
    </TimetableContainer>
  );
};

export default Timetable;

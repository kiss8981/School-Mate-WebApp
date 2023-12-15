import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { Metadata, NextPage } from "next";
import TimetableContainer from "./_component/HeaderContainer";
import DatetimeList from "./_component/DatetimeList";
import TimetableList from "./_component/Timetable";

export const metadata: Metadata = {
  title: `시간표`,
};
const Timetable: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <TimetableContainer>
      <DatetimeList />
      <div className="px-5 mt-5">
        <TimetableList auth={auth} />
      </div>
    </TimetableContainer>
  );
};

export default Timetable;

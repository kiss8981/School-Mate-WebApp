import HeaderContainer from "@/app/_component/HeaderContainer";
import { authOptions } from "@/app/auth";
import fetcher from "@/lib/fetch";
import { Session } from "next-auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Report } from "schoolmate-types";
import ReportComponent from "./_component/ReportUser";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "신고 추가조치",
};

interface Props {
  params: {
    userId: string;
    reportId: string;
  };
}

const getReportResult = async (reportId: string, auth: Session) => {
  const user = await fetcher(`/report/${reportId}`, {
    headers: {
      Authorization: `Bearer ${auth.user.token.accessToken}`,
    },
  });
  if (user.data.status === 401) return redirect("/intro");
  if (user.data.status === 404) return null;

  return user.data.data as Report;
};

const ReportResultPage = async ({ params }: Props) => {
  const auth = await getServerSession(authOptions);

  if (!auth || !auth.user.registered) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");
  const report = await getReportResult(params.reportId, auth);
  if (!report) return <></>;
  return (
    <>
      <HeaderContainer title="추가조치">
        <ReportComponent report={report} auth={auth} />
      </HeaderContainer>
    </>
  );
};

export default ReportResultPage;

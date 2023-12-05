import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";
import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { Session } from "next-auth";
import fetcher from "@/lib/fetch";
import { AskedWithUser } from "@/types/asked";
import { AxiosError } from "axios";
import { Suspense } from "react";
import { AskedMeSkeleton } from "./_component/AskedMe";
import dynamic from "next/dynamic";

const AskedMe = dynamic(() => import("./_component/AskedMe"), {
  loading: () => <AskedMeSkeleton />,
  ssr: false,
});

const AkedPage: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <LeftHeaderContainer
      backIcon={false}
      title="에스크"
      searchPath="/searchasked"
    >
      <Suspense fallback={<AskedMeSkeleton />}>
        <AskedMe
          data={fetcher(`/auth/me/asked`, {
            headers: {
              Authorization: `Bearer ${auth.user.token.accessToken}`,
            },
          })}
          auth={auth}
        />
      </Suspense>
    </LeftHeaderContainer>
  );
};

export default AkedPage;

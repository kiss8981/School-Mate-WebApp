import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { Metadata, NextPage } from "next";
import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import { Session } from "next-auth";
import fetcher from "@/lib/fetch";
import { AskedWithUser } from "@/types/asked";
import { AxiosError } from "axios";
import { Suspense } from "react";
import { AskedMeSkeleton } from "./_component/AskedMe";
import dynamic from "next/dynamic";
import HeaderContainer from "@/app/_component/HeaderContainer";
import SerachButton from "@/app/_component/SearchButton";

const AskedMe = dynamic(() => import("./_component/AskedMe"), {
  loading: () => <AskedMeSkeleton />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "에스크",
};

const AkedPage: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");
  if (!auth.user.user.userSchool) return redirect("/verify");

  return (
    <HeaderContainer
      backIcon={false}
      title="에스크"
      rightIcon={<SerachButton searchPath="/searchasked" />}
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
    </HeaderContainer>
  );
};

export default AkedPage;

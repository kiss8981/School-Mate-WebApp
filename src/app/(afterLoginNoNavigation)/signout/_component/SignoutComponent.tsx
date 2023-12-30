"use client";

import { useState } from "react";
import SignoutAlert from "./SignoutAlert";
import SignoutConfirm from "./SignoutConfirm";
import { Session } from "next-auth";
import { classNames } from "@/lib/uitls";
import { inter } from "@/lib/fonts";

type Process = "alert" | "request";

const SignoutComponent = ({ auth }: { auth: Session }) => {
  const [process, setProcess] = useState<"alert" | "request">("alert");

  const ProcessOfComponent: {
    [key in Process]: JSX.Element;
  } = {
    alert: <SignoutAlert callbackNext={() => setProcess("request")} />,
    request: <SignoutConfirm auth={auth} />,
  };

  return (
    <>
      <main className={classNames("pt-3", inter.className)}>
        {ProcessOfComponent[process]}
      </main>
    </>
  );
};

export default SignoutComponent;

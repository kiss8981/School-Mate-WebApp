"use client";

import { useState } from "react";
import SignoutAlert from "./SignoutAlert";
import SignoutConfirm from "./SignoutConfirm";
import { Session } from "next-auth";

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
      <main className="pt-3">{ProcessOfComponent[process]}</main>
    </>
  );
};

export default SignoutComponent;

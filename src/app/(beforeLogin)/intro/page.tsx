import React from "react";
import { Metadata } from "next";
import RegisterIntroComponent from "./_component/IntroComponent";

export const metadata: Metadata = {
  title: "인트로",
};

const RegisterIntroPage = () => {
  return (
    <>
      <RegisterIntroComponent />
    </>
  );
};

export default RegisterIntroPage;

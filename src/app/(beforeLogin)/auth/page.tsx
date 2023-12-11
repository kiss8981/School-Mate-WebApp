import { Metadata } from "next";
import LoginLandingComponent from "./_component/AuthComponent";

export const metadata: Metadata = {
  title: "로그인",
};

const LoginLandingPage = () => {
  return (
    <>
      <LoginLandingComponent />
    </>
  );
};

export default LoginLandingPage;

import Button from "@/app/_component/Button";
import Header from "@/app/_component/Header";
import HeaderContainer from "@/app/_component/HeaderContainer";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import LoginSection from "./_component/LoginSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인",
};

const LoginPage = async () => {
  return (
    <>
      <HeaderContainer>
        <div className={classNames("px-10 h-full block", inter.className)}>
          <Image
            src="/images/schoolmate/tm.svg"
            alt="register"
            width={100}
            height={50}
            className="mb-2 mt-10"
          />
          <LoginSection />
        </div>
      </HeaderContainer>
    </>
  );
};

export default LoginPage;

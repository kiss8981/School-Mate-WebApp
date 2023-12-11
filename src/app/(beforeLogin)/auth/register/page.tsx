import { Metadata } from "next";
import RegisterComponent from "./_component/RegisterComponent";

export const metadata: Metadata = {
  title: "회원가입",
};

const RegisterPage = () => {
  return (
    <>
      <RegisterComponent />
    </>
  );
};

export default RegisterPage;

import Button from "@/app/_component/Button";
import { classNames } from "@/lib/uitls";
import { Roboto, Roboto_Mono } from "next/font/google";
import Image from "next/image";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});
const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

const RegisterPage = () => {
  return (
    <>
      <div
        className={classNames(
          "flex flex-col px-8 text-2xl font-bold",
          roboto.className
        )}
      >
        <span>간편로그인 후</span>
        <span>이용이</span>
        <span>가능합니다</span>
      </div>
      <Image
        src="/images/auth/landing.png"
        alt="landing"
        width={280}
        height={280}
        className="m-auto my-7"
      />
      <div className="px-8">
        <Button
          className={classNames(
            "w-full py-3.5 font-semibold text-lg rounded-[30px]",
            robotoMono.className
          )}
        >
          회원가입
        </Button>
      </div>
    </>
  );
};

export default RegisterPage;

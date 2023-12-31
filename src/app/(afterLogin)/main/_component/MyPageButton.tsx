import { stackRouterPush } from "@/lib/stackRouter";
import { Session } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/navigation";

const MyPageButton = ({ auth }: { auth: Session }) => {
  const router = useRouter();

  return (
    <>
      <button
        className="relative rounded-full overflow-hidden w-[34px] h-[34px]"
        onClick={() => {
          stackRouterPush(router, "/me");
        }}
      >
        <Image
          src={
            auth.user.user.profile
              ? process.env.NEXT_PUBLIC_S3_URL + auth.user.user.profile
              : "/images/schoolmate/logobg.svg"
          }
          alt="article"
          layout="fill"
          objectFit="cover"
        />
      </button>
    </>
  );
};

export default MyPageButton;

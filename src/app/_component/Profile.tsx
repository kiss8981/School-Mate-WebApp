import { classNames } from "@/lib/uitls";
import Image from "next/image";

const Profile = ({
  profile,
  className,
  profileClassName,
}: {
  profile: string | null;
  className?: string;
  profileClassName?: string;
}) => {
  return (
    <>
      <div className={classNames("relative overflow-hidden", className)}>
        <Image
          alt="ad"
          className={profileClassName}
          src={
            profile
              ? process.env.NEXT_PUBLIC_S3_URL + profile
              : "/images/schoolmate/logo.svg"
          }
          objectFit="cover"
          layout="fill"
        />
      </div>
    </>
  );
};

export default Profile;

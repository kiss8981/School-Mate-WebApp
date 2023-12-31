"use client";

import SearchButton from "@/app/_component/SearchButton";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import { useRouter } from "next/navigation";
import MyPageButton from "./MyPageButton";
import { Session } from "next-auth";

const Header = ({
  title = "",
  className = "",
  backIcon = true,
  badge,
  auth,
  ...props
}: {
  title?: string;
  className?: string;
  backIcon?: boolean;
  badge?: React.ReactNode;
  auth: Session;
} & React.ComponentPropsWithRef<"header">) => {
  const router = useRouter();

  return (
    <header
      className={classNames(
        "text-2xl bg-white fixed  w-full z-10 min-w-[280px] max-w-[540px]",
        className
      )}
      style={{
        boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.06)",
      }}
      {...props}
    >
      <div className="font-bold flex items-center h-14 justify-between px-5">
        <span
          className={classNames(
            "text-primary-500 font-black text-[20px]",
            inter.className
          )}
          style={{
            wordSpacing: "-0.5px",
          }}
        >
          {title}
        </span>
        <div className="flex flex-row space-x-3 items-center">
          <SearchButton />
          <MyPageButton auth={auth} />
        </div>
      </div>
      {badge && <div className="w-full px-5 pb-4">{badge}</div>}
    </header>
  );
};

export default Header;

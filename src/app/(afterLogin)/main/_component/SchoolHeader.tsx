import { inter } from "@/lib/fonts";
import { stackRouterBack } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = ({
  title = "",
  className = "",
  backIcon = true,
  badge,
  ...props
}: {
  title?: string;
  className?: string;
  backIcon?: boolean;
  badge?: React.ReactNode;
} & React.ComponentPropsWithRef<"header">) => {
  const router = useRouter();

  return (
    <header
      className={classNames(
        "text-2xl bg-white fixed pt-[env(safe-area-inset-top)] w-full z-10 min-w-[280px] max-w-[540px]",
        className
      )}
      style={{
        boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.06)",
      }}
      {...props}
    >
      <div className="font-bold flex items-center h-16 justify-between px-5">
        <span
          className={classNames(
            "text-primary-500 font-black text-[24px]",
            inter.className
          )}
          style={{
            wordSpacing: "-0.5px",
          }}
        >
          {title}
        </span>
        <div className="flex flex-row space-x-2">
          <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
        </div>
      </div>
      {badge && (
        <div className="w-full px-5 pb-4">
          {badge}
        </div>
      )}
    </header>
  );
};

export default Header;

import { inter } from "@/lib/fonts";
import { stackRouterBack } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = ({
  title = "",
  className = "",
  backIcon = true,
  rightIcon = null,
  ...props
}: {
  title?: string;
  className?: string;
  backIcon?: boolean;
  rightIcon?: React.ReactNode;
} & React.ComponentPropsWithRef<"header">) => {
  const router = useRouter();

  return (
    <header
      className={classNames(
        "text-2xl bg-white fixed w-full z-10 min-w-[280px] max-w-[540px]",
        className
      )}
      style={{
        boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 30px",
        transform: "translate3d(0,0,0)",
      }}
      {...props}
    >
      <div className="font-bold relative flex justify-between items-center h-14">
        {backIcon && (
          <button
            className="absolute left-4"
            onClick={() => {
              stackRouterBack(router);
            }}
          >
            <Image src="/icons/Back.svg" alt="back" width={12} height={12} />
          </button>
        )}
        <span
          className={classNames(
            "mx-auto font-bold text-[18px]",
            inter.className
          )}
        >
          {title}
        </span>
        {rightIcon && <div className="absolute right-4">{rightIcon}</div>}
      </div>
    </header>
  );
};

export default Header;

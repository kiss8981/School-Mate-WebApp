import { inter } from "@/lib/fonts";
import { stackRouterBack } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Header = ({
  title = "",
  className = "",
  backIcon = true,
  ...props
}: {
  title?: string;
  className?: string;
  backIcon?: boolean;
} & React.ComponentPropsWithRef<"header">) => {
  const router = useRouter();

  return (
    <header
      className={classNames(
        "flex justify-between items-center px-9 text-2xl font-bold relative bg-white ",
        className
      )}
      {...props}
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1.7rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1.7rem)",
      }}
    >
      {backIcon && (
        <button
          className="absolute left-4"
          onClick={() => {
            stackRouterBack(router);
          }}
        >
          <Image src="/icons/back.svg" alt="back" width={15} height={15} />
        </button>
      )}
      <span
        className={classNames("mx-auto font-bold text-[22px]", inter.className)}
      >
        {title}
      </span>
    </header>
  );
};

export default Header;

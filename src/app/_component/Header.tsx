import { stackRouterBack } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { Inter } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

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
        "flex justify-between items-center px-9 text-2xl font-bold relative bg-white py-2 h-16",
        className
      )}
      {...props}
      style={{
        marginTop: "calc(env(safe-area-inset-top) - 0.5rem)",
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
        className={classNames("mx-auto font-bold text-[24px]", inter.className)}
      >
        {title}
      </span>
    </header>
  );
};

export default Header;

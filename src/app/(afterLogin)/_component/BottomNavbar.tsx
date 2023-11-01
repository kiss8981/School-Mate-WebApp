"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="fixed bottom-0 h-[79px] bg-white min-w-[320px] max-w-[540px] drop-shadow-2xl flex items-center w-full">
        <div className="flex flex-row px-5 justify-between items-center w-full">
          <Link
            className="h-[45px] flex flex-col justify-between items-center"
            href="/"
          >
            {pathname === "/" ? (
              <>
                <Image
                  src="/icons/Home.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <Image
                  src="/icons/Dot.svg"
                  alt="dot"
                  width={6}
                  height={6}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <>
                <Image
                  src="/icons/HomeLight.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
          <Link
            className="h-[45px] flex flex-col justify-between items-center"
            href="/timetable"
          >
            {pathname === "/timetable" ? (
              <>
                <Image
                  src="/icons/Board.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <Image
                  src="/icons/Dot.svg"
                  alt="dot"
                  width={6}
                  height={6}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <>
                <Image
                  src="/icons/BoardLight.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
          <Link
            className="h-[62px] flex flex-col justify-between items-center"
            href="/dashboard"
          >
            {pathname === "/dashboard" ? (
              <>
                <Image
                  src="/icons/Plus.svg"
                  alt="plus"
                  width={45}
                  height={45}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
                <Image
                  src="/icons/DotPlus.svg"
                  alt="dotPlus"
                  width={6}
                  height={6}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <>
                <Image
                  src="/icons/Plus.svg"
                  alt="plus"
                  width={45}
                  height={45}
                  className="cursor-pointer"
                  onClick={() => router.push("/")}
                />
              </>
            )}
          </Link>
          <Link
            className="h-[45px] flex flex-col justify-between items-center"
            href="/message"
          >
            {pathname === "/message" ? (
              <>
                <Image
                  src="/icons/Message.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                <Image
                  src="/icons/Dot.svg"
                  alt="dot"
                  width={6}
                  height={6}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <>
                <Image
                  src="/icons/MessageLight.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
          <Link
            className="h-[45px] flex flex-col justify-between items-center"
            href="/me"
          >
            {pathname === "/me" ? (
              <>
                <Image
                  src="/icons/User.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
                <Image
                  src="/icons/Dot.svg"
                  alt="dot"
                  width={6}
                  height={6}
                  className="cursor-pointer"
                />
              </>
            ) : (
              <>
                <Image
                  src="/icons/UserLight.svg"
                  alt="home"
                  width={30}
                  height={30}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

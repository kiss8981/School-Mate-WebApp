"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BottomNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [useAgent, setUseAgent] = useState("");

  useEffect(() => {
    setUseAgent(navigator.userAgent);
  }, []);

  return (
    <>
      <div
        className="fixed bottom-0 bg-whtie min-w-[280px] max-w-[540px] pt-2 flex items-center w-full z-50 bg-white"
        style={{
          paddingBottom: "0.3rem",
          boxShadow: "0px -4px 30px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="flex flex-row px-10 justify-between items-center w-full py-1.5">
          <Link
            className="h-[40px] flex flex-col justify-between items-center"
            href="/main"
          >
            {pathname === "/main" ? (
              <>
                <Image
                  src="/icons/Home.svg"
                  alt="home"
                  width={27}
                  height={27}
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
                  width={27}
                  height={27}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
          <Link
            className="h-[40px] flex flex-col justify-between items-center"
            href="/timetable"
          >
            {pathname === "/timetable" ? (
              <>
                <Image
                  src="/icons/Board.svg"
                  alt="home"
                  width={27}
                  height={27}
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
                  width={27}
                  height={27}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
          <Link
            className="h-[40px] flex flex-col justify-between items-center"
            href="/message"
          >
            {pathname === "/message" ? (
              <>
                <Image
                  src="/icons/Message.svg"
                  alt="home"
                  width={27}
                  height={27}
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
                  width={27}
                  height={27}
                  className="cursor-pointer"
                />
              </>
            )}
          </Link>
          <Link
            className="h-[40px] flex flex-col justify-between items-center"
            href="/me"
          >
            {pathname === "/me" ? (
              <>
                <Image
                  src="/icons/User.svg"
                  alt="home"
                  width={27}
                  height={27}
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

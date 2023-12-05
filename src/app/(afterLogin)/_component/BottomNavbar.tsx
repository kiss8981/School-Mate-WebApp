"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { classNames } from "@/lib/uitls";
import { inter } from "@/lib/fonts";

const BottomNavbarList = [
  {
    name: "홈",
    activeIcon: "/icons/Home.svg",
    inactiveIcon: "/icons/HomeLight.svg",
    link: "/main",
    pattern: /^\/main/,
  },
  {
    name: "게시판",
    activeIcon: "/icons/BoardList.svg",
    inactiveIcon: "/icons/BoardListLight.svg",
    link: "/board",
    pattern: /^\/board/,
  },
  {
    name: "시간표",
    activeIcon: "/icons/Timetable.svg",
    inactiveIcon: "/icons/TimetableLight.svg",
    link: "/timetable",
    pattern: /^\/timetable/,
  },
  {
    name: "에스크",
    activeIcon: "/icons/Message.svg",
    inactiveIcon: "/icons/MessageLight.svg",
    link: "/asked",
    pattern: /^\/asked/,
  },
  {
    name: "내 정보",
    activeIcon: "/icons/User.svg",
    inactiveIcon: "/icons/UserLight.svg",
    link: "/me",
    pattern: /^\/me/,
  },
];

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
        className={classNames(
          "fixed bottom-0 bg-whtie min-w-[280px] max-w-[540px] flex items-center text-[12px] w-full z-50 bg-white",
          inter.className
        )}
        style={{
          boxShadow: "0px -4px 30px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div className="flex flex-row px-8 justify-between items-center w-full py-2.5">
          {BottomNavbarList.map((item, key) => (
            <Link
              key={key}
              className="h-[40px] flex flex-col justify-between items-center"
              href={item.link}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: "28px",
                  height: "28px",
                }}
              >
                {item.pattern.test(pathname) ? (
                  <>
                    <Image
                      src={item.activeIcon}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={item.inactiveIcon}
                      alt={item.name}
                      width={24}
                      height={24}
                    />
                  </>
                )}
              </div>
              <span className="mt-1">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

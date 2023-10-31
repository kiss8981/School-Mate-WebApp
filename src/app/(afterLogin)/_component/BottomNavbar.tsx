"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BottomNavbar() {
  const router = useRouter();
  return (
    <>
      <div className="fixed bottom-0 h-[90px] flex flex-row px-3 justify-between">
        <div className="">
          <Image
            src="/icons/Home.svg"
            alt="home"
            width={30}
            height={30}
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

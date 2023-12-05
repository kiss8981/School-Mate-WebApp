"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { stackRouterPush } from "@/lib/stackRouter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AskedMore = () => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const outsideRef = useOutsideClick(() => {
    setModal(false);
  });

  return (
    <button
      className="ml-auto mb-auto relative"
      onClick={() => {
        setModal(true);
      }}
      ref={outsideRef}
    >
      <Image
        src="/icons/More.svg"
        alt="more"
        width={4}
        height={4}
        className="mx-auto"
      />
      {modal && (
        <div className="absolute -bottom-12 right-0 bg-white border rounded-lg">
          <div className="flex flex-col">
            <button
              onClick={() => {
                setModal(false);
                stackRouterPush(router, "/asked/modify");
              }}
              className="h-10 flex flex-row items-center px-3 w-28 justify-center"
            >
              프로필 수정
            </button>
          </div>
        </div>
      )}
    </button>
  );
};

export default AskedMore;

"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { stackRouterPush } from "@/lib/stackRouter";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ArticleMore = ({ userId }: { userId: string }) => {
  const [modal, setModal] = useState(false);
  const router = useRouter();
  const outsideRef = useOutsideClick(() => {
    setModal(false);
  });

  return (
    <button
      className="relative"
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
                stackRouterPush(router, `/user/${userId}/report`);
              }}
              className="h-10 flex flex-row items-center px-3 w-24 justify-center"
            >
              유저차단
            </button>
          </div>
        </div>
      )}
    </button>
  );
};

export default ArticleMore;

"use client";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { stackRouterPush } from "@/lib/stackRouter";
import { toast } from "@/lib/webviewHandler";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const AskedMore = ({ userId }: { userId: string }) => {
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
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.75,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                ease: "easeOut",
                duration: 0.15,
              },
            }}
            exit={{
              opacity: 0,
              scale: 0.75,
              transition: {
                ease: "easeIn",
                duration: 0.15,
              },
            }}
            className="absolute -bottom-20 right-0 bg-white border rounded-lg"
          >
            <div className="flex flex-col">
              <button
                onClick={() => {
                  setModal(false);
                  stackRouterPush(router, "/asked/modify");
                }}
                className="h-8 flex flex-row text-sm items-center px-3 w-28 justify-start"
              >
                <Image
                  src="/icons/EditLight.svg"
                  alt="Edit"
                  width={10}
                  height={10}
                  className="mr-2"
                />
                프로필 수정
              </button>
              <CopyToClipboard
                text={`https://schoolmate.kr/asked/${userId}`}
                onCopy={() => {
                  setModal(false);
                  toast("success", "복사되었습니다!");
                }}
              >
                <button
                  onClick={() => {
                    setModal(false);
                  }}
                  className="h-8 flex flex-row text-sm items-center px-3 w-28 justify-center"
                >
                  <Image
                    src="/icons/Share.svg"
                    alt="share"
                    width={10}
                    height={10}
                    className="mr-2"
                  />
                  프로필 공유
                </button>
              </CopyToClipboard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AskedMore;

"use client";

import { stackRouterBack } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { inter } from "@/lib/fonts";
import { useOutsideClick } from "@/hooks/useOutsideClick";

const SearchModalHeader = ({
  onChange: onKeywordChange,
  value,
}: {
  onChange: (keyword: string) => void;
  value: string;
}) => {
  const ref = useOutsideClick(() => {
    ref.current?.blur();
  });
  const router = useRouter();

  return (
    <>
      <header
        className={classNames(
          "text-2xl bg-white fixed w-full z-10 min-w-[280px] max-w-[540px]"
        )}
        style={{
          boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="font-bold relative flex items-center h-14 px-5">
          <button
            onClick={() => {
              stackRouterBack(router);
            }}
          >
            <Image src="/icons/Back.svg" alt="back" width={12} height={12} />
          </button>
          <div className="w-full relative ml-4">
            <input
              ref={ref}
              type="text"
              className="w-full h-10 rounded-[10px] border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none font-light"
              placeholder="게시물 제목, 내용"
              value={value}
              onChange={e => {
                onKeywordChange(e.target.value);
              }}
            />
            <button
              onClick={() => {
                onKeywordChange("");
              }}
              className="absolute top-1/2 right-2 transform -translate-y-1/2"
            >
              <Image
                src="/icons/RemoveKeyword.svg"
                alt="remove"
                width={20}
                height={20}
              />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default SearchModalHeader;

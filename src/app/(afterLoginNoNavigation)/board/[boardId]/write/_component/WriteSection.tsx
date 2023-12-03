"use client";

import HeaderContainer from "@/app/_component/HeaderContainer";
import Input from "@/app/_component/Input";
import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WriteSection = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleWrite = () => {
    setLoading(true);
  };

  return (
    <>
      <HeaderContainer
        title="글 쓰기"
        rightIcon={
          <button
            className={classNames(
              title && content ? "text-primary-500" : "text-[#B6B6B6]",
              "text-base my-auto items-center flex"
            )}
            onClick={handleWrite}
          >
            완료
          </button>
        }
      >
        <div className="px-4 pt-3">
          <div
            className="flex flex-row w-full h-full py-3 px-3 bg-[#F3F4F8] rounded-[12px] cursor-pointer"
            onClick={() => {
              stackRouterPush(router, "/tos");
            }}
          >
            <p className="font-bold mr-2 w-16">안내</p> 이용규칙 위반 시 서비스
            이용이 일정 기한 제한될 수 있습니다. 커뮤니티 이용규칙
          </div>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="cursor-pointer text-black ring-0 outline-none w-full h-12 mt-4 py-2 text-base bg-none border-b font-bold px-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            placeholder="자유롭게 이야기나 질문을 해보세요"
            className="cursor-pointer text-black ring-0 outline-none w-full h-80 mt-4 py-2 text-base bg-none px-2 resize-none"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
      </HeaderContainer>
    </>
  );
};

export default WriteSection;

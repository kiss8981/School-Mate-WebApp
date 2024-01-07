"use client";

import ArticleCard from "@/app/_component/ArticleCard";
import { LoadingFullPage } from "@/app/_component/Loading";
import fetcher from "@/lib/fetch";
import { ArticleWithImage } from "@/types/article";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { stackRouterPush } from "@/lib/stackRouter";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { PaginationParams } from "@/types/fetcher";
import { useInView } from "react-intersection-observer";
import Advertisement from "@/app/_component/Advisement";

const ArticleList = ({ boardId }: { boardId: string }) => {
  const articlesfetcher = (params: PaginationParams) =>
    fetcher.get(
      boardId === "hot"
        ? `/board/hot`
        : boardId === "all"
        ? `/board/all`
        : `/board/${boardId}/articles`,
      {
        params,
      }
    );
  const {
    data: articles,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteScroll<ArticleWithImage>(articlesfetcher, {});
  const [viewRef, inView] = useInView();

  useEffect(() => {
    if (inView && !isFetching) fetchNextPage();
  }, [inView]);

  return (
    <>
      {boardId === "hot" ||
        (boardId === "all" && <WriteButton boardId={Number(boardId)} />)}
      {articles.length === 0 && isFetching ? (
        <ArticleListSkeleton />
      ) : (
        <>
          <div className="flex flex-col pb-4 items-center w-full">
            {articles.map((article, index) => (
              <>
                <div key={index} className="w-full px-4 border-b">
                  <ArticleCard article={article} className="border-none" />
                </div>
                {index === 5 && (
                  <div className="w-full border-b">
                    <Advertisement unit="DAN-UH5UMSZXUPi9zCtA" />
                  </div>
                )}
              </>
            ))}
            <div ref={viewRef} />
          </div>
          {isFetching && <LoadingFullPage />}
        </>
      )}
    </>
  );
};

const WriteButton = ({ boardId }: { boardId: number }) => {
  const [position, setPosition] = useState(0);
  const [opened, setOpened] = useState(true);
  const controls = useAnimation();
  const router = useRouter();
  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    if (position < 0) return;

    if (position > 0 && opened) {
      setOpened(false);
      controls.start("close");
    } else if (position === 0 && !opened) {
      setOpened(true);
      controls.start("open");
    }
  }, [position]);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <motion.button
      onClick={() => {
        stackRouterPush(router, `/board/${boardId}/write`);
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-4 right-4 z-50 flex items-center justify-center rounded-full bg-primary-500 text-white h-12 shadow-lg font-bold px-3"
    >
      <motion.div
        animate={{
          marginLeft: opened ? 0 : "0.2rem",
          marginRight: opened ? 0 : "0.2rem",
        }}
        transition={{ duration: opened ? 0 : 0.6 }}
      >
        <Image src="/icons/PlusOnly.svg" alt="글쓰기" width={20} height={20} />
      </motion.div>
      <AnimatePresence>
        {opened && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: opened ? 1 : 0, x: opened ? 0 : 20 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="ml-3"
          >
            글쓰기
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const ArticleListSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-col mt-3 pb-4 px-4 items-center w-full space-y-2">
      <div
        className={`relative h-[100px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[100px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[100px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
    </div>
  );
};

export default ArticleList;

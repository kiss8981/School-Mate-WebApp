"use client";

import ArticleCard from "@/app/_component/ArticleCard";
import { LoadingFullPage } from "@/app/_component/Loading";
import fetcher from "@/lib/fetch";
import { toast } from "@/lib/webviewHandler";
import { ArticleWithImage } from "@/types/article";
import { AxiosError } from "axios";
import { AnimatePresence, animate, motion, useAnimation } from "framer-motion";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Board } from "schoolmate-types";
import Image from "next/image";
import { classNames } from "@/lib/uitls";
import { inter } from "@/lib/fonts";
import { stackRouterPush } from "@/lib/stackRouter";

const ArticleList = ({
  articles: { articles, totalPage },
  board,
  auth,
}: {
  articles: {
    articles: ArticleWithImage[];
    totalPage: number;
  };
  board: Board;
  auth: Session;
}) => {
  const [articleList, setArticleList] = useState<ArticleWithImage[]>(articles);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (totalPage === page) return;
    if (inView && !loadingArticle) {
      setPage(prevState => prevState + 1);
    }
  }, [inView, loadingArticle]);

  useEffect(() => {
    if (page === 1) return;
    if (page > totalPage) return;
    if (totalPage === 1) return;
    fetchArticle();
  }, [page]);

  const fetchArticle = async () => {
    try {
      setLoadingArticle(true);
      const { data } = await fetcher.get<{
        data: {
          articles: ArticleWithImage[];
          totalPage: number;
        };
      }>(`/board/${board.id}/articles?page=${page}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      });
      setArticleList(prevState => [...prevState, ...data.data.articles]);
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(
          "error",
          err.response?.data.message || "알 수 없는 오류가 발생했습니다."
        );
      }
    } finally {
      setPage(prevState => prevState + 1);
      setLoadingArticle(false);
    }
  };

  return (
    <>
      {loadingArticle && <LoadingFullPage />}
      {String(board.id) !== "hot" && <WriteButton boardId={board.id} />}
      <div className="flex flex-col pb-4 items-center w-full">
        {articleList.map((article, index) => (
          <div key={index} className="w-full px-4 border-b">
            <ArticleCard article={article} className="border-none" />
          </div>
        ))}
        <div ref={ref} />
      </div>
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

export default ArticleList;

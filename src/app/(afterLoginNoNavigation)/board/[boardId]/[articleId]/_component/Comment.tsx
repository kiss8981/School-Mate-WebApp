import Button from "@/app/_component/Button";
import Input from "@/app/_component/Input";
import useFetch from "@/hooks/useFetch";
import Image from "next/image";
import fetcher from "@/lib/fetch";
import { toast } from "@/lib/webviewHandler";
import { AxiosError } from "axios";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import {
  Article,
  Board,
  Comment,
  CommentPayload,
  ReComment,
  User,
} from "schoolmate-types";
import { CommentWithUser, ReCommnetWithUser } from "@/types/article";
import dayjs from "dayjs";
import { classNames } from "@/lib/uitls";
import { inter } from "@/lib/fonts";
import LinkifyIt from "linkify-it";
import { Hyperlink } from "@/app/_component/Hyperlink";

const linkify = LinkifyIt();

const CommentList = ({
  article,
  board,
  auth,
}: {
  article: Article & {
    comments: {
      comments: CommentWithUser[];
      totalPage: number;
    };
  };
  board: Board;
  auth: Session;
}) => {
  const router = useRouter();
  const [commentList, setCommentList] = useState<CommentWithUser[]>(
    article.comments.comments.sort(
      (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix()
    )
  );
  const [loadingComment, setLoadingComment] = useState(false);
  const [page, setPage] = useState(1);
  const [ref, inView] = useInView();
  const [selectRecommentId, setSelectRecommentId] = useState<string>();
  const [totalPage, setTotalPage] = useState(article.comments.totalPage);
  const { triggerFetch: commentTrigger } = useFetch(
    `/board/article/${article.id}/comment`,
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      successToast: {
        message: "작성되었습니다",
      },
      onError: (status, message) => {
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: () => {
        setPage(1);
        fetchComment(1);
      },
    }
  );

  const { triggerFetch: recommentTrigger } = useFetch("", "POST", {
    fetchInit: {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
      },
    },
    successToast: {
      message: "작성되었습니다",
    },
    onError: (status, message) => {
      toast("error", message || "알 수 없는 오류가 발생했습니다.");
    },
    onSuccess: async () => {
      setPage(1);
      fetchComment(1);
    },
  });

  useEffect(() => {
    if (totalPage === page) return;
    if (inView && !loadingComment) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loadingComment]);

  useEffect(() => {
    if (page === 1) return;
    if (page > totalPage) return;
    if (totalPage === 1) return;
    fetchComment();
  }, [page]);

  const fetchComment = async (prpsPage?: number) => {
    try {
      setLoadingComment(true);
      const { data } = await fetcher.get<{
        data: {
          comments: CommentWithUser[];
          totalPage: number;
        };
      }>(
        `/board/${board.id}/article/${article.id}/comments?page=${
          prpsPage ? prpsPage : page
        }`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token.accessToken}`,
          },
        }
      );
      if (prpsPage) {
        setCommentList(
          data.data.comments.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
      } else {
        const datas = [...commentList, ...data.data.comments.reverse()];
        setCommentList(
          datas.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        setTotalPage(data.data.totalPage);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        toast(
          "error",
          err.response?.data.message || "알 수 없는 오류가 발생했습니다."
        );
      }
    } finally {
      setLoadingComment(false);
    }
  };

  useEffect(() => {
    const handleComment = async (event: MessageEvent) => {
      try {
        const { type: eventType, data } = JSON.parse(event.data);
        if (eventType === "COMMENT") {
          if (selectRecommentId) {
            await recommentTrigger({
              fetchInit: {
                url: `/board/article/${article.id}/comment/${selectRecommentId}/recomment`,
                data: {
                  content: data.comment,
                  isAnonymous: data.isAnonymous,
                },
              },
            });
          } else {
            await commentTrigger({
              fetchInit: {
                data: {
                  content: data.comment,
                  isAnonymous: data.isAnonymous,
                },
              },
            });
          }
        }
      } catch (err) {}
    };

    // @ts-ignore
    document.addEventListener("message", handleComment);
    window.addEventListener("message", handleComment);

    return () => {
      window.removeEventListener("message", handleComment);
      // @ts-ignore
      document.removeEventListener("message", handleComment);
    };
  }, [selectRecommentId]);

  return (
    <>
      <div className="w-full h-5 bg-[#F9F9F9] mt-5" />
      {commentList.length === 0 ? (
        <>
          {!loadingComment && (
            <div className="my-10 flex flex-col text-[#b6b6b6] items-center">
              <span>아직 댓글이 없어요</span>
              <span>댓글을 가장 먼저 남겨보세요.</span>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="flex flex-col">
            {commentList.map((comment, index) => (
              <Commnet
                key={index}
                comment={comment}
                auth={auth}
                reload={() => {
                  setPage(1);
                  fetchComment(1);
                }}
                callbackSelect={() => {
                  if (selectRecommentId) {
                    setSelectRecommentId(undefined);
                    toast("success", "답글 작성을 취소했습니다.");
                    return;
                  }
                  toast(
                    "success",
                    comment.user.name + "님에게 답글을 남깁니다."
                  );
                  setSelectRecommentId(comment.id.toString());
                }}
                isSelectRecomment={selectRecommentId === comment.id.toString()}
              />
            ))}
          </div>
        </>
      )}

      {loadingComment && (
        <div className="flex justify-center items-center my-10">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
        </div>
      )}
      <div ref={ref} />
    </>
  );
};

const Commnet = ({
  comment,
  auth,
  callbackSelect,
  isSelectRecomment,
  reload,
}: {
  comment: CommentWithUser;
  auth: Session;
  callbackSelect: () => void;
  isSelectRecomment: boolean;
  reload?: () => void;
}) => {
  const [likeCount, setLikeCount] = useState(comment.likeCounts);
  const [reCommnetCount, setReCommnetCount] = useState(
    comment.recomments.length
  );

  const { triggerFetch: commentTrigger } = useFetch(
    `/board/article/${comment.articleId}/comment/${comment.id}`,
    "GET",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onSuccess: (status, message, body) => {
        setLikeCount(body.likeCounts);
        setReCommnetCount(body.recomments.length);
      },
    }
  );

  const { triggerFetch: delteTrigger } = useFetch(
    `/board/article/${comment.articleId}/comment/${comment.id}`,
    "DELETE",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onError: (status, message) => {
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: (status, message, body) => {
        reload && reload();
        toast("success", "삭제되었습니다.");
      },
    }
  );

  const { triggerFetch: likeTrigger } = useFetch(
    `/board/article/${comment.articleId}/comment/${comment.id}/like`,
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onError: (status, message) => {
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: (status, message, body) => {
        commentTrigger({});
        if (!body) return toast("success", "좋아요를 취소했습니다");
        toast("success", "좋아요를 눌렀습니다");
      },
    }
  );

  return (
    <>
      <div
        className={classNames(
          "px-5 py-3",
          isSelectRecomment ? "bg-gray-100" : ""
        )}
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-1">
            <div className="relative h-[40px] w-[40px] rounded-full overflow-hidden">
              <Image
                src={
                  !comment.isAnonymous
                    ? comment.user.profile
                      ? process.env.NEXT_PUBLIC_S3_URL + comment.user.profile
                      : "/images/schoolmate/logobg.svg"
                    : "/images/schoolmate/logobg.svg"
                }
                alt="article"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col ml-2">
              <span className="text-[#66738C] text-sm font-bold items-center flex justify-start">
                {comment.isAnonymous ? "익명" : comment.user.name}
                {comment.isMe && (
                  <span className="font-light border border-primary-500 rounded-full text-primary-500 px-1 ml-1 text-[0.75rem] leading-[1rem]">
                    작성자
                  </span>
                )}
              </span>
              <span className="text-[#66738C] font-light text-[0.7rem]">
                {dayjs(comment.createdAt).format("MM/DD HH:mm")}
              </span>
            </div>
          </div>
          <Hyperlink
            text={comment.content}
            className="text-sm whitespace-pre-wrap px-1"
          />

          <div className="w-full flex flex-row mt-2 px-1">
            <button
              className="flex flex-row items-center text-[#66738C] text-[0.7rem] cursor-pointer"
              onClick={() => {
                likeTrigger({});
              }}
            >
              <Image
                src="/icons/Like.svg"
                alt="like"
                width={16}
                height={16}
                className="mr-1"
              />
              <span className="mr-1">좋아요</span>
              <span className="mr-2">{likeCount}</span>
            </button>
            {!comment.isDeleted && (
              <button
                className="flex flex-row items-center text-[#66738C] text-[0.7rem] cursor-pointer"
                onClick={() => {
                  callbackSelect();
                }}
              >
                <Image
                  src="/icons/Comment.svg"
                  alt="Comment"
                  width={16}
                  height={16}
                  className="mr-1"
                />
                <span className="mr-1">답글</span>
                <span className="mr-2">{reCommnetCount}</span>
              </button>
            )}
            {comment.isMe && !comment.isDeleted && (
              <button
                onClick={() => delteTrigger({})}
                className="underline underline-offset-1 text-sm text-[#66738C] ml-auto"
              >
                삭제하기
              </button>
            )}
          </div>
          {comment.recomments.map((recomment, index) => (
            <Recomment
              key={index}
              comment={recomment}
              auth={auth}
              reload={() => {
                reload && reload();
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Recomment = ({
  comment,
  auth,
  reload,
}: {
  comment: ReCommnetWithUser;
  auth: Session;
  reload?: () => void;
}) => {
  const [likeCount, setLikeCount] = useState(comment.likeCounts);

  const { triggerFetch: delteTrigger } = useFetch(
    `/board/article/${comment.articleId}/comment/${comment.commentId}/recomment/${comment.id}`,
    "DELETE",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onError: (status, message) => {
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: (status, message, body) => {
        reload && reload();
        toast("success", "삭제되었습니다.");
      },
    }
  );

  const { triggerFetch: commentTrigger } = useFetch(
    `/board/article/${comment.articleId}/comment/${comment.commentId}/recomment/${comment.id}`,
    "GET",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onSuccess: (status, message, body) => {
        setLikeCount(body.likeCounts);
      },
    }
  );

  const { triggerFetch: likeTrigger } = useFetch(
    `/board/article/${comment.articleId}/comment/${comment.commentId}/recomment/${comment.id}/like`,
    "POST",
    {
      fetchInit: {
        headers: {
          Authorization: `Bearer ${auth.user.token.accessToken}`,
        },
      },
      onError: (status, message) => {
        toast("error", message || "알 수 없는 오류가 발생했습니다.");
      },
      onSuccess: (status, message, body) => {
        commentTrigger({});
        if (!body) return toast("success", "좋아요를 취소했습니다");
        toast("success", "좋아요를 눌렀습니다");
      },
    }
  );

  return (
    <>
      <div className="pr-5 pl-9 pt-2">
        <div className="flex flex-col">
          <div className="flex flex-row items-center mb-1">
            <div className="relative h-[34px] w-[34px] rounded-full overflow-hidden">
              <Image
                src={
                  !comment.isAnonymous
                    ? comment.user.profile
                      ? process.env.NEXT_PUBLIC_S3_URL + comment.user.profile
                      : "/images/schoolmate/logobg.svg"
                    : "/images/schoolmate/logobg.svg"
                }
                alt="article"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="flex flex-col ml-2">
              <span className="text-[#66738C] text-[0.7rem] font-bold items-center flex justify-center">
                {comment.isAnonymous ? "익명" : comment.user.name}
                {comment.isMe && (
                  <span className="font-light border border-primary-500 rounded-full text-primary-500 px-1 ml-1 text-[0.75rem] leading-[1rem]">
                    작성자
                  </span>
                )}
              </span>
              <span className="text-[#66738C] font-light text-[0.65rem]">
                {dayjs(comment.createdAt).format("MM/DD HH:mm")}
              </span>
            </div>
          </div>
          <Hyperlink
            className="text-sm whitespace-pre-wrap px-1"
            text={comment.content}
          />
          <div className="w-full flex flex-row mt-2 px-1">
            <button
              className="flex flex-row items-center text-[#66738C] text-[0.7rem] cursor-pointer"
              onClick={() => {
                likeTrigger({});
              }}
            >
              <Image
                src="/icons/Like.svg"
                alt="like"
                width={16}
                height={16}
                className="mr-1"
              />
              <span className="mr-1">좋아요</span>
              <span className="mr-2">{likeCount}</span>
            </button>
            {comment.isMe && !comment.isDeleted && (
              <button
                onClick={() => delteTrigger({})}
                className="underline underline-offset-1 text-[0.75rem] text-[#66738C] ml-auto"
              >
                삭제하기
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentList;

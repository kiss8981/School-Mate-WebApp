import { Session } from "next-auth";
import { Article, Board } from "schoolmate-types";

const Comment = ({
  article,
  board,
  auth,
}: {
  article: Article;
  board: Board;
  auth: Session;
}) => {
  return <></>;
};

export default Comment;

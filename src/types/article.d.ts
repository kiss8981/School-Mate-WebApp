import { Article, Board, Comment, ReComment } from "schoolmate-types";

export interface ArticleWithImage extends Article {
  keyOfImages: string[];
  commentCounts: number;
  likeCounts?: number;
  dislikeCounts?: number;
  isMe: boolean;
  user: {
    id: string;
    name: string;
    profile: string;
  };
  board: Board;
}

export interface CommentWithUser extends Comment {
  user: {
    id: string;
    name: string;
    profile: string;
  };
  recomments: ReCommnetWithUser[];
  isMe: boolean;
  likeCounts: number;
}

export interface ReCommnetWithUser extends ReComment {
  user: {
    id: string;
    name: string;
    profile: string;
  };
  isMe: boolean;
  likeCounts: number;
}

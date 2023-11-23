import { Article } from "schoolmate-types";

export interface ArticleWithImage extends Article {
  keyOfImages: string[];
  commentCounts: number;
  likeCounts?: number;
  dislikeCounts?: number;
  isMe: boolean;
  user: {
    id: string;
    name: string;
  };
}

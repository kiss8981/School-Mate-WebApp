import { Asked, AskedUser } from "schoolmate-types";

export type AskedWithUser = AskedUser & {
  user: {
    name: string;
    profile: string;
  };
};

export type AskedListWithUser = {
  askeds: AskedDetailWithUser[];
  user: AskedUserDetail;
  pages: number;
};

export type AskedUserDetail = {
  user: {
    name: string;
    profile: string;
  };
  tags: string[];
  statusMessage?: string;
  userId: string;
  customId: string;
};

export type AskedDetailWithUser = Asked & {
  questionUser: {
    name: string;
    profile?: string;
  };
  askedUserId?: string;
  isMyAsked: boolean;
};
import { Asked, AskedUser, School, UserSchool } from "schoolmate-types";

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
    userSchool: UserSchool & {
      school: School;
    };
  };
  tags: string[];
  statusMessage?: string;
  userId: string;
  customId: string;
  receiveOtherSchool: boolean;
};

export type AskedDetailWithUser = Asked & {
  questionUser: {
    name: string;
    profile?: string;
  };
  askedUserId?: string;
  isMyAsked: boolean;
  isOtherSchool: boolean;
};

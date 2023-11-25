import { AskedUser } from "schoolmate-types";

export type AskedWithUser = AskedUser & {
  user: {
    name: string;
    profile: string;
  };
};

import { Asked } from "schoolmate-types";

export type AskedWithUser = Asked & {
  user: {
    name: string;
    prifile: string;
  };
};

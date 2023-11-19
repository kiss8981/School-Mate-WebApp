import { DefaultSession } from "next-auth";
import { UserWithSchool } from "./user";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      user: UserWithSchool;
      token: {
        accessToken: string;
        expiresIn: number;
      };
      registered: boolean;
    };
  }
}

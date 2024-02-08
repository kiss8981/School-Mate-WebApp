import { School, SocialLogin, User, UserSchool } from "schoolmate-types";

export type UserWithSchool = User & {
  userSchool?: UserSchool & {
    school: School;
  };
  socialLogin?: SocialLogin;
};

import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const classNames = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};

export const passwordCheck = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

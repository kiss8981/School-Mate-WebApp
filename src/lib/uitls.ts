import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";

export const classNames = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};

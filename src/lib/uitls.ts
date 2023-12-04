import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";

export const classNames = (...classes: ClassValue[]) => {
  return twMerge(clsx(...classes));
};

export const passwordCheck = (password: string): boolean => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  return passwordRegex.test(password);
};

export const timeForToday = (value: Date) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const semesterHandler = () => {
  const today = dayjs();

  const semester1Start = dayjs(`${today.format("YYYY")}-03-01`);
  const semester2Start = dayjs(`${today.format("YYYY")}-08-01`);
  const semester2End = dayjs(`${today.format("YYYY")}-12-31`);
  if (today.isAfter(semester1Start) && today.isBefore(semester2Start)) {
    return "1";
  } else if (today.isAfter(semester2Start) && today.isBefore(semester2End)) {
    return "2";
  }
};

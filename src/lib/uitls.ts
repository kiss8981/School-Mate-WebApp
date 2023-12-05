import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import dayjs from "dayjs";
import { ISpecialTimetableRow } from "@/types/school";

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

export function findColorByContent(text: string) {
  for (const item of colorList) {
    const regexp = item.regexp;
    if (regexp.test(text)) {
      return item.color;
    }
  }
  return null; // 매치되는 색상이 없을 경우
}

export function mergeRowsWithSameContent(
  rows: ISpecialTimetableRow[]
): ISpecialTimetableRow[] {
  const mergedRows: ISpecialTimetableRow[] = [];

  for (let i = 0; i < rows.length; i++) {
    const currentRow = { ...rows[i] };
    const nextRow = rows[i + 1];

    if (nextRow && currentRow.ITRT_CNTNT === nextRow.ITRT_CNTNT) {
      currentRow.PERIO += `, ${nextRow.PERIO}`;
      i++;
    }

    mergedRows.push(currentRow);
  }

  return mergedRows;
}

const colorList = [
  {
    regexp: /역사/g,
    color: "#70E991",
  },
  {
    regexp: /한국사/g,
    color: "#70E991",
  },
  {
    regexp: /생물/g,
    color: "#FFBD98",
  },
  {
    regexp: /국어/g,
    color: "#FFE298",
  },
  {
    regexp: /수학/g,
    color: "#FF9898",
  },
  {
    regexp: /확률/g,
    color: "#FF9898",
  },
  {
    regexp: /영어/g,
    color: "#70E991",
  },
];

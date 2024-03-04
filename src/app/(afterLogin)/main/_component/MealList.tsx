"use client";

import { swrFetcher } from "@/lib/fetch";
import dayjs from "dayjs";
import { Session } from "next-auth";
import { useState } from "react";
import { Meal } from "schoolmate-types";
import useSWR from "swr";

const MealList = ({ auth }: { auth: Session }) => {
  const [date, setDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [time, setTime] = useState(
    dayjs().hour() < 8 ? "1" : dayjs().hour() < 14 ? "2" : "3"
  );
  const {
    data: meals,
    isLoading,
    error: mealErorr,
  } = useSWR<Meal>(
    `/school/${auth.user.user.userSchoolId}/meals?date=${date}&mealType=${time}`,
    swrFetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  if (isLoading) return <MealListSkeleton />;
  return (
    <>
      {mealErorr ? (
        <div className="h-[80px] items-center justify-center flex mt-3">
          <div className="flex flex-col items-center my-auto">
            오늘은 {time === "1" ? "아침" : time === "2" ? "점심" : "저녁"}{" "}
            식사가 없는 날이에요
          </div>
        </div>
      ) : (
        <>
          <div className="min-h-[150px] flex flex-col border p-4 rounded-[20px] justify-center mt-3">
            {meals?.DDISH_NM.split("<br/>").map((meal, index) => (
              <div key={index} className="text-sm">
                {meal}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

const MealListSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-row space-x-4 mt-3">
      <div
        className={`relative h-[150px] w-full rounded-[20px] bg-[#CCCCCC] ${shimmer}`}
      />
    </div>
  );
};

export default MealList;

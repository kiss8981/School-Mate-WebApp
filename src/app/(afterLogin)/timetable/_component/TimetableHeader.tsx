import { inter } from "@/lib/fonts";
import { classNames, semesterHandler } from "@/lib/uitls";
import dayjs from "dayjs";

const TimetableHeader = () => {
  return (
    <>
      <header
        className={classNames(
          "text-2xl bg-white fixed  w-full z-10 min-w-[280px] max-w-[540px]"
        )}
        style={{
          boxShadow: "0px 2px 30px rgba(0, 0, 0, 0.06)",
        }}
      >
        <div className="font-bold flex items-center h-14 justify-between px-5">
          <div
            className={classNames(
              "text-primary-500 font-black text-[20px] flex flex-col items-start justify-center",
              inter.className
            )}
            style={{
              wordSpacing: "-0.5px",
            }}
          >
            <span className="text-[0.7rem] leading-none font-medium">
              {dayjs().format("YYYY년") + " " + semesterHandler() + "학기"}
            </span>
            <span className="text-black font-black leading-tight mt-[0.1rem]">
              시간표
            </span>
          </div>
        </div>
      </header>
    </>
  );
};

export default TimetableHeader;

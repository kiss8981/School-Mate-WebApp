import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import dayjs from "dayjs";
dayjs.locale("ko");

const DatetimeList = () => {
  return (
    <>
      <div
        className={classNames(
          "px-5 flex-row flex w-full space-x-3",
          inter.className
        )}
      >
        <span className="font-bold text-black text-base bg-[#f0f0f0] px-3 py-1 rounded-full w-20 flex items-center justify-center">
          {dayjs().format("dddd")}
        </span>
        <div className="flex flex-row items-center justify-between w-full">
          {Array.from(Array(7).keys()).map((item, key) => (
            <DatetimeItem
              date={dayjs().add(key, "day").toDate()}
              isSelected={key === 0}
              key={key}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const DatetimeItem = ({
  date,
  isSelected,
}: {
  date: Date;
  isSelected: boolean;
}) => {
  return (
    <>
      <span
        className={classNames(
          "w-8 items-center justify-center flex h-8 rounded-full",
          isSelected ? "text-black border" : "text-[#b6b6b6]",
          dayjs(date).format("ddd") === "토" ? "text-[#25aaed]" : "",
          dayjs(date).format("ddd") === "일" ? "text-[#f44336]" : ""
        )}
      >
        {dayjs(date).format("D")}
      </span>
    </>
  );
};

export default DatetimeList;

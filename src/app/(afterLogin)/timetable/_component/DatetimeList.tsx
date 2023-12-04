import { classNames } from "@/lib/uitls";
import dayjs from "dayjs";

const DatetimeList = () => {
  return (
    <>
      <div className="px-5 flex-row flex w-full space-x-3">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <DatetimeItem
              date={dayjs().add(i, "day").toDate()}
              isSelected={i === 0}
              key={i}
            />
          ))}
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
      <div
        className={classNames(
          "px-3 py-4 flex flex-col w-full items-center justify-center rounded-2xl",
          isSelected ? "bg-primary-500 text-white" : "bg-white text-[#25AAED]"
        )}
      >
        <span className="font-bold w-9">
          {dayjs(date).format("ddd").toUpperCase()}
        </span>
        <div
          className={classNames(
            "w-full my-2 h-[0.15rem] rounded-full",
            isSelected ? "bg-white" : "bg-[#2C3439]"
          )}
        />
        <span className="font-bold">{dayjs(date).format("DD")}</span>
      </div>
    </>
  );
};

export default DatetimeList;

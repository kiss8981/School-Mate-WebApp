import { inter } from "@/lib/fonts";
import {
  classNames,
  findColorByContent,
  mergeRowsWithSameContent,
} from "@/lib/uitls";
import { ISpecialTimetableRow } from "@/types/school";
import { AxiosResponse } from "axios";

const Timetable = async ({ data }: { data: Promise<AxiosResponse> }) => {
  const timelist = (await data
    .then(res => res.data.data)
    .catch(e => {
      return [];
    })) as ISpecialTimetableRow[];
  const mergeContents = mergeRowsWithSameContent(timelist);
  return (
    <>
      <div className="flex flex-col space-y-4">
        {mergeContents.length === 0 ? (
          <>
            <span className="mx-auto mt-20 text-lg text-[#b6b6b6]">
              오늘은 수업이 없는날 인가요?
            </span>
          </>
        ) : (
          <>
            {mergeContents.map((item, key) => (
              <Timeitem data={item} key={key} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

const Timeitem = ({ data }: { data: ISpecialTimetableRow }) => {
  const color = findColorByContent(data.ITRT_CNTNT as string);
  return (
    <>
      <div className={classNames("w-full h-full relative", inter.className)}>
        <div
          style={{
            borderLeft: `5px solid ${color ? color : "#CCCCCC"}`,
          }}
          className="absolute top-0 left-0 h-full w-1 rounded-full"
        />
        <div className="flex flex-col pl-5">
          <div
            className={classNames(
              "flex flex-col border-t border-b pl-2 space-y-4",
              data.PERIO?.includes(",") ? "py-12" : "py-4"
            )}
          >
            <span className="text-lg font-bold">{data.ITRT_CNTNT}</span>
            <span>{data.PERIO}교시 수업</span>
          </div>
        </div>
      </div>
    </>
  );
};

const TimetableSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <div className="flex flex-col mt-3 space-y-3 w-full">
      <div
        className={`relative h-[120px] rounded-[20px] w-full bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[180px] rounded-[20px] w-full bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[120px] rounded-[20px] w-full bg-[#CCCCCC] ${shimmer}`}
      />
      <div
        className={`relative h-[120px] rounded-[20px] w-full bg-[#CCCCCC] ${shimmer}`}
      />
    </div>
  );
};

export { TimetableSkeleton };
export default Timetable;

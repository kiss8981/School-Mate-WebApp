"use client";

import { stackRouterPush } from "@/lib/stackRouter";
import { classNames } from "@/lib/uitls";
import { useRouter } from "next/navigation";

const BoardItem = ({
  icon,
  name,
  path,
  index,
}: {
  icon: string;
  name: string;
  path: string;
  index: number;
}) => {
  const router = useRouter();

  return (
    <button
      className={classNames(
        `flex flex-row w-full py-4`,
        index === 0 ? "" : "border-t"
      )}
      onClick={() => {
        stackRouterPush(router, path, "stack");
      }}
    >
      <span className="mr-3">{icon}</span>
      <span>{name}</span>
    </button>
  );
};

export default BoardItem;

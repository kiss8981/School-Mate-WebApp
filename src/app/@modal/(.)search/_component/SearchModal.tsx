"use client";

import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { redirect, useRouter } from "next/navigation";
import SearchModalHeader from "./SearchModalHeader";
import SearchModalResult from "./SearchModalResult";
import { Session } from "next-auth";

export default function SearchModal({
  className,
  auth,
}: {
  className?: string;
  auth: Session;
}) {
  const [keyword, setKeyword] = useState("");

  return (
    <div className={className}>
      <SearchModalHeader onChange={setKeyword} value={keyword} />
      <div
        className="h-full"
        style={{
          paddingTop: `64px`,
        }}
      >
        <SearchModalResult keyword={keyword} auth={auth} />
      </div>
    </div>
  );
}

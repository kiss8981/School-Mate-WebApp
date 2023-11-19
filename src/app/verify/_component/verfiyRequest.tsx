"use client";

import Input from "@/app/_component/Input";
import { inter } from "@/lib/fonts";
import { classNames } from "@/lib/uitls";
import React, { useState } from "react";
import { School, UserSchoolVerify } from "schoolmate-types";
import Image from "next/image";
import useFetch from "@/hooks/useFetch";
import { ClassInfoRow, SchoolInfoRow } from "@/types/school";
import { Session } from "next-auth";
import { Collapse } from "react-collapse";
import { toast } from "@/lib/webviewHandler";
import Button from "@/app/_component/Button";

const VerifyRequest: React.FC<{
  verifys: UserSchoolVerify[];
  auth: Session;
}> = ({ verifys, auth }) => {
  const [requestVerify, setRequestVerify] = useState<boolean>(
    verifys.length === 0
  );
  const [schoolName, setSchoolName] = useState<string>("");
  const [schoolList, setSchoolList] = useState<SchoolInfoRow[]>();
  const [loadingSchoolList, setLoadingSchoolList] = useState<boolean>(false);
  const [selectSchool, setSelectSchool] = useState<ClassInfoRow[]>();
  const [loadingSchool, setLoadingSchool] = useState<boolean>(false);
  const [grade, setGrade] = useState<string>();
  const [classNum, setClassNum] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const { triggerFetch: findSchools } = useFetch("/school/search", "GET", {
    fetchInit: {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
      },
    },
    onSuccess: (res, stautsMessage, body: SchoolInfoRow[]) => {
      setSchoolList(body);
      setLoadingSchoolList(false);
      setSelectSchool(undefined);
      setGrade(undefined);
      setClassNum(undefined);
      setDepartment(undefined);
    },
    onPending: () => setLoadingSchoolList(true),
    onError: (code, message) => {
      setLoadingSchoolList(false);
      toast("error", message || "학교를 불러오는데 실패했습니다.");
    },
  });

  const { triggerFetch: findSchool } = useFetch(``, "GET", {
    fetchInit: {
      headers: {
        Authorization: `Bearer ${auth.user.token.accessToken}`,
      },
    },
    onPending: () => setLoadingSchool(true),
    onSuccess: (res, statusMessage, body: ClassInfoRow[]) => {
      setLoadingSchool(false);
      setSelectSchool(body);
      setGrade(undefined);
      setClassNum(undefined);
      setDepartment(undefined);
    },
    onError: (code, message) => {
      setLoadingSchool(false);
      toast("error", message || "학교를 불러오는데 실패했습니다.");
    },
  });

  if (requestVerify)
    return (
      <>
        <div className={classNames(inter.className, "pt-4")}>
          <div className="flex flex-col px-5">
            <span className="rounded-full bg-primary-500 flex items-center justify-center text-white w-5 h-5 text-sm font-bold">
              1
            </span>
            <span className="font-bold mt-1 text-xl">학교를 찾아보세요!</span>
            <form
              className="w-full relative mt-2"
              onSubmit={(e) => {
                e.preventDefault();

                findSchools({
                  fetchInit: {
                    params: {
                      keyword: schoolName,
                    },
                  },
                });
              }}
            >
              <Input
                placeholder="학교명을 입력해주세요."
                className="w-full px-4 pr-12 h-12"
                onChange={(e) => setSchoolName(e.target.value)}
                disabled={loadingSchoolList}
              />
              <button className="absolute right-3 top-3.5">
                {loadingSchoolList ? (
                  <>
                    <svg
                      aria-hidden="true"
                      className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-primary-500"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </>
                ) : (
                  <>
                    <Image
                      src="/icons/Search.svg"
                      alt="search"
                      width={20}
                      height={20}
                    />
                  </>
                )}
              </button>
            </form>
            <Collapse isOpened={schoolList ? true : false}>
              <div className="mt-2 relative">
                <select
                  onChange={(e) => {
                    findSchool({
                      fetchInit: {
                        url: `/school/${e.target.value}/class`,
                      },
                    });
                  }}
                  className="w-full h-12 bg-[#f9f9f9] text-black ring-0 px-3 py-3 rounded-[10px] outline-none appearance-none"
                >
                  <option value="">학교를 선택해주세요.</option>
                  {schoolList && (
                    <>
                      {schoolList.map((school) => (
                        <option
                          key={school.SD_SCHUL_CODE}
                          value={school.SD_SCHUL_CODE}
                        >
                          {school.SCHUL_NM} ({school.ATPT_OFCDC_SC_NM})
                        </option>
                      ))}
                    </>
                  )}
                </select>

                <div className="absolute right-4 top-4">
                  <Image
                    src="/icons/Back.svg"
                    alt="arrow"
                    className="rotate-[-90deg]"
                    style={{
                      filter:
                        "invert(75%) sepia(29%) saturate(12%) hue-rotate(100deg) brightness(91%) contrast(93%)",
                    }}
                    width={11}
                    height={11}
                  />
                </div>
              </div>
            </Collapse>
          </div>
          <Collapse isOpened={selectSchool ? true : false}>
            <div className="flex flex-col mt-5 px-5">
              <span className="rounded-full bg-primary-500 flex items-center justify-center text-white w-5 h-5 text-sm font-bold">
                2
              </span>
              <span className="font-bold mt-1 text-xl">몇 학년인가요?</span>
              <div className="grid grid-cols-3 gap-3 mt-2">
                {selectSchool
                  ?.reduce(function (acc: ClassInfoRow[], current) {
                    if (
                      acc.findIndex(({ GRADE }) => GRADE === current.GRADE) ===
                      -1
                    ) {
                      acc.push(current);
                    }
                    return acc;
                  }, [])
                  .map((school, index) => (
                    <button
                      onClick={() => {
                        setGrade(school.GRADE);
                        setClassNum("choose");
                        setDepartment("choose");
                      }}
                      className={classNames(
                        "rounded-[10px] h-12",
                        school.GRADE === grade
                          ? "bg-primary-500 text-white"
                          : "bg-[#F9F9F9] text-[#7C7C7C]"
                      )}
                      key={index}
                    >
                      {school.GRADE}
                    </button>
                  ))}
              </div>
            </div>
          </Collapse>
          <Collapse isOpened={grade ? true : false}>
            <div className="flex flex-col mt-5 px-5">
              <span className="rounded-full bg-primary-500 flex items-center justify-center text-white w-5 h-5 text-sm font-bold">
                2
              </span>
              <span className="font-bold mt-1 text-xl">
                반과 학과를 선택해주세요
              </span>
              <select
                onChange={(e) => {
                  setClassNum(e.target.value);
                }}
                value={classNum}
                className="w-full mt-2 h-12 bg-[#f9f9f9] text-black ring-0 px-3 py-3 rounded-[10px] outline-none appearance-none"
              >
                <option value="choose">반을 선택해주세요</option>
                {selectSchool
                  ?.filter((school) => school.GRADE === grade)
                  .reduce(function (acc: ClassInfoRow[], current) {
                    if (
                      acc.findIndex(
                        ({ CLASS_NM }) => CLASS_NM === current.CLASS_NM
                      ) === -1
                    ) {
                      acc.push(current);
                    }
                    return acc;
                  }, [])
                  .sort((a, b) => {
                    return Number(a.CLASS_NM) - Number(b.CLASS_NM);
                  })
                  .map((school, index) => (
                    <option key={index} value={school.CLASS_NM}>
                      {school.CLASS_NM}반
                    </option>
                  ))}
              </select>
              {selectSchool &&
              !selectSchool
                .filter((school) => school.GRADE === grade)
                .filter((school) => school.CLASS_NM === classNum)[0]
                ?.DDDEP_NM ? (
                <></>
              ) : (
                <>
                  <Collapse isOpened={classNum ? true : false}>
                    <select
                      onChange={(e) => {
                        setDepartment(e.target.value);
                      }}
                      value={department}
                      className="w-full h-12 mt-2 bg-[#f9f9f9] text-black ring-0 px-3 py-3 rounded-[10px] outline-none appearance-none"
                    >
                      <option value="choose">학과를 선택해주세요</option>
                      {selectSchool
                        ?.filter((school) => school.GRADE === grade)
                        .filter((school) => school.CLASS_NM === classNum)
                        .map((school, index) => (
                          <option key={index} value={school.DDDEP_NM}>
                            {school.DDDEP_NM}
                          </option>
                        ))}
                    </select>
                  </Collapse>
                </>
              )}
            </div>
          </Collapse>
          {(selectSchool &&
            !selectSchool
              .filter((school) => school.GRADE === grade)
              .filter((school) => school.CLASS_NM === classNum)[0]?.DDDEP_NM &&
            classNum) ||
          classNum ? (
            <div className="absolute bottom-8 px-5 w-full">
              <Button className="rounded-full mt-auto w-full h-14">다음</Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </>
    );

  return <></>;
};

export default VerifyRequest;

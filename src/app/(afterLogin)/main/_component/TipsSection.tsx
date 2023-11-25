import React from "react";
import Image from "next/image";
import { classNames } from "@/lib/uitls";
import { roboto } from "@/lib/fonts";

interface Props {
  title: string;
  description: string;
  link: string;
}

const TipsSection: React.FC<Props> = ({ title, description, link }) => {
  return (
    <>
      <div className={classNames("px-5 mt-4", roboto.className)}>
        <div className="w-full border-[#f0f0f0] rounded-[20px] p-4 border flex flex-row">
          <div className="flex flex-col">
            <span className="px-3 py-1 text-white rounded-[8px] bg-[#2545ED] w-fit font-bold">
              Tip
            </span>
            <span className="mt-2">{description}</span>
            <div className="font-bold flex flex-row">
              {title}
              <Image
                src="/icons/Back.svg"
                alt="more"
                width={8}
                height={8}
                className="rotate-180 ml-2"
              />
            </div>
          </div>
          <Image
            src="/images/schoolmate/logo.svg"
            alt="logo"
            width={75}
            height={75}
            className="ml-auto mt-auto"
          />
        </div>
      </div>
    </>
  );
};

export default TipsSection;

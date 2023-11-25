"use client";

import { sendWebviewEvent } from "@/lib/webviewHandler";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
  image: string;
  link: string;
}

const Advertisement: React.FC<{
  advertisement: Props[];
}> = ({ advertisement }) => {
  const [avtivePage, setActivePage] = useState(0);
  return (
    <>
      <section className="pt-4 px-5 relative">
        <div
          className="absolute right-8 bottom-3 items-center flex justify-center rounded-[10px]"
          style={{
            background: "rgba(0, 0, 0, 0.32)",
            zIndex: 5,
          }}
        >
          <span className="text-white text-xs px-2 py-1 rounded-full">
            {avtivePage + 1} / {advertisement.length}
          </span>
        </div>
        <Swiper
          className="w-full relative rounded-[20px] overflow-hidden h-[100px] border"
          onSlideChange={swiper => setActivePage(swiper.activeIndex)}
        >
          {advertisement.map((ad, index) => (
            <SwiperSlide
              key={index}
              className="relative"
              onClick={() => {
                sendWebviewEvent("OPEN_BROWSER_EVENT", {
                  url: ad.link,
                });
              }}
            >
              <Image alt="ad" src={ad.image} objectFit="cover" layout="fill" />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Advertisement;

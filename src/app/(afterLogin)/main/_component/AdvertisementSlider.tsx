"use client";

import Image from "next/image";
import { sendWebviewEvent } from "@/lib/webviewHandler";
import { useState } from "react";
import { Advertise } from "schoolmate-types";
import { Swiper, SwiperSlide } from "swiper/react";

const AdvertisementSlider = ({
  advertisement,
}: {
  advertisement: Advertise[];
}) => {
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
          onSlideChange={(swiper) => setActivePage(swiper.activeIndex)}
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
              <Image
                alt="ad"
                src={process.env.NEXT_PUBLIC_S3_URL + ad.image}
                layout="fill"
                objectFit="cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default AdvertisementSlider;

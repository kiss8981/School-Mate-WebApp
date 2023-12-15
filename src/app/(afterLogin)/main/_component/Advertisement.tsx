"use client";

import { Advertise } from "schoolmate-types";
import AdvertisementSlider from "./AdvertisementSlider";
import { classNames } from "@/lib/uitls";
import useSWR from "swr";
import { swrFetcher } from "@/lib/fetch";

const Advertisement = () => {
  const { data, isLoading, error } = useSWR<Advertise[]>("/ad", swrFetcher);
  if (!data || isLoading) return <AdvertisementSkeleton />;

  return (
    <>
      <AdvertisementSlider advertisement={data} />
    </>
  );
};

const AdvertisementSkeleton = () => {
  const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent`;

  return (
    <>
      <section className="pt-4 px-5 relative">
        <div
          className={classNames(
            "w-full relative rounded-[20px] overflow-hidden h-[100px] border bg-[#CCCCCC]",
            shimmer
          )}
        />
      </section>
    </>
  );
};

export default Advertisement;

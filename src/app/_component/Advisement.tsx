"use client";

import { classNames } from "@/lib/uitls";
import React, { useEffect, useRef } from "react";

function KaKaoAd({
  unit,
  width = 320,
  height = 100,
  disabled,
  className,
}: {
  unit: string;
  width?: number;
  height?: number;
  disabled?: boolean;
  className?: string;
}) {
  const scriptElementWrapper = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!disabled) {
      const script = document.createElement("script");
      script.setAttribute("src", "https://t1.daumcdn.net/kas/static/ba.min.js");
      script.setAttribute("async", "true");
      scriptElementWrapper.current?.appendChild(script);

      return () => {
        const globalAdfit = "adfit" in window ? window.adfit : null;
        if (globalAdfit) globalAdfit.destroy(unit);
      };
    }
  }, []);

  return (
    <div
      ref={scriptElementWrapper}
      className={className}
      style={{ width: "100%", height: "100%" }}
    >
      <ins
        className="kakao_ad_area"
        style={{ display: "none" }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      />
    </div>
  );
}
export default React.memo(KaKaoAd);

interface Adfit {
  display: (unit: string) => void;
  destroy: (unit: string) => void;
  refresh: (unit: string) => void;
}

declare global {
  interface Window {
    adfit?: Adfit;
  }
}

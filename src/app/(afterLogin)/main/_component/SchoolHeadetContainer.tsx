"use client";

import { useEffect, useRef, useState } from "react";
import SchoolHeader from "./SchoolHeader";

const SchoolHeaderContainer = ({
  title = "",
  badage,
  children,
  className = "",
}: {
  title?: string;
  badage?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) => {
  useEffect(() => {
    function handleVerticalResize() {
      const clientWidth = document.getElementsByTagName("html")[0].clientWidth;
      if (window.visualViewport?.width === clientWidth) {
        // indicates that width is unchanged (e.g. keyboard opens on phone)
        document.getElementsByTagName("html")[0].style.height =
          window.visualViewport?.height.toString() + "px";
      }
    }
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleVerticalResize);
      return () =>
        window.visualViewport?.removeEventListener(
          "resize",
          handleVerticalResize
        );
    }
  }, []);

  return (
    <>
      <div className={className}>
        <SchoolHeader badge={badage} title={title} />
        <div
          style={{
            paddingTop: `calc(env(safe-area-inset-top) + ${
              badage ? "85.5px + 64px" : "64px"
            })`,
            paddingBottom: `calc(env(safe-area-inset-bottom) + 6rem)`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SchoolHeaderContainer;

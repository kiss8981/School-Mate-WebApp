"use client";

import { useEffect, useRef, useState } from "react";
import Header from "./Header";

const HeaderContainer = ({
  title = "",
  backIcon = true,
  children,
  className = "",
  rightIcon,
}: {
  title?: string;
  backIcon?: boolean;
  children?: React.ReactNode;
  className?: string;
  rightIcon?: React.ReactNode;
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
        <Header title={title} backIcon={backIcon} rightIcon={rightIcon} />
        <div
          style={{
            paddingTop: "calc(env(safe-area-inset-top) + 64px)",
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default HeaderContainer;

"use client";

import { useEffect, useRef, useState } from "react";
import SchoolHeader from "./SchoolHeader";
import BottomNavbar from "../../_component/BottomNavbar";
import { Session } from "next-auth";

const SchoolHeaderContainer = ({
  title = "",
  badage,
  children,
  className = "",
  auth,
}: {
  title?: string;
  badage?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  auth: Session;
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
        <SchoolHeader badge={badage} title={title} auth={auth} />
        <div
          style={{
            paddingTop: badage ? "calc(85.5px + 64px)" : "64px",
            paddingBottom: `6rem`,
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default SchoolHeaderContainer;

"use client";

import React from "react";
import { NotionRenderer } from "react-notion-x";
import Image from "next/image";

const NotionPage = ({ recordMap }: { recordMap: any }) => {
  return (
    <>
      <div className="px-2">
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          disableHeader
          darkMode={false}
          components={{
            nextImage: Image,
          }}
        />
      </div>
    </>
  );
};

export default NotionPage;

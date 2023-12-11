import HeaderContainer from "@/app/_component/HeaderContainer";
import { NotionAPI } from "notion-client";
import NotionPage from "./_component/Notion";
import { Metadata } from "next";
export const revalidate = 3600; // revalidate the data at most every hour

export const metadata: Metadata = {
  title: "가이드",
};

const getNotionData = async () => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage(
    `https://notion-api.splitbee.io/v1/page/ff90a6e2df3c490a8e7003d4721ebd0c`
  );
  return recordMap;
};

const GuildPage = async () => {
  const recordMap = await getNotionData();

  return (
    <>
      <HeaderContainer title="가이드">
        <NotionPage recordMap={recordMap} />
      </HeaderContainer>
    </>
  );
};

export default GuildPage;

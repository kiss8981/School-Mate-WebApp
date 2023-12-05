import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import AskedIntro from "./_component/AskedIntro";

const AskedPage = () => {
  return (
    <LeftHeaderContainer title="에스크 프로필 만들기" seachIcon={false}>
      <AskedIntro />
    </LeftHeaderContainer>
  );
};
export default AskedPage;

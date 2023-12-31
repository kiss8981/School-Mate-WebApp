import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import FindPasswordComponent from "./_component/FindPasswordComponent";

const FindpasswordPage = () => {
  return (
    <>
      <LeftHeaderContainer searchIcon={false} title="비밀번호 찾기">
        <FindPasswordComponent />
      </LeftHeaderContainer>
    </>
  );
};

export default FindpasswordPage;

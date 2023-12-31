import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import DisconnectAccountTemplate from "../../_component/DisconnectAccountTemplate";

const InstagramDisconnectAccountPage = () => {
  return (
    <>
      <LeftHeaderContainer title="계정 연동헤제" searchIcon={false}>
        <DisconnectAccountTemplate
          provider="instagram"
          providerName="인스타그램"
        />
      </LeftHeaderContainer>
    </>
  );
};

export default InstagramDisconnectAccountPage;

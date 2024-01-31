import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import DisconnectAccountTemplate from "../../_component/DisconnectAccountTemplate";

const LeagueoflegendsDisconnectAccountPage = () => {
  return (
    <>
      <LeftHeaderContainer title="계정 연동헤제" searchIcon={false}>
        <DisconnectAccountTemplate
          provider="leagueoflegends"
          providerName="리그 오브 레전드"
        />
      </LeftHeaderContainer>
    </>
  );
};

export default LeagueoflegendsDisconnectAccountPage;

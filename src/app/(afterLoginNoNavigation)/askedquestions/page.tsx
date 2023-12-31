import LeftHeaderContainer from "@/app/_component/LeftHeaderContainer";
import MyAskedQuestions from "./_component/MyAskedQuestions";

const AskedQuestionsPage = () => {
  return (
    <>
      <LeftHeaderContainer title="내가 한 질문" searchIcon={false}>
        <MyAskedQuestions />
      </LeftHeaderContainer>
    </>
  );
};

export default AskedQuestionsPage;

import SearchModal from "@/app/@modal/(.)search/_component/SearchModal";
import { Session } from "next-auth";

const SearchPage = ({ auth }: { auth: Session }) => {
  return (
    <>
      <SearchModal auth={auth} />
    </>
  );
};

export default SearchPage;

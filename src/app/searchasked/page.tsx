import SearchModal from "./_component/SearchAsked";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "에스크 검색",
};

const SearchAskedPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth) return redirect("/intro");

  return (
    <>
      <SearchModal auth={auth} />
    </>
  );
};

export default SearchAskedPage;

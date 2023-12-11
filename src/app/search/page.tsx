import SearchModal from "@/app/@modal/(.)search/_component/SearchModal";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `게시글 검색`,
};

const SearchPage = async () => {
  const auth = await getServerSession(authOptions);
  if (!auth) return redirect("/intro");

  return (
    <>
      <SearchModal auth={auth} />
    </>
  );
};

export default SearchPage;

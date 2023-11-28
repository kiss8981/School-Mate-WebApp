import SearchModal from "@/app/@modal/(.)search/_component/SearchModal";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../auth";
import { Metadata } from "next";
export const metadata: Metadata = {
  viewport:
    "width=device-width, initial-scale=1.0, user-scalable=0, viewport-fit=cover, maximum-scale=1.0",
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

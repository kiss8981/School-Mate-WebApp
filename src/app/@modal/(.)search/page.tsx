import { getServerSession } from "next-auth/next";
import SearchModal from "./_component/SearchModal";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";

const SearchModalPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");

  return (
    <>
      <SearchModal
        className="bg-white w-[100vw] h-full flex-col absolute top-0 z-50"
        auth={auth}
      />
    </>
  );
};

export default SearchModalPage;

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";

const Home: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");

  return (
    <div>
      <h1>After Login Page</h1>
      <h2></h2>
    </div>
  );
};

export default Home;

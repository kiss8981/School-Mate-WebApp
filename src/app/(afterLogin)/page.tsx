import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";
import { NextPage } from "next";

const Home: NextPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");

  return redirect("/main");
};

export default Home;

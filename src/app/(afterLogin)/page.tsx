import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth";
import { redirect } from "next/navigation";

const AfterLoginPage = async () => {
  const auth = await getServerSession(authOptions);

  if (!auth) return redirect("/intro");

  return (
    <div>
      <h1>After Login Page</h1>
      <h2></h2>
    </div>
  );
};

export default AfterLoginPage;

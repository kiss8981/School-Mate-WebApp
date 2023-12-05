import { AskedWithUser } from "@/types/asked";
import { AxiosResponse } from "axios";
import AskedCreate from "./AskedCreate";

const AskedMe = async ({ data }: { data: Promise<AxiosResponse> }) => {
  const askedme = (await data
    .then((res) => res.data.data)
    .catch((e) => null)) as AskedWithUser | null;

  if (!askedme) return <AskedCreate />;

  return <></>;
};

const AskedMeSkeleton = () => {
  return <></>;
};

export default AskedMe;
export { AskedMeSkeleton };

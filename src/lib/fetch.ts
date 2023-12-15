import axios, { AxiosResponse } from "axios";

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const swrFetcher = async (url: string) => {
  try {
    const response = await fetcher.get(url);
    return response.data.data;
  } catch (error: AxiosResponse | any) {
    throw error.response.data;
  }
};

export default fetcher;
export { swrFetcher };

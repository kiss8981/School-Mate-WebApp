import { Inter, Nanum_Gothic, Roboto, Roboto_Mono } from "next/font/google";

export const NanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: "400",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});
export const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

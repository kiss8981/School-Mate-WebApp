"use client";

import { Cookies } from "react-cookie";
const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any) => {
  return cookies.set(name, value, { ...options, overwrite: true });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

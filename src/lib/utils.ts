import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanUrl = (url: string) => {
  if (!url) return "";

  url = url.replace("https://", "").replace("http://", "");
  url = url.replace(/\/$/, "");

  return url;
};

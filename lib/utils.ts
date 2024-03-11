import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

//合并和处理 Tailwind CSS 的类名字符串,避免样式冲突和优先级问题
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

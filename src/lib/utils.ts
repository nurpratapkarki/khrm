import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
  let baseUrl = "";
  try {
    const url = new URL(apiUrl);
    baseUrl = url.origin;
  } catch (e) {
    baseUrl = "http://localhost:8000";
  }

  if (!path.startsWith("/")) {
    return `${baseUrl}/${path}`;
  }
  return `${baseUrl}${path}`;
}

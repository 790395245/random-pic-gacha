import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNSFWBlurSetting(): boolean {
  const saved = localStorage.getItem('nsfw_blur_enabled');
  return saved === null ? true : saved === 'true';
}

export function setNSFWBlurSetting(enabled: boolean): void {
  localStorage.setItem('nsfw_blur_enabled', String(enabled));
}

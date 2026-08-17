import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Gabungkan class Tailwind dengan resolusi konflik
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
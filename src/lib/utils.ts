import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DateTime } from 'luxon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatToIST(isoString: string, format = "LLL dd, yyyy") {
  return DateTime
    .fromISO(isoString, { zone: 'utc' })
    .setZone('Asia/Kolkata')
    .toFormat(format);
}

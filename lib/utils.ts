import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number, opts?: { withSymbol?: boolean }) {
  const v = Number.isFinite(value) ? value : 0;
  const formatted = v.toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return opts?.withSymbol === false ? formatted : `¥ ${formatted}`;
}

export function formatNumber(value: number, digits = 1) {
  if (!Number.isFinite(value)) return "0";
  return value.toLocaleString("zh-CN", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatArea(value: number) {
  return `${formatNumber(value, 1)} m²`;
}

export function relativeTime(iso: string, now: Date = new Date("2025-05-10T15:00:00")) {
  const target = new Date(iso).getTime();
  const diffMs = now.getTime() - target;
  const min = Math.round(diffMs / 60000);
  if (min < 1) return "刚刚";
  if (min < 60) return `${min} 分钟前`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `${hr} 小时前`;
  const day = Math.round(hr / 24);
  if (day === 1) return "昨天";
  if (day < 7) return `${day} 天前`;
  return new Date(iso).toLocaleDateString("zh-CN");
}

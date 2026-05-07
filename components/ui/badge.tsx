import * as React from "react";
import { cn } from "@/lib/utils";

type Tone =
  | "brand"
  | "neutral"
  | "warn"
  | "info"
  | "danger"
  | "success"
  | "subtle"
  | "dark";

const tones: Record<Tone, string> = {
  brand: "bg-brand-50 text-brand-700 border border-brand-100",
  success: "bg-brand-600 text-white border border-brand-700",
  neutral: "bg-surface-subtle text-ink-700 border border-line",
  subtle: "bg-ink-100 text-ink-700",
  warn: "bg-warn-50 text-warn-600 border border-warn-50",
  info: "bg-info-50 text-info-500 border border-info-50",
  danger: "bg-danger-50 text-danger-500 border border-danger-50",
  dark: "bg-ink-800 text-white",
};

export function Badge({
  tone = "neutral",
  className,
  children,
  dot,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 h-5 rounded text-[11px] font-medium leading-none",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="size-1.5 rounded-full bg-current opacity-70" />}
      {children}
    </span>
  );
}

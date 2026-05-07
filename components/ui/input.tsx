import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, iconLeft, iconRight, ...props }, ref) {
    if (iconLeft || iconRight) {
      return (
        <div
          className={cn(
            "flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-line focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/15 transition",
            className,
          )}
        >
          {iconLeft && <span className="text-ink-400 shrink-0">{iconLeft}</span>}
          <input
            ref={ref}
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-400"
            {...props}
          />
          {iconRight && <span className="text-ink-400 shrink-0">{iconRight}</span>}
        </div>
      );
    }
    return (
      <input
        ref={ref}
        className={cn(
          "h-9 px-3 w-full rounded-lg bg-white border border-line text-sm placeholder:text-ink-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 outline-none transition",
          className,
        )}
        {...props}
      />
    );
  },
);

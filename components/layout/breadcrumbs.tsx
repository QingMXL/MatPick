import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex items-center text-[13.5px] text-ink-500">
      {items.map((c, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <ChevronRight className="size-3.5 mx-1.5 text-ink-400" />}
          {c.href ? (
            <Link
              href={c.href}
              className="hover:text-brand-700 hover:underline underline-offset-2"
            >
              {c.label}
            </Link>
          ) : (
            <span
              className={
                i === items.length - 1
                  ? "text-ink-900 font-medium"
                  : "text-ink-500"
              }
            >
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

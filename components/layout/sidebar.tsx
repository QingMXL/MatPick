"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  FolderKanban,
  Library,
  FileText,
  ShoppingCart,
  Heart,
  Users,
  Settings,
} from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard", label: "工作台", icon: LayoutGrid },
  { href: "/projects", label: "项目", icon: FolderKanban },
  { href: "/materials", label: "材料库", icon: Library },
  { href: "/quotes", label: "报价", icon: FileText },
  { href: "/orders", label: "订单", icon: ShoppingCart },
  { href: "/favorites", label: "收藏", icon: Heart },
  { href: "/team", label: "团队", icon: Users },
  { href: "/settings", label: "设置", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-[208px] shrink-0 bg-white border-r border-line flex flex-col">
      <div className="px-5 h-16 flex items-center border-b border-line">
        <Logo />
      </div>
      <nav className="flex-1 py-3 px-3 space-y-0.5 overflow-y-auto">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 h-10 px-3 rounded-lg text-[13.5px] transition-colors relative",
                active
                  ? "bg-brand-50 text-brand-700 font-medium"
                  : "text-ink-700 hover:bg-surface-subtle",
              )}
            >
              {active && (
                <span className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-brand-600" />
              )}
              <Icon
                className={cn(
                  "size-[18px]",
                  active ? "text-brand-700" : "text-ink-500",
                )}
                strokeWidth={active ? 2 : 1.6}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="m-3 p-3 rounded-lg bg-surface-subtle border border-line">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-flex items-center justify-center px-1.5 h-4 rounded bg-brand-600 text-white text-[10px] font-medium">
            企业版
          </span>
          <span className="text-xxs text-ink-500">2025/12/31 到期</span>
        </div>
        <div className="text-xxs text-ink-500 mt-2">存储空间</div>
        <div className="text-xs text-ink-700 font-medium">36.2GB / 200GB</div>
        <div className="mt-1.5 h-1 rounded-full bg-ink-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-brand-500"
            style={{ width: "18%" }}
          />
        </div>
      </div>
    </aside>
  );
}

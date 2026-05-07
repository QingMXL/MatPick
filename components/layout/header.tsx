"use client";

import { Bell, MessageSquare, HelpCircle, Search, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="h-16 shrink-0 bg-white border-b border-line flex items-center px-6 gap-6">
      <div className="flex-1 max-w-[640px] mx-auto w-full">
        <label className="flex items-center gap-2 h-10 px-3.5 rounded-lg bg-surface-subtle hover:bg-ink-100/70 border border-transparent focus-within:bg-white focus-within:border-line transition-colors">
          <Search className="size-4 text-ink-400" />
          <input
            placeholder="搜索项目、材料、供应商、SKU"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-400"
          />
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] text-ink-400 bg-white border border-line rounded px-1.5 py-0.5">
            ⌘ K
          </kbd>
        </label>
      </div>
      <div className="flex items-center gap-1">
        <button className="relative inline-flex items-center justify-center w-9 h-9 rounded-lg text-ink-600 hover:bg-surface-subtle">
          <Bell className="size-[18px]" />
          <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full bg-danger-500 text-white text-[10px] inline-flex items-center justify-center font-medium">
            12
          </span>
        </button>
        <button className="inline-flex items-center gap-1 h-9 px-2.5 rounded-lg text-ink-700 text-sm hover:bg-surface-subtle">
          <MessageSquare className="size-[18px] text-ink-500" />
          <span>消息</span>
        </button>
        <button className="inline-flex items-center gap-1 h-9 px-2.5 rounded-lg text-ink-700 text-sm hover:bg-surface-subtle">
          <HelpCircle className="size-[18px] text-ink-500" />
          <span>帮助</span>
        </button>
        <div className="w-px h-6 bg-line mx-2" />
        <button className="inline-flex items-center gap-2 pl-1 pr-2 h-10 rounded-full hover:bg-surface-subtle">
          <Avatar name="林" size={32} className="bg-brand-100 text-brand-700" />
          <div className="text-left leading-tight">
            <div className="text-[13px] text-ink-900 font-medium">林设计</div>
            <div className="text-[10px] text-ink-400">Designer</div>
          </div>
          <ChevronDown className="size-4 text-ink-400" />
        </button>
      </div>
    </header>
  );
}

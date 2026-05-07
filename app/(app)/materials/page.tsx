"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Upload,
  MoreHorizontal,
  Filter,
  Star,
  ChevronDown,
  LayoutGrid,
  List,
  X,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialThumb } from "@/components/ui/material-thumb";
import { categoryList, materials, findSupplier } from "@/lib/mock";
import { cn } from "@/lib/utils";
import type { MaterialCategory } from "@/lib/types";

const sideTabs = [
  { label: "全部材料", count: 12846 },
  { label: "热门", count: 1286 },
  { label: "新品", count: 862 },
  { label: "酒店专用", count: 1024 },
  { label: "可持续", count: 645 },
];

const quickFilters = [
  "收藏的材料",
  "最近浏览",
  "已应用材料",
  "品牌库",
  "供应商",
];

export default function MaterialsPage() {
  const [active, setActive] = useState<MaterialCategory | "全部">("全部");
  const [selected, setSelected] = useState<string[]>([
    "m_yudu_white",
    "m_oak_straight",
    "m_brass_steel",
  ]);

  const list = useMemo(
    () =>
      active === "全部"
        ? materials
        : materials.filter((m) => m.category === active),
    [active],
  );

  function toggle(id: string) {
    setSelected((s) =>
      s.includes(id) ? s.filter((x) => x !== id) : [...s, id],
    );
  }

  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto pb-24">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900">材料库</h1>
          <p className="text-[13px] text-ink-500 mt-1">
            甄选全球高品质材料，助力设计落地
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" iconLeft={<Upload className="size-4" />}>
            上传材料
          </Button>
          <button className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line bg-white hover:border-ink-300">
            <MoreHorizontal className="size-4 text-ink-500" />
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <label className="flex-1 max-w-[420px] flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-line">
          <Search className="size-4 text-ink-400" />
          <input
            placeholder="搜索材料名称、品牌、型号、供应商"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-400"
          />
        </label>
        <button className="inline-flex items-center justify-center size-9 rounded-lg bg-white border border-line text-ink-500 hover:border-ink-300">
          <Filter className="size-4" />
        </button>
      </div>

      {/* Filter chips row */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        {categoryList.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key as MaterialCategory | "全部")}
            className={cn(
              "h-8 px-3 rounded-md text-[13px] inline-flex items-center gap-1 border transition-colors",
              active === c.key
                ? "bg-brand-50 text-brand-700 border-brand-100"
                : "bg-white text-ink-700 border-line hover:border-ink-300",
            )}
          >
            {c.label}
            <ChevronDown className="size-3 text-ink-400" />
          </button>
        ))}
        <button className="h-8 px-3 rounded-md text-[13px] inline-flex items-center gap-1 border border-line bg-white text-ink-700">
          环保等级 <ChevronDown className="size-3 text-ink-400" />
        </button>
        <button className="h-8 px-3 rounded-md text-[13px] inline-flex items-center gap-1 border border-line bg-white text-ink-700">
          防火等级 <ChevronDown className="size-3 text-ink-400" />
        </button>
        <button className="h-8 px-3 rounded-md text-[13px] inline-flex items-center gap-1 border border-line bg-white text-ink-700">
          价格区间 <ChevronDown className="size-3 text-ink-400" />
        </button>
        <button className="h-8 px-3 rounded-md text-[13px] inline-flex items-center gap-1 border border-line bg-white text-ink-700">
          更多筛选 <ChevronDown className="size-3 text-ink-400" />
        </button>
        <button className="h-8 px-3 rounded-md text-[13px] text-ink-500 hover:text-ink-800 ml-auto">
          清空筛选
        </button>
      </div>

      <div className="mt-5 grid grid-cols-12 gap-5">
        {/* Side */}
        <div className="col-span-3 xl:col-span-2 space-y-1">
          <Card className="p-2">
            {sideTabs.map((s, i) => (
              <button
                key={s.label}
                className={cn(
                  "w-full flex items-center justify-between h-9 px-3 rounded-md text-[13px]",
                  i === 0
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-ink-700 hover:bg-surface-subtle",
                )}
              >
                <span>{s.label}</span>
                <span className="text-[11.5px] text-ink-400 tabular-nums">
                  {s.count.toLocaleString()}
                </span>
              </button>
            ))}
          </Card>
          <Card className="p-2">
            <div className="px-3 pt-2 pb-1.5 text-[11.5px] text-ink-400">
              快速筛选
            </div>
            {quickFilters.map((q) => (
              <button
                key={q}
                className="w-full flex items-center justify-between h-9 px-3 rounded-md text-[13px] text-ink-700 hover:bg-surface-subtle"
              >
                <span className="inline-flex items-center gap-2">
                  <span className="size-3.5 rounded bg-brand-100" />
                  {q}
                </span>
                <ChevronDown className="size-3.5 -rotate-90 text-ink-400" />
              </button>
            ))}
          </Card>
        </div>

        {/* Content */}
        <div className="col-span-9 xl:col-span-10 space-y-4">
          <div className="flex items-center justify-between text-[13px] text-ink-600">
            <div>
              共 <span className="text-ink-900 font-medium">{list.length.toLocaleString()}</span>{" "}
              个材料
            </div>
            <div className="flex items-center gap-2">
              <button className="h-8 px-3 inline-flex items-center gap-1 rounded-md bg-white border border-line text-[12.5px]">
                推荐排序 <ChevronDown className="size-3 text-ink-400" />
              </button>
              <div className="inline-flex bg-surface-subtle rounded-md p-0.5">
                <button className="size-7 inline-flex items-center justify-center rounded bg-white shadow-sm text-ink-800">
                  <LayoutGrid className="size-3.5" />
                </button>
                <button className="size-7 inline-flex items-center justify-center rounded text-ink-500">
                  <List className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {list.map((m) => {
              const sup = findSupplier(m.supplierId);
              const checked = selected.includes(m.id);
              return (
                <Card key={m.id} className="overflow-hidden flex flex-col">
                  <div className="relative aspect-square">
                    <MaterialThumb
                      seed={m.id}
                      category={m.category}
                      className="w-full h-full"
                    />
                    <button
                      onClick={() => toggle(m.id)}
                      className={cn(
                        "absolute top-2 left-2 size-5 rounded inline-flex items-center justify-center text-white text-[11px] border",
                        checked
                          ? "bg-brand-600 border-brand-700"
                          : "bg-white/85 backdrop-blur border-line text-transparent hover:text-ink-300",
                      )}
                    >
                      ✓
                    </button>
                    <button className="absolute top-2 right-2 text-white/95 hover:text-warn-500">
                      <Star className="size-4" />
                    </button>
                  </div>
                  <div className="p-3 flex-1 flex flex-col">
                    <div className="text-[13px] font-medium text-ink-900 truncate">
                      {m.name}
                    </div>
                    <div className="mt-1.5 grid grid-cols-3 gap-x-2 gap-y-0.5 text-[10.5px] text-ink-500">
                      <span>规格</span>
                      <span className="col-span-2 text-ink-700 truncate">
                        {m.spec}
                      </span>
                      <span>表面</span>
                      <span className="col-span-2 text-ink-700 truncate">
                        {m.surface}
                      </span>
                      <span>单价</span>
                      <span className="col-span-2 text-ink-700">
                        ¥{m.price} /{m.unit}
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {m.tags.slice(0, 2).map((t) => (
                        <Badge key={t} tone="subtle">
                          {t}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-[11px] text-ink-500">
                      <span className="size-1.5 rounded-full bg-brand-500" />
                      {sup?.name}
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-1.5">
                      <Link href={`/materials/${m.id}`}>
                        <Button block size="sm" variant="outline">
                          查看详情
                        </Button>
                      </Link>
                      <Button size="sm" variant="primary">
                        应用到项目 ▾
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom selection bar */}
      {selected.length > 0 && (
        <div className="fixed bottom-4 left-[232px] right-6 z-30 mx-auto max-w-[1240px]">
          <Card className="shadow-elevated">
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="text-[13px] text-ink-700">
                已选择{" "}
                <span className="font-semibold text-ink-900">
                  {selected.length}
                </span>{" "}
                个材料
              </div>
              <button
                onClick={() => setSelected([])}
                className="text-[12px] text-ink-500 hover:text-ink-800"
              >
                清空
              </button>
              <div className="flex-1 flex items-center gap-2 overflow-x-auto">
                {selected.map((id) => {
                  const m = materials.find((x) => x.id === id)!;
                  return (
                    <div
                      key={id}
                      className="flex items-center gap-2 h-10 pr-2 pl-1 rounded-md bg-surface-subtle border border-line shrink-0"
                    >
                      <MaterialThumb
                        seed={m.id}
                        category={m.category}
                        className="size-8 rounded"
                      />
                      <div className="text-[12px]">
                        <div className="text-ink-900 truncate max-w-[120px]">
                          {m.name}
                        </div>
                        <div className="text-ink-500">¥{m.price} /m²</div>
                      </div>
                      <button
                        onClick={() => toggle(id)}
                        className="text-ink-400 hover:text-ink-700"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
              <label className="flex items-center gap-1.5 text-[12.5px] text-ink-700">
                <input type="checkbox" className="accent-brand-600" /> 对比模式
              </label>
              <Link href="/compare">
                <Button variant="primary">
                  对比所选材料（{selected.length}）
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

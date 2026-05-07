"use client";

import { useState } from "react";
import { ArrowLeftRight, Repeat, Check, Sparkles, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialThumb } from "@/components/ui/material-thumb";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Scene } from "@/components/ui/scene";
import {
  comparisons,
  findMaterial,
  findSupplier,
  materials,
} from "@/lib/mock";
import { cn, formatCurrency } from "@/lib/utils";

const wallPalette: Record<string, string> = {
  m_yunwu_grey: "#9DAE9D",
  m_mibai_dong: "#D8CFB8",
  m_shenhui_wood: "#5B5247",
  m_terrazzo_grey: "#A2A29B",
};

export default function ComparePage() {
  const baseline = findMaterial("m_yunwu_grey")!;
  const [selectedId, setSelectedId] = useState(comparisons[0].candidateMaterialId);
  const candidate = findMaterial(selectedId)!;

  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs items={[{ label: "材料库", href: "/materials" }, { label: "相似材料比价" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900 inline-flex items-center gap-2">
            相似材料比价
            <Badge tone="brand">AI 推荐</Badge>
          </h1>
          <p className="text-[13px] text-ink-500 mt-1">
            为当前选用材料推荐相似度高、价格更优、交期合适的替代方案
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" iconLeft={<Eye className="size-4" />}>
            查看报价影响
          </Button>
          <Button variant="primary" iconLeft={<Repeat className="size-4" />}>
            一键替换为推荐材料
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left: current */}
        <Card className="col-span-12 lg:col-span-3 p-4">
          <div className="text-[12.5px] text-ink-500">当前选用材料</div>
          <MaterialThumb
            seed={baseline.id}
            category={baseline.category}
            className="mt-3 w-full aspect-square rounded-lg"
          />
          <div className="mt-3 text-[14px] font-medium text-ink-900">
            {baseline.name}
          </div>
          <div className="text-[12px] text-ink-500 mt-0.5">{baseline.spec}</div>
          <div className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-3 text-[12px]">
            <Row label="单价" value={`¥${baseline.price} /m²`} accent />
            <Row label="环保" value={baseline.ecoLevel} />
            <Row label="防火" value={baseline.fireLevel} />
            <Row label="交期" value={`${baseline.leadDays} 天`} />
            <Row label="供应商" value={findSupplier(baseline.supplierId)!.name} />
          </div>
        </Card>

        {/* Center: scene preview */}
        <Card className="col-span-12 lg:col-span-6 p-0 overflow-hidden">
          <div className="relative aspect-[16/10]">
            <div className="absolute inset-0 grid grid-cols-2">
              <div className="relative border-r border-white/40">
                <Scene
                  wallColor={wallPalette[baseline.id]}
                  className="w-full h-full"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/55 text-white text-[11px]">
                  当前材料
                </span>
              </div>
              <div className="relative">
                <Scene
                  wallColor={wallPalette[candidate.id] ?? "#A2A29B"}
                  className="w-full h-full"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-brand-600 text-white text-[11px]">
                  推荐材料
                </span>
              </div>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3 h-8 rounded-full bg-white/95 border border-line shadow-card text-[12.5px] text-ink-700">
              <ArrowLeftRight className="size-4 text-brand-600" />
              区域效果预览：墙面（128.6 m²）
            </div>
          </div>
          <div className="grid grid-cols-3 border-t border-line">
            <Compare label="单价对比" left={`¥${baseline.price}`} right={`¥${candidate.price}`} delta={candidate.price - baseline.price} unit="元/m²" />
            <Compare label="交期对比" left={`${baseline.leadDays} 天`} right={`${candidate.leadDays} 天`} delta={candidate.leadDays - baseline.leadDays} unit="天" />
            <Compare label="预计影响（128.6 m²）" left={`¥${(baseline.price * 128.6).toLocaleString("zh-CN")}`} right={`¥${(candidate.price * 128.6).toLocaleString("zh-CN")}`} delta={(candidate.price - baseline.price) * 128.6} unit="元" highlight />
          </div>
        </Card>

        {/* Right: candidate detail */}
        <Card className="col-span-12 lg:col-span-3 p-4">
          <div className="flex items-center justify-between">
            <div className="text-[12.5px] text-ink-500">推荐替代材料</div>
            <Badge tone="brand" className="inline-flex items-center gap-1">
              <Sparkles className="size-3" /> AI Pick
            </Badge>
          </div>
          <MaterialThumb
            seed={candidate.id}
            category={candidate.category}
            className="mt-3 w-full aspect-square rounded-lg"
          />
          <div className="mt-3 text-[14px] font-medium text-ink-900">
            {candidate.name}
          </div>
          <div className="text-[12px] text-ink-500 mt-0.5">{candidate.spec}</div>
          <div className="mt-3 grid grid-cols-2 gap-y-1.5 gap-x-3 text-[12px]">
            <Row label="单价" value={`¥${candidate.price} /m²`} accent />
            <Row label="环保" value={candidate.ecoLevel} />
            <Row label="防火" value={candidate.fireLevel} />
            <Row label="交期" value={`${candidate.leadDays} 天`} />
            <Row label="供应商" value={findSupplier(candidate.supplierId)!.name} />
          </div>
          <Button block variant="primary" className="mt-4" iconLeft={<Check className="size-4" />}>
            采用此材料
          </Button>
        </Card>
      </div>

      {/* Recommendations table */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-ink-900">推荐替代材料</h3>
          <div className="text-[12px] text-ink-500">基于纹理相似度、价格、交期、环保等级综合评分</div>
        </div>
        <div className="rounded-lg border border-line overflow-hidden">
          <table className="w-full text-[13px]">
            <thead>
              <tr className="bg-surface-subtle text-ink-500 text-[12px]">
                <th className="text-left px-4 h-10 font-medium">材料</th>
                <th className="text-left px-4 h-10 font-medium">相似度</th>
                <th className="text-right px-4 h-10 font-medium">单价</th>
                <th className="text-right px-4 h-10 font-medium">预计节省</th>
                <th className="text-left px-4 h-10 font-medium">环保 / 防火</th>
                <th className="text-left px-4 h-10 font-medium">交期</th>
                <th className="text-left px-4 h-10 font-medium">备注</th>
                <th className="text-center px-4 h-10 font-medium w-32">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {comparisons.map((c) => {
                const m = findMaterial(c.candidateMaterialId)!;
                const isActive = m.id === selectedId;
                return (
                  <tr
                    key={c.id}
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "bg-brand-50/40"
                        : "hover:bg-surface-subtle/40",
                    )}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <MaterialThumb seed={m.id} category={m.category} className="size-12 rounded-md shrink-0" />
                        <div>
                          <div className="text-ink-900 font-medium">{m.name}</div>
                          <div className="text-[11.5px] text-ink-500 mt-0.5">
                            {m.category} · {m.spec}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-1.5 rounded-full bg-ink-200 overflow-hidden">
                          <div
                            className="h-full bg-brand-500 rounded-full"
                            style={{ width: `${c.similarity * 100}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-ink-700 tabular-nums">
                          {Math.round(c.similarity * 100)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-ink-900">
                      ¥{m.price}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-brand-700 font-medium tabular-nums">
                        {formatCurrency(c.estSavings)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Badge tone="brand">{m.ecoLevel}</Badge>
                        <Badge tone="info">{m.fireLevel}</Badge>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink-700">{m.leadDays} 天</td>
                    <td className="px-4 py-3 text-ink-500 max-w-[260px]">
                      {c.notes}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Button
                        size="sm"
                        variant={isActive ? "primary" : "outline"}
                        onClick={() => setSelectedId(m.id)}
                      >
                        {isActive ? "已选 ✓" : "查看效果"}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Other candidates */}
      <Card className="p-5">
        <h3 className="text-[15px] font-semibold text-ink-900">同类材料</h3>
        <div className="mt-3 grid grid-cols-5 gap-3">
          {materials
            .filter((m) => m.category === baseline.category && m.id !== baseline.id)
            .slice(0, 5)
            .map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedId(m.id)}
                className={cn(
                  "rounded-lg border overflow-hidden text-left transition",
                  m.id === selectedId
                    ? "border-brand-500 ring-1 ring-brand-500/30"
                    : "border-line hover:border-ink-300",
                )}
              >
                <MaterialThumb seed={m.id} category={m.category} className="w-full aspect-[5/3]" />
                <div className="p-2.5">
                  <div className="text-[12.5px] text-ink-900 truncate">{m.name}</div>
                  <div className="text-[11px] text-ink-500 mt-0.5">¥{m.price}/m²</div>
                </div>
              </button>
            ))}
        </div>
      </Card>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <>
      <div className="text-ink-500">{label}</div>
      <div className={cn("text-right", accent ? "text-brand-700 font-semibold" : "text-ink-900")}>
        {value}
      </div>
    </>
  );
}

function Compare({
  label,
  left,
  right,
  delta,
  unit,
  highlight,
}: {
  label: string;
  left: string;
  right: string;
  delta: number;
  unit: string;
  highlight?: boolean;
}) {
  const better = delta < 0;
  return (
    <div className={cn("p-4 border-r border-line last:border-0", highlight && "bg-brand-50/40")}>
      <div className="text-[12px] text-ink-500">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-[13.5px]">
        <span className="text-ink-700">{left}</span>
        <ArrowLeftRight className="size-3.5 text-ink-400" />
        <span className="text-ink-900 font-medium">{right}</span>
      </div>
      <div className={cn("mt-1 text-[12px]", better ? "text-brand-700" : delta > 0 ? "text-warn-600" : "text-ink-500")}>
        {delta === 0 ? "持平" : `${delta > 0 ? "+" : ""}${delta.toLocaleString("zh-CN")} ${unit}`}
      </div>
    </div>
  );
}

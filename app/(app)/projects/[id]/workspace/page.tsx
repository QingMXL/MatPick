"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Save,
  Share2,
  Undo2,
  Redo2,
  MoreHorizontal,
  Plus,
  ZoomIn,
  ZoomOut,
  Minimize2,
  Maximize2,
  Sparkles,
  Pencil,
  Hand,
  RefreshCw,
  Check,
  ShoppingCart,
  FileText,
  ChevronDown,
  Star,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Scene } from "@/components/ui/scene";
import { MaterialThumb } from "@/components/ui/material-thumb";
import {
  detectedAreas,
  findProject,
  materials,
  findSupplier,
} from "@/lib/mock";
import { formatNumber, cn } from "@/lib/utils";
import type { AreaKind, DetectedArea } from "@/lib/types";

const areaIconColor: Record<string, string> = {
  墙面: "bg-brand-100 text-brand-700",
  地面: "bg-info-50 text-info-500",
  顶面: "bg-warn-50 text-warn-600",
  柜体: "bg-purple-100 text-purple-700",
  软装: "bg-pink-100 text-pink-700",
  立柱: "bg-ink-100 text-ink-700",
  踢脚线: "bg-ink-100 text-ink-700",
  软装背景: "bg-pink-100 text-pink-700",
};

const wallPalette: Record<string, string> = {
  m_yunwu_grey: "#9DAE9D",
  m_yudu_white: "#E1DDD2",
  m_mibai_dong: "#D8CFB8",
  m_shenhui_wood: "#5B5247",
  m_oak_straight: "#C8A47A",
  m_terrazzo_grey: "#A2A29B",
  m_brass_steel: "#7B6447",
  m_walnut_panel: "#5C3F2A",
};

export default function WorkspacePage() {
  const params = useParams<{ id: string }>();
  const project = findProject(params.id);
  if (!project) notFound();

  const areas: DetectedArea[] = detectedAreas[params.id] ?? detectedAreas.p_hilton_hangzhou;
  const [activeAreaId, setActiveAreaId] = useState(areas[0].id);
  const [activeMaterialId, setActiveMaterialId] = useState("m_yunwu_grey");
  const [textureScale, setTextureScale] = useState(100);
  const [textureRotation, setTextureRotation] = useState(0);
  const [surface, setSurface] = useState<"哑光" | "半哑" | "亮光">("哑光");
  const [comparePreview, setComparePreview] = useState(true);
  const [filterCat, setFilterCat] = useState<"全部分类" | string>("全部分类");

  const activeArea = areas.find((a) => a.id === activeAreaId)!;
  const activeMaterial = materials.find((m) => m.id === activeMaterialId)!;

  const filteredMaterials = useMemo(
    () =>
      filterCat === "全部分类"
        ? materials
        : materials.filter((m) => m.category === filterCat),
    [filterCat],
  );

  const subtotal = activeArea.area * activeMaterial.price;

  return (
    <div className="px-6 py-5 max-w-[1640px] mx-auto">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: "项目", href: "/projects" },
            { label: project.name, href: `/projects/${params.id}` },
            { label: "大堂公区 · 方案A" },
          ]}
        />
        <div className="flex items-center gap-1.5">
          <button className="size-9 rounded-lg border border-line bg-white inline-flex items-center justify-center text-ink-500 hover:text-ink-800">
            <Undo2 className="size-4" />
          </button>
          <button className="size-9 rounded-lg border border-line bg-white inline-flex items-center justify-center text-ink-500 hover:text-ink-800">
            <Redo2 className="size-4" />
          </button>
          <Button variant="outline" iconLeft={<Save className="size-4" />}>
            保存方案
          </Button>
          <Button variant="primary" iconLeft={<Share2 className="size-4" />}>
            分享方案
          </Button>
          <button className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-line bg-white hover:border-ink-300">
            <MoreHorizontal className="size-4 text-ink-500" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4">
        {/* LEFT: Area list */}
        <Card className="col-span-12 lg:col-span-3 p-0 flex flex-col">
          <div className="px-4 py-4 border-b border-line">
            <div className="flex items-center gap-3">
              <div className="w-12 h-9 rounded overflow-hidden border border-line shrink-0">
                <Scene
                  wallColor="#9DAE9D"
                  floorColor="#9F9486"
                  ceilingColor="#E8E4DA"
                  className="w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[13.5px] font-medium text-ink-900 truncate">
                  {project.name}
                </div>
                <div className="text-[11.5px] text-ink-500 inline-flex items-center gap-1">
                  大堂公区 · 方案A <ChevronDown className="size-3" />
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 text-[11.5px]">
              <div>
                <div className="text-ink-500">设计师</div>
                <div className="text-ink-800 mt-0.5">林设计</div>
              </div>
              <div>
                <div className="text-ink-500">创建时间</div>
                <div className="text-ink-800 mt-0.5">2025-05-10</div>
              </div>
              <div>
                <div className="text-ink-500">方案状态</div>
                <div className="text-brand-700 mt-0.5">● 进行中</div>
              </div>
            </div>
          </div>

          <div className="px-3 pt-3 flex items-center gap-1">
            {(["识别区域 (AI)", "图层"] as const).map((t, i) => (
              <button
                key={t}
                className={cn(
                  "px-2.5 h-7 rounded-md text-[12.5px]",
                  i === 0
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-500 hover:bg-surface-subtle",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="px-3 mt-3">
            <div className="rounded-lg bg-surface-subtle border border-line p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Check className="size-4 text-brand-600" />
                <div>
                  <div className="text-[12.5px] font-medium text-ink-900">
                    AI识别完成
                  </div>
                  <div className="text-[11px] text-ink-500 mt-0.5">
                    共识别 12 个区域
                  </div>
                </div>
              </div>
              <Button size="sm" variant="outline" iconLeft={<RefreshCw className="size-3.5" />}>
                重新识别
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5">
            {areas.slice(0, 5).map((a) => (
              <button
                key={a.id}
                onClick={() => setActiveAreaId(a.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-2 rounded-lg text-left",
                  activeAreaId === a.id
                    ? "bg-brand-50 ring-1 ring-brand-100"
                    : "hover:bg-surface-subtle",
                )}
              >
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-8 h-8 rounded-md",
                    areaIconColor[a.kind] ?? "bg-surface-subtle text-ink-700",
                  )}
                >
                  <SmallIcon kind={a.kind} />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-ink-900">
                    {a.kind}
                  </div>
                  <div className="text-[11px] text-ink-500">
                    {formatNumber(a.area, 1)} m²
                  </div>
                </div>
                {activeAreaId === a.id ? (
                  <span className="inline-flex items-center gap-1 text-[11px] text-brand-700">
                    已选中
                    <Pencil className="size-3" />
                  </span>
                ) : (
                  <span className="text-[11px] text-ink-400">可编辑</span>
                )}
                <button className="text-ink-400 hover:text-ink-700 px-1">
                  ⋮
                </button>
              </button>
            ))}
          </div>

          <div className="px-3 pb-3">
            <Button
              block
              variant="outline"
              iconLeft={<Plus className="size-4" />}
            >
              添加自定义区域
            </Button>
          </div>
        </Card>

        {/* CENTER: Canvas */}
        <Card className="col-span-12 lg:col-span-6 p-0 overflow-hidden flex flex-col">
          <div className="relative flex-1 min-h-[520px]">
            <Scene
              wallColor={wallPalette[activeMaterialId] ?? "#9DAE9D"}
              floorColor="#9F9486"
              ceilingColor="#E8E4DA"
              className="absolute inset-0"
            />
            {/* Selection overlays */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full"
            >
              {areas.map((a) => {
                const points = a.polygon.map((p) => `${p.x},${p.y}`).join(" ");
                const isActive = a.id === activeAreaId;
                return (
                  <g key={a.id}>
                    <polygon
                      points={points}
                      fill={isActive ? "rgba(31,107,71,0.18)" : "transparent"}
                      stroke={isActive ? "#1F6B47" : "rgba(255,255,255,0.55)"}
                      strokeWidth={isActive ? 0.4 : 0.25}
                      strokeDasharray={isActive ? "0" : "1.4 1.2"}
                      vectorEffect="non-scaling-stroke"
                      style={{ cursor: "pointer" }}
                      onClick={() => setActiveAreaId(a.id)}
                    />
                  </g>
                );
              })}
            </svg>
            {/* Active label + handles */}
            {(() => {
              const cx =
                activeArea.polygon.reduce((s, p) => s + p.x, 0) /
                activeArea.polygon.length;
              const cy =
                activeArea.polygon.reduce((s, p) => s + p.y, 0) /
                activeArea.polygon.length;
              return (
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-2 h-6 rounded bg-brand-600 text-white text-[11px] font-medium shadow-md"
                  style={{ left: `${cx}%`, top: `${cy}%` }}
                >
                  {activeArea.kind} {formatNumber(activeArea.area, 1)} m²
                </div>
              );
            })()}
            {/* Top status pills */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md bg-white/95 border border-line text-[12px] text-ink-800">
                <Check className="size-3.5 text-brand-600" />
                AI识别完成
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md bg-white/95 border border-line text-[12px] text-ink-800">
                <Hand className="size-3.5 text-ink-500" />
                手动微调
              </span>
            </div>
            {/* Tools */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 bg-white/95 border border-line rounded-lg p-1">
              <ToolBtn icon={<ZoomIn className="size-4" />} />
              <ToolBtn icon={<ZoomOut className="size-4" />} />
              <ToolBtn icon={<Maximize2 className="size-4" />} />
              <ToolBtn icon={<Minimize2 className="size-4" />} />
            </div>
            {/* Compare preview */}
            <div className="absolute bottom-3 left-3 bg-white/95 border border-line rounded-lg p-2 w-[260px] shadow-card">
              <label className="flex items-center justify-between text-[12px] text-ink-700">
                <span>对比预览</span>
                <span
                  className={cn(
                    "relative inline-flex h-4 w-7 rounded-full transition-colors",
                    comparePreview ? "bg-brand-600" : "bg-ink-300",
                  )}
                  onClick={() => setComparePreview((v) => !v)}
                  role="switch"
                  aria-checked={comparePreview}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 size-3 bg-white rounded-full transition-transform",
                      comparePreview ? "translate-x-3.5" : "translate-x-0.5",
                    )}
                  />
                </span>
              </label>
              {comparePreview && (
                <div className="mt-2 grid grid-cols-2 gap-1.5">
                  <div className="relative aspect-[16/10] rounded overflow-hidden border border-line">
                    <Scene
                      wallColor="#9DAE9D"
                      floorColor="#9F9486"
                      ceilingColor="#E8E4DA"
                      className="w-full h-full"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/55 text-white text-[10px]">
                      替换前
                    </span>
                  </div>
                  <div className="relative aspect-[16/10] rounded overflow-hidden border border-line">
                    <Scene
                      wallColor={wallPalette[activeMaterialId] ?? "#9DAE9D"}
                      floorColor="#9F9486"
                      ceilingColor="#E8E4DA"
                      className="w-full h-full"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-brand-600 text-white text-[10px]">
                      替换后
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom price bar */}
          <div className="border-t border-line bg-white px-4 py-3 flex items-center gap-5">
            <div className="flex items-center gap-3">
              <MaterialThumb
                seed={activeMaterial.id}
                category={activeMaterial.category}
                className="w-12 h-12 rounded-md shrink-0"
              />
              <div>
                <div className="text-[13.5px] font-medium text-ink-900">
                  {activeMaterial.name}
                </div>
                <div className="text-[11.5px] text-ink-500 mt-0.5">
                  {activeMaterial.spec} · {activeMaterial.surface} ·{" "}
                  {activeMaterial.ecoLevel} / {activeMaterial.fireLevel}
                </div>
                <button className="text-[11.5px] text-brand-700 hover:underline mt-0.5">
                  更换材料 ›
                </button>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-4 text-center">
              <Stat label="面积" value={`${formatNumber(activeArea.area, 1)} m²`} />
              <Stat label="单价" value={`¥ ${activeMaterial.price} /m²`} />
              <Stat
                label="预计总价"
                value={`¥ ${subtotal.toLocaleString("zh-CN", { maximumFractionDigits: 0 })}`}
                hint="不含税费及运费"
                accent
              />
            </div>
            <div className="flex items-center gap-2">
              <Link href={`/projects/${params.id}/quote`}>
                <Button variant="outline" iconLeft={<FileText className="size-4" />}>
                  生成报价
                </Button>
              </Link>
              <Button variant="primary" iconLeft={<ShoppingCart className="size-4" />}>
                加入订货清单
              </Button>
            </div>
          </div>
        </Card>

        {/* RIGHT: material library */}
        <Card className="col-span-12 lg:col-span-3 p-0 flex flex-col">
          <div className="px-4 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <button className="px-2 h-7 rounded-md text-[13px] bg-brand-50 text-brand-700">
                材料库
              </button>
              <button className="px-2 h-7 rounded-md text-[13px] text-ink-500 hover:bg-surface-subtle">
                我的收藏
              </button>
            </div>
            <Link
              href="/materials"
              className="text-[12px] text-brand-700 hover:underline"
            >
              更多
            </Link>
          </div>
          <div className="px-4 pt-3 flex items-center gap-1.5">
            <FilterChip label="全部分类" onClick={() => setFilterCat("全部分类")} active={filterCat === "全部分类"} />
            <FilterChip label="全部材质" />
            <FilterChip label="更多筛选" />
            <button className="ml-auto inline-flex items-center justify-center size-7 rounded-md text-ink-500 hover:bg-surface-subtle">
              <Filter className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 pt-3 pb-3 space-y-2.5">
            {filteredMaterials.slice(0, 6).map((m) => {
              const sup = findSupplier(m.supplierId);
              const selected = m.id === activeMaterialId;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveMaterialId(m.id)}
                  className={cn(
                    "w-full text-left rounded-lg border p-3 transition-colors flex items-start gap-3",
                    selected
                      ? "border-brand-500 ring-1 ring-brand-500/30 bg-brand-50/30"
                      : "border-line hover:border-ink-300",
                  )}
                >
                  <MaterialThumb
                    seed={m.id}
                    category={m.category}
                    className="w-16 h-16 rounded-md shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] font-medium text-ink-900 truncate">
                        {m.name}
                      </div>
                      {selected ? (
                        <span className="text-[11px] text-brand-700 inline-flex items-center gap-0.5">
                          <Check className="size-3" />
                          已选中
                        </span>
                      ) : (
                        <Star className="size-3.5 text-ink-300 hover:text-warn-500" />
                      )}
                    </div>
                    <div className="mt-1.5 grid grid-cols-3 gap-x-2 gap-y-0.5 text-[10.5px] text-ink-500">
                      <span>规格</span>
                      <span className="col-span-2 text-ink-700 truncate">
                        {m.spec}
                      </span>
                      <span>表面</span>
                      <span className="col-span-2 text-ink-700">
                        {m.surface}
                      </span>
                      <span>单价</span>
                      <span className="col-span-2 text-ink-700">
                        ¥{m.price} /m²
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      <Badge tone="subtle">环保等级 {m.ecoLevel}</Badge>
                      <Badge tone="subtle">防火等级 {m.fireLevel}</Badge>
                      <Badge tone="neutral">供应商 {sup?.name.slice(0, 4)}</Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Replace control */}
          <div className="border-t border-line p-3 space-y-3 bg-surface-subtle/50">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-semibold text-ink-900">
                替换控制
              </span>
              <span className="text-[11px] text-ink-500">
                应用到：{activeArea.kind} ({formatNumber(activeArea.area, 1)} m²) ▾
              </span>
            </div>
            <Button block variant="primary" iconLeft={<Sparkles className="size-4" />}>
              一键替换材质
            </Button>
            <SliderRow
              label="纹理缩放"
              value={textureScale}
              onChange={setTextureScale}
              suffix="%"
            />
            <SliderRow
              label="纹理旋转"
              value={textureRotation}
              onChange={setTextureRotation}
              max={360}
              suffix="°"
            />
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-ink-500">表面处理</span>
              <div className="inline-flex bg-white border border-line rounded-md p-0.5">
                {(["哑光", "半哑", "亮光"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSurface(s)}
                    className={cn(
                      "px-2.5 h-6 text-[12px] rounded",
                      surface === s
                        ? "bg-brand-50 text-brand-700"
                        : "text-ink-500 hover:text-ink-700",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-ink-500">拼接方式</span>
              <button className="text-ink-800 inline-flex items-center gap-1">
                自然拼接 <ChevronDown className="size-3" />
              </button>
            </div>
            <div className="flex items-center justify-between text-[12px]">
              <span className="text-ink-500">显示材质细节</span>
              <span className="relative inline-flex h-4 w-7 rounded-full bg-brand-600">
                <span className="absolute top-0.5 left-0.5 size-3 bg-white rounded-full translate-x-3" />
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function ToolBtn({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="size-7 inline-flex items-center justify-center rounded text-ink-600 hover:bg-surface-subtle">
      {icon}
    </button>
  );
}

function Stat({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[11.5px] text-ink-500">{label}</div>
      <div
        className={cn(
          "text-[18px] font-semibold tabular-nums",
          accent ? "text-brand-700" : "text-ink-900",
        )}
      >
        {value}
      </div>
      {hint && <div className="text-[10.5px] text-ink-400">{hint}</div>}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-7 px-2 inline-flex items-center gap-1 rounded-md text-[12px] border",
        active
          ? "bg-brand-50 text-brand-700 border-brand-100"
          : "bg-white text-ink-700 border-line hover:border-ink-300",
      )}
    >
      {label}
      <ChevronDown className="size-3 text-ink-400" />
    </button>
  );
}

function SliderRow({
  label,
  value,
  onChange,
  max = 100,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  max?: number;
  suffix?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[12px] text-ink-500 w-16 shrink-0">{label}</span>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="flex-1 cursor-pointer"
        style={
          {
            ["--val" as string]: `${(value / max) * 100}%`,
          } as React.CSSProperties
        }
      />
      <span className="text-[12px] text-ink-700 tabular-nums w-10 text-right">
        {value}
        {suffix}
      </span>
      <button
        onClick={() => onChange(label === "纹理缩放" ? 100 : 0)}
        className="text-ink-400 hover:text-ink-700"
        title="重置"
      >
        <RefreshCw className="size-3.5" />
      </button>
    </div>
  );
}

function SmallIcon({ kind }: { kind: AreaKind }) {
  const map: Record<AreaKind, React.ReactNode> = {
    墙面: <span className="text-[11px]">墙</span>,
    地面: <span className="text-[11px]">地</span>,
    顶面: <span className="text-[11px]">顶</span>,
    柜体: <span className="text-[11px]">柜</span>,
    软装: <span className="text-[11px]">软</span>,
    立柱: <span className="text-[11px]">柱</span>,
    踢脚线: <span className="text-[11px]">踢</span>,
    软装背景: <span className="text-[11px]">软</span>,
  };
  return <>{map[kind]}</>;
}

import Link from "next/link";
import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarStack } from "@/components/ui/avatar";
import { ProjectCover } from "@/components/ui/cover";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { projects } from "@/lib/mock";
import { formatNumber, relativeTime } from "@/lib/utils";

const tones = ["warm", "cool", "neutral", "dark"] as const;

export default function ProjectsPage() {
  return (
    <div className="px-8 py-6 space-y-5 max-w-[1640px] mx-auto">
      <Breadcrumbs items={[{ label: "项目" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900">项目</h1>
          <p className="text-[13px] text-ink-500 mt-1">
            管理你的酒店与商业空间设计项目
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" iconLeft={<Filter className="size-4" />}>
            筛选
          </Button>
          <Link href="/projects/p_hilton_hangzhou/upload">
            <Button variant="primary" iconLeft={<Plus className="size-4" />}>
              新建项目
            </Button>
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex items-center gap-3">
          <label className="flex-1 flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-line">
            <Search className="size-4 text-ink-400" />
            <input
              placeholder="搜索项目名称、城市、客户"
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-400"
            />
          </label>
          <SelectChip label="状态" options={["全部", "进行中", "报价中", "已完成"]} />
          <SelectChip
            label="阶段"
            options={["全部", "方案设计", "深化设计", "施工配合", "已完工"]}
          />
          <SelectChip label="城市" options={["全部", "杭州", "上海", "深圳", "广州", "成都", "北京", "厦门", "苏州"]} />
          <div className="w-px h-6 bg-line" />
          <div className="inline-flex bg-surface-subtle rounded-lg p-0.5">
            <button className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-white text-ink-800 shadow-sm">
              <LayoutGrid className="size-4" />
            </button>
            <button className="h-7 w-7 inline-flex items-center justify-center rounded-md text-ink-500 hover:text-ink-800">
              <List className="size-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* Status tabs */}
      <div className="flex items-center gap-6 border-b border-line text-[13.5px]">
        {[
          ["全部", projects.length, true],
          ["进行中", projects.filter((p) => p.status === "进行中").length],
          ["报价中", projects.filter((p) => p.status === "报价中").length],
          ["已完成", projects.filter((p) => p.status === "已完成").length],
        ].map(([label, count, active]) => (
          <button
            key={label as string}
            className={`relative pb-3 inline-flex items-center gap-1.5 ${active ? "text-ink-900 font-medium" : "text-ink-500 hover:text-ink-700"}`}
          >
            {label as string}
            <span className={`text-[12px] ${active ? "text-brand-700" : "text-ink-400"}`}>
              {count as number}
            </span>
            {(active as boolean) && (
              <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-brand-600 rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-5">
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            className="rounded-xl border border-line bg-white overflow-hidden hover:shadow-elevated transition-shadow"
          >
            <div className="aspect-[5/3] relative">
              <ProjectCover tone={tones[i % tones.length]} className="w-full h-full" />
              <Badge
                tone={
                  p.status === "进行中"
                    ? "success"
                    : p.status === "报价中"
                      ? "warn"
                      : p.status === "已完成"
                        ? "dark"
                        : "neutral"
                }
                className="absolute top-2.5 left-2.5 h-6 px-2"
              >
                {p.status}
              </Badge>
            </div>
            <div className="p-4">
              <div className="text-[14px] font-medium text-ink-900">{p.name}</div>
              <div className="mt-1 flex items-center gap-2 text-[11.5px] text-ink-500">
                <span className="px-1.5 py-0.5 rounded bg-surface-subtle border border-line">
                  {p.stage}
                </span>
                <span>{formatNumber(p.area, 1)} m²</span>
                <span className="text-ink-400">· {p.city}</span>
              </div>
              <div className="mt-2 text-[11.5px] text-ink-500">
                客户：<span className="text-ink-700">{p.client}</span>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-[10.5px] text-ink-400">
                  最后编辑 {relativeTime(p.lastEditedAt)}
                </div>
                <AvatarStack names={p.members} max={3} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function SelectChip({ label, options }: { label: string; options: string[] }) {
  return (
    <button className="h-9 px-3 inline-flex items-center gap-1.5 rounded-lg bg-white border border-line text-[13px] text-ink-700 hover:border-ink-300">
      <span className="text-ink-500">{label}</span>
      <span>{options[0]}</span>
      <svg className="size-3 text-ink-400" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 8L2.5 4h7L6 8z" />
      </svg>
    </button>
  );
}

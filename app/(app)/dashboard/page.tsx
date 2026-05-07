import Link from "next/link";
import {
  Plus,
  Upload,
  Library,
  Briefcase,
  ShoppingBag,
  ShoppingCart,
  CircleDollarSign,
  ChevronRight,
  Circle,
  ArrowUpRight,
  ImageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarStack } from "@/components/ui/avatar";
import { ProjectCover } from "@/components/ui/cover";
import { MaterialThumb } from "@/components/ui/material-thumb";
import {
  projects,
  materials,
  todos,
  messages,
  activity,
  calendarEvents,
} from "@/lib/mock";
import { formatNumber, relativeTime } from "@/lib/utils";

export default function DashboardPage() {
  const recentProjects = projects.slice(0, 4);
  const inProgress = projects.filter((p) => p.status === "进行中").length;
  const recentMaterials = materials.slice(0, 4);
  const favs = ["m_yunwu_grey", "m_yudu_white", "m_mibai_dong", "m_steel_skirt", "m_oak_straight"];

  return (
    <div className="px-8 py-6 space-y-6 max-w-[1640px] mx-auto">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] leading-tight font-semibold text-ink-900 flex items-center gap-2">
            欢迎回来，林设计{" "}
            <span aria-hidden className="text-2xl">👋</span>
          </h1>
          <p className="text-sm text-ink-500 mt-1.5">
            今天是 2025 年 5 月 10 日，星期六
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/projects">
            <Button variant="primary" iconLeft={<Plus className="size-4" />}>
              新建项目
            </Button>
          </Link>
          <Link href="/projects/p_hilton_hangzhou/upload">
            <Button variant="outline" iconLeft={<Upload className="size-4" />}>
              上传方案
            </Button>
          </Link>
          <Link href="/materials">
            <Button variant="outline" iconLeft={<Library className="size-4" />}>
              查看材料库
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT 8/12 */}
        <div className="col-span-12 xl:col-span-8 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard
              icon={<Briefcase className="size-5 text-brand-600" />}
              tone="brand"
              label="进行中项目"
              value={String(inProgress)}
              delta="较上周 +2"
            />
            <StatCard
              icon={<ShoppingBag className="size-5 text-warn-600" />}
              tone="warn"
              label="待确认报价"
              value="5"
              delta="较上周 +1"
            />
            <StatCard
              icon={<ShoppingCart className="size-5 text-info-500" />}
              tone="info"
              label="待下单材料"
              value="23"
              delta="较上周 -3"
            />
            <StatCard
              icon={<CircleDollarSign className="size-5 text-brand-600" />}
              tone="brand"
              label="本月节省成本"
              value="¥ 47,448"
              delta="较上月 +12%"
            />
          </div>

          {/* Recent Projects */}
          <Card>
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">
                最近项目
              </h3>
              <div className="flex items-center gap-3">
                <SegmentedTabs
                  options={[
                    { label: "全部", count: 8, active: true },
                    { label: "进行中", count: 5 },
                    { label: "已完成", count: 3 },
                  ]}
                />
                <Link
                  href="/projects"
                  className="text-[13px] text-brand-700 hover:underline underline-offset-2 inline-flex items-center"
                >
                  查看全部 <ChevronRight className="size-3.5" />
                </Link>
              </div>
            </div>
            <div className="px-5 pb-5 pt-4 grid grid-cols-4 gap-4">
              {recentProjects.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/projects/${p.id}`}
                  className="group rounded-xl border border-line bg-white overflow-hidden hover:shadow-elevated transition-shadow"
                >
                  <div className="aspect-[5/3] relative">
                    <ProjectCover
                      tone={(["warm", "cool", "neutral", "dark"] as const)[i % 4]}
                      className="w-full h-full"
                    />
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
                  <div className="p-3.5">
                    <div className="text-[13.5px] font-medium text-ink-900 truncate">
                      {p.name}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-[11.5px] text-ink-500">
                      <span className="px-1.5 py-0.5 rounded bg-surface-subtle border border-line">
                        {p.stage}
                      </span>
                      <span>{formatNumber(p.area, 1)} m²</span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-[10.5px] text-ink-400">
                        最后编辑 {relativeTime(p.lastEditedAt)}
                      </div>
                      <AvatarStack names={p.members} max={2} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Activity + Calendar */}
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center justify-between px-5 pt-5">
                <h3 className="text-[15px] font-semibold text-ink-900">项目动态</h3>
                <Link
                  href="/projects"
                  className="text-[13px] text-brand-700 hover:underline underline-offset-2"
                >
                  查看全部
                </Link>
              </div>
              <ul className="px-5 pb-5 pt-4 space-y-4">
                {activity.map((a) => (
                  <li key={a.id} className="flex gap-3">
                    <div className="pt-1 flex flex-col items-center gap-1">
                      <span
                        className={`size-2 rounded-full ${a.kind === "system" ? "bg-info-500" : "bg-brand-500"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="text-[13px] text-ink-800 leading-relaxed">
                        <span className="text-ink-500 mr-1">{a.actor}</span>
                        {a.text}
                      </div>
                      <div className="text-[11px] text-ink-400 mt-0.5">
                        {relativeTime(a.at)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card>
              <div className="flex items-center justify-between px-5 pt-5">
                <h3 className="text-[15px] font-semibold text-ink-900">
                  项目交付日历
                </h3>
                <div className="text-[13px] text-ink-500 flex items-center gap-2">
                  <button className="hover:text-brand-700">‹</button>
                  <span>2025年5月</span>
                  <button className="hover:text-brand-700">›</button>
                </div>
              </div>
              <div className="px-5 pb-5 pt-4">
                <CalendarMini />
                <ul className="mt-4 divide-y divide-line border-t border-line">
                  {calendarEvents.map((e) => (
                    <li
                      key={e.project + e.label}
                      className="flex items-center justify-between py-2.5 text-[13px]"
                    >
                      <span className="text-ink-800">{e.project}</span>
                      <span className="text-ink-500 inline-flex items-center gap-2">
                        {e.label}
                        <span className="text-ink-400">
                          {e.date.replace("2025-", "").replace("-", "月") + "日"}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>

        {/* RIGHT 4/12 */}
        <div className="col-span-12 xl:col-span-4 space-y-6">
          {/* Recent materials */}
          <Card>
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">
                最近浏览材料
              </h3>
              <Link
                href="/materials"
                className="text-[13px] text-brand-700 hover:underline underline-offset-2"
              >
                查看全部
              </Link>
            </div>
            <ul className="px-5 pb-5 pt-3 space-y-3">
              {recentMaterials.map((m, i) => (
                <Link
                  key={m.id}
                  href={`/materials/${m.id}`}
                  className="flex items-center gap-3 hover:bg-surface-subtle rounded-lg -mx-2 px-2 py-1.5 transition-colors"
                >
                  <MaterialThumb
                    seed={m.id}
                    category={m.category}
                    className="w-11 h-11 rounded-md shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-medium text-ink-900 truncate">
                      {m.name}
                    </div>
                    <div className="text-[11px] text-ink-500 mt-0.5 truncate">
                      {m.category} | {m.spec}
                    </div>
                  </div>
                  <div className="text-[11px] text-ink-400 shrink-0">
                    {(["刚刚", "10 分钟前", "1 小时前", "昨天"][i] ?? "")}
                  </div>
                </Link>
              ))}
            </ul>
          </Card>

          {/* Todos */}
          <Card>
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">
                待办事项
              </h3>
              <Link
                href="/projects"
                className="text-[13px] text-brand-700 hover:underline underline-offset-2"
              >
                查看全部
              </Link>
            </div>
            <ul className="px-5 pb-5 pt-3 space-y-3">
              {todos.map((t) => (
                <li
                  key={t.id}
                  className="flex items-center gap-3 text-[13px]"
                >
                  <Circle className="size-4 text-ink-300 shrink-0" />
                  <span className="flex-1 text-ink-800 truncate">
                    {t.title}
                  </span>
                  <Badge
                    tone={
                      t.urgency === "今日截止"
                        ? "danger"
                        : t.urgency === "明天截止"
                          ? "warn"
                          : "neutral"
                    }
                  >
                    {t.urgency}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>

          {/* Recent messages */}
          <Card>
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">
                最近消息
              </h3>
              <a className="text-[13px] text-brand-700 hover:underline underline-offset-2">
                查看全部
              </a>
            </div>
            <ul className="px-5 pb-5 pt-3 space-y-4">
              {messages.map((m) => (
                <li key={m.id} className="flex gap-3">
                  <Avatar name={m.sender} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="text-[13px] font-medium text-ink-900 truncate">
                        {m.sender}
                      </div>
                      <div className="text-[11px] text-ink-400">
                        {relativeTime(m.at)}
                      </div>
                    </div>
                    <div className="text-[12.5px] text-ink-600 mt-0.5 line-clamp-2">
                      {m.content}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          {/* Favorites quick entry */}
          <Card>
            <div className="flex items-center justify-between px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">
                收藏材料快捷入口
              </h3>
              <a className="text-[13px] text-brand-700 hover:underline underline-offset-2">
                管理
              </a>
            </div>
            <div className="px-5 pb-5 pt-4 grid grid-cols-6 gap-2">
              {favs.map((id) => {
                const m = materials.find((x) => x.id === id)!;
                return (
                  <Link
                    key={id}
                    href={`/materials/${id}`}
                    className="group flex flex-col items-center gap-1"
                  >
                    <MaterialThumb
                      seed={m.id}
                      category={m.category}
                      className="w-full aspect-square rounded-lg border border-line group-hover:border-brand-300 transition-colors"
                    />
                    <div className="text-[10.5px] text-ink-600 truncate w-full text-center">
                      {m.name}
                    </div>
                  </Link>
                );
              })}
              <button className="flex flex-col items-center gap-1">
                <span className="w-full aspect-square rounded-lg border border-dashed border-line text-ink-400 flex items-center justify-center hover:border-brand-300 hover:text-brand-600 transition-colors">
                  <Plus className="size-5" />
                </span>
                <span className="text-[10.5px] text-ink-500">添加</span>
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  tone,
  label,
  value,
  delta,
}: {
  icon: React.ReactNode;
  tone: "brand" | "warn" | "info" | "danger";
  label: string;
  value: string;
  delta: string;
}) {
  const bg =
    tone === "brand"
      ? "bg-brand-50"
      : tone === "warn"
        ? "bg-warn-50"
        : tone === "info"
          ? "bg-info-50"
          : "bg-danger-50";
  const isPositive = delta.includes("+");
  return (
    <Card className="p-4 flex items-start gap-3">
      <div
        className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full ${bg}`}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] text-ink-500">{label}</div>
        <div className="text-[26px] font-semibold leading-tight text-ink-900 tabular-nums mt-0.5">
          {value}
        </div>
        <div
          className={`text-[11.5px] mt-0.5 inline-flex items-center gap-0.5 ${isPositive ? "text-brand-600" : "text-ink-500"}`}
        >
          {delta}
          {isPositive && <ArrowUpRight className="size-3" />}
        </div>
      </div>
    </Card>
  );
}

function SegmentedTabs({
  options,
}: {
  options: Array<{ label: string; count?: number; active?: boolean }>;
}) {
  return (
    <div className="inline-flex items-center bg-surface-subtle rounded-lg p-0.5">
      {options.map((o) => (
        <button
          key={o.label}
          className={`h-7 px-3 rounded-md text-[12.5px] inline-flex items-center gap-1.5 transition ${
            o.active
              ? "bg-white text-ink-900 shadow-sm font-medium"
              : "text-ink-500 hover:text-ink-700"
          }`}
        >
          {o.label}
          {typeof o.count === "number" && (
            <span
              className={`text-[11px] ${o.active ? "text-brand-600" : "text-ink-400"}`}
            >
              {o.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

function CalendarMini() {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const start = 4; // May 1 2025 is Thursday → leading blanks
  const cells: Array<number | null> = [];
  for (let i = 0; i < start; i++) cells.push(null);
  for (let d = 1; d <= 31; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  const today = 10;
  const eventDays = new Set([12, 13, 16]);
  return (
    <div>
      <div className="grid grid-cols-7 text-[11px] text-ink-400 mb-1.5">
        {days.map((d) => (
          <div key={d} className="text-center py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-y-0.5">
        {cells.map((d, i) => (
          <div
            key={i}
            className="h-8 flex items-center justify-center text-[12px]"
          >
            {d === null ? (
              ""
            ) : (
              <span
                className={`relative inline-flex items-center justify-center w-7 h-7 rounded-full ${
                  d === today
                    ? "bg-brand-600 text-white font-medium"
                    : "text-ink-700 hover:bg-surface-subtle cursor-default"
                }`}
              >
                {d}
                {eventDays.has(d) && d !== today && (
                  <span className="absolute -bottom-0 size-1 rounded-full bg-brand-500" />
                )}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// silence unused warnings for icons reserved for future
void ImageIcon;

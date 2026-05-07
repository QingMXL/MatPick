import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Upload,
  Wand2,
  FileText,
  ShoppingCart,
  ArrowRight,
  Calendar,
  Users,
  Building2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AvatarStack } from "@/components/ui/avatar";
import { ProjectCover } from "@/components/ui/cover";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { findProject, projects, activity } from "@/lib/mock";
import { formatNumber, relativeTime } from "@/lib/utils";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = findProject(params.id);
  if (!project) notFound();

  return (
    <div className="px-8 py-6 space-y-5 max-w-[1640px] mx-auto">
      <Breadcrumbs
        items={[
          { label: "项目", href: "/projects" },
          { label: project.name },
        ]}
      />

      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-32 h-20 rounded-lg overflow-hidden border border-line shrink-0">
            <ProjectCover tone="warm" className="w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-[22px] font-semibold text-ink-900">
                {project.name}
              </h1>
              <Badge
                tone={
                  project.status === "进行中"
                    ? "success"
                    : project.status === "报价中"
                      ? "warn"
                      : project.status === "已完成"
                        ? "dark"
                        : "neutral"
                }
              >
                {project.status}
              </Badge>
            </div>
            <div className="mt-2 flex items-center gap-5 text-[13px] text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="size-3.5" />
                {project.client}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                交付 {project.deadline}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users className="size-3.5" />
                {project.members.length} 人协作
              </span>
              <span>{project.city}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/projects/${project.id}/upload`}>
            <Button variant="outline" iconLeft={<Upload className="size-4" />}>
              上传方案
            </Button>
          </Link>
          <Link href={`/projects/${project.id}/workspace`}>
            <Button variant="primary" iconLeft={<Wand2 className="size-4" />}>
              进入材质工作区
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatBox label="方案数量" value={String(project.schemes.length)} hint="个方案" />
        <StatBox label="总面积" value={formatNumber(project.area, 1)} hint="m²" />
        <StatBox label="材料种类" value="18" hint="种" />
        <StatBox label="预估总价" value="¥ 542,932" hint="含税" />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Schemes list */}
        <Card className="col-span-12 xl:col-span-8 p-0">
          <div className="flex items-center justify-between px-5 pt-5">
            <h3 className="text-[15px] font-semibold text-ink-900">方案空间</h3>
            <Button size="sm" variant="outline">
              新增方案
            </Button>
          </div>
          <div className="px-5 pb-5 pt-4 space-y-3">
            {project.schemes.map((scheme, i) => (
              <div
                key={scheme}
                className="flex items-center justify-between rounded-lg border border-line p-3 hover:border-brand-300 hover:bg-brand-50/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-12 rounded-md overflow-hidden border border-line shrink-0">
                    <ProjectCover
                      tone={(["warm", "cool", "neutral", "dark"] as const)[i % 4]}
                      className="w-full h-full"
                    />
                  </div>
                  <div>
                    <div className="text-[13.5px] font-medium text-ink-900">
                      {scheme} · 方案A
                    </div>
                    <div className="text-[11.5px] text-ink-500 mt-0.5 flex items-center gap-3">
                      <span>面积 128.6 m²</span>
                      <span>已识别 12 个区域</span>
                      <span>已选材料 6 项</span>
                      <span className="text-ink-400">
                        最近编辑 {relativeTime(project.lastEditedAt)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/projects/${project.id}/quote`}>
                    <Button
                      size="sm"
                      variant="outline"
                      iconLeft={<FileText className="size-3.5" />}
                    >
                      查看报价
                    </Button>
                  </Link>
                  <Link href={`/projects/${project.id}/workspace`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      iconRight={<ArrowRight className="size-3.5" />}
                    >
                      进入工作区
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Side */}
        <div className="col-span-12 xl:col-span-4 space-y-5">
          <Card>
            <div className="px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">协作成员</h3>
            </div>
            <div className="px-5 pb-5 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <AvatarStack names={project.members} max={5} />
                <Button size="sm" variant="outline">
                  邀请
                </Button>
              </div>
              <div className="text-[12px] text-ink-500">
                {project.members.join("、")}
              </div>
            </div>
          </Card>

          <Card>
            <div className="px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">最近动态</h3>
            </div>
            <ul className="px-5 pb-5 pt-3 space-y-3.5">
              {activity.slice(0, 4).map((a) => (
                <li key={a.id} className="text-[12.5px] flex gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                  <div>
                    <div className="text-ink-800">
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
            <div className="px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">
                快捷操作
              </h3>
            </div>
            <div className="px-5 pb-5 pt-4 grid grid-cols-2 gap-2">
              <Link href={`/projects/${project.id}/quote`}>
                <Button block variant="outline" iconLeft={<FileText className="size-4" />}>
                  生成报价
                </Button>
              </Link>
              <Link href="/orders">
                <Button block variant="outline" iconLeft={<ShoppingCart className="size-4" />}>
                  发起订货
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Other projects */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[15px] font-semibold text-ink-900">同类项目</h3>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {projects.filter((p) => p.id !== project.id).slice(0, 4).map((p, i) => (
            <Link
              key={p.id}
              href={`/projects/${p.id}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-surface-subtle"
            >
              <div className="w-12 h-12 rounded-md overflow-hidden border border-line shrink-0">
                <ProjectCover
                  tone={(["warm", "cool", "neutral", "dark"] as const)[i % 4]}
                  className="w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[13px] text-ink-900 truncate">{p.name}</div>
                <div className="text-[11.5px] text-ink-500 truncate">
                  {p.city} · {formatNumber(p.area, 0)} m²
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatBox({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <Card className="p-4">
      <div className="text-[12px] text-ink-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1.5">
        <span className="text-[24px] font-semibold text-ink-900 tabular-nums">
          {value}
        </span>
        {hint && <span className="text-[12px] text-ink-500">{hint}</span>}
      </div>
    </Card>
  );
}

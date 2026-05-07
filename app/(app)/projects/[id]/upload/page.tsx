"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Save,
  Share2,
  MoreHorizontal,
  Check,
  Sparkles,
  Box,
  Lightbulb,
  Square,
  Sofa,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Scene } from "@/components/ui/scene";
import { findProject } from "@/lib/mock";

const tabs = ["效果图", "截图", "3D模型"] as const;

const tilesByKind = [
  { label: "墙面", count: 8, icon: Square, color: "bg-brand-100 text-brand-700" },
  { label: "地面", count: 3, icon: Box, color: "bg-info-50 text-info-500" },
  { label: "顶面", count: 2, icon: Lightbulb, color: "bg-warn-50 text-warn-600" },
  { label: "柜体", count: 2, icon: Box, color: "bg-purple-100 text-purple-700" },
  { label: "软装", count: 6, icon: Sofa, color: "bg-pink-100 text-pink-700" },
];

export default function UploadPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const project = findProject(params.id);
  const [tab, setTab] = useState<(typeof tabs)[number]>("效果图");
  const [uploaded, setUploaded] = useState(true); // start with mock uploaded image
  const [recogStage, setRecogStage] = useState<
    "待识别" | "识别中" | "识别完成"
  >("待识别");

  function startRecog() {
    if (recogStage !== "待识别") return;
    setRecogStage("识别中");
    setTimeout(() => {
      setRecogStage("识别完成");
      setTimeout(() => {
        router.push(`/projects/${params.id}/workspace`);
      }, 800);
    }, 1600);
  }

  return (
    <div className="px-8 py-6 space-y-5 max-w-[1640px] mx-auto">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: "项目", href: "/projects" },
            { label: project?.name ?? "项目", href: `/projects/${params.id}` },
            { label: "大堂公区" },
            { label: "方案A" },
            { label: "方案上传" },
          ]}
        />
        <div className="flex items-center gap-2">
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

      {/* Stepper */}
      <Card className="p-5">
        <Stepper
          steps={[
            { idx: 1, title: "上传方案", desc: "上传效果图/截图/3D模型", state: "active" },
            {
              idx: 2,
              title: "AI识别区域",
              desc: "AI智能识别空间与材质",
              state: "pending",
            },
            {
              idx: 3,
              title: "选择材料",
              desc: "匹配材料并编辑应用",
              state: "pending",
            },
            {
              idx: 4,
              title: "生成报价",
              desc: "生成物料清单与报价",
              state: "pending",
            },
          ]}
        />
      </Card>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 xl:col-span-8 space-y-5">
          <Card className="p-5">
            {/* tabs */}
            <div className="flex items-center gap-1.5 border-b border-line">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-3.5 pb-3 text-[13.5px] relative ${
                    tab === t
                      ? "text-ink-900 font-medium"
                      : "text-ink-500 hover:text-ink-700"
                  }`}
                >
                  {t}
                  {tab === t && (
                    <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-brand-600 rounded-full" />
                  )}
                </button>
              ))}
              <div className="ml-auto pb-3 text-[13px] text-ink-500">
                已上传效果图
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5 mt-5">
              {/* Drop zone */}
              <button
                onClick={() => setUploaded(true)}
                className="rounded-lg border-2 border-dashed border-line bg-surface-subtle/40 hover:border-brand-300 hover:bg-brand-50/30 transition-colors aspect-[16/10] flex flex-col items-center justify-center text-center gap-2"
              >
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-700">
                  <UploadCloud className="size-6" />
                </span>
                <div className="text-[13.5px] text-ink-700 mt-1">
                  拖拽文件到此处，或<span className="text-brand-700 font-medium">点击上传</span>
                </div>
                <div className="text-[11.5px] text-ink-500">
                  支持 JPG / PNG / TIF / PDF / 3DMAX / SKP 等格式
                </div>
                <div className="text-[11.5px] text-ink-400">单文件最大 200MB</div>
              </button>

              {/* Uploaded preview */}
              <div className="relative rounded-lg overflow-hidden border border-line bg-white aspect-[16/10]">
                {uploaded && (
                  <>
                    <Scene
                      wallColor="#9DAE9D"
                      floorColor="#9F9486"
                      ceilingColor="#E8E4DA"
                      className="w-full h-full"
                    />
                    <button
                      onClick={() => setUploaded(false)}
                      className="absolute top-2.5 right-2.5 size-8 rounded-md bg-white/90 backdrop-blur border border-line text-ink-500 inline-flex items-center justify-center hover:text-danger-500"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2 h-6 rounded bg-white/95 border border-line text-[11.5px] text-ink-700">
                      主视图
                    </div>
                  </>
                )}
              </div>
            </div>
          </Card>

          {/* AI preview tiles */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[14.5px] font-semibold text-ink-900">
                AI识别预览（示例）
              </h3>
            </div>
            <p className="text-[12.5px] text-ink-500 mb-4">
              AI将自动识别空间区域并匹配材料类型，您可在下一步进行调整
            </p>
            <div className="grid grid-cols-5 gap-3">
              {tilesByKind.map((t) => (
                <div
                  key={t.label}
                  className="rounded-lg border border-line overflow-hidden bg-white"
                >
                  <div className="aspect-[5/3] relative">
                    <Scene
                      wallColor={
                        t.label === "墙面"
                          ? "#9DAE9D"
                          : t.label === "地面"
                            ? "#9C928A"
                            : t.label === "顶面"
                              ? "#E2DDD2"
                              : t.label === "柜体"
                                ? "#A99E89"
                                : "#BDB5A4"
                      }
                      className="w-full h-full"
                    />
                    <span
                      className={`absolute -bottom-3 left-3 inline-flex items-center justify-center w-7 h-7 rounded-full ring-2 ring-white ${t.color}`}
                    >
                      <t.icon className="size-3.5" />
                    </span>
                  </div>
                  <div className="px-3 pt-4 pb-3">
                    <div className="text-[12.5px] font-medium text-ink-900">
                      {t.label}
                    </div>
                    <div className="text-[11px] text-ink-500 mt-0.5">
                      预计 {t.count} 处
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-lg bg-brand-50/60 border border-brand-100 px-3 py-2 text-[12px] text-brand-700 inline-flex items-center gap-1.5">
              <Sparkles className="size-3.5" />
              提示：上传清晰、光线均匀的效果图可显著提升识别准确率；复杂空间建议提供多角度图或模型文件。
            </div>
          </Card>
        </div>

        {/* Right side info */}
        <div className="col-span-12 xl:col-span-4 space-y-5">
          <Card>
            <div className="px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">文件信息</h3>
            </div>
            <div className="px-5 pb-5 pt-4 space-y-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-brand-50 text-brand-700">
                  <ImageIcon className="size-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-medium text-ink-900 truncate">
                    大堂公区_效果图_01.jpg
                  </div>
                  <div className="text-[11.5px] text-ink-500 mt-1 flex gap-3">
                    <span>8.67 MB</span>
                    <span>3840 × 2160</span>
                  </div>
                </div>
              </div>
              <Row label="上传时间" value="2025-05-10 14:28:36" />
              <Row label="上传人" value="林设计" />
            </div>
          </Card>

          <Card>
            <div className="px-5 pt-5 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-ink-900">识别状态</h3>
              <Badge tone="brand">
                {recogStage === "待识别"
                  ? "待识别"
                  : recogStage === "识别中"
                    ? "识别中"
                    : "识别完成"}
              </Badge>
            </div>
            <div className="px-5 pb-5 pt-4">
              <ProgressTrack stage={recogStage} />
            </div>
          </Card>

          <Card>
            <div className="px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">识别概览</h3>
            </div>
            <div className="px-5 pb-5 pt-3 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[28px] font-semibold text-ink-900">
                  {recogStage === "识别完成" ? 12 : 0}
                </div>
                <div className="text-[12px] text-ink-500">识别区域 (AI)</div>
              </div>
              <div>
                <div className="text-[28px] font-semibold text-ink-900">
                  {recogStage === "识别完成" ? 18 : 0}
                </div>
                <div className="text-[12px] text-ink-500">识别材料 (预估)</div>
              </div>
            </div>
          </Card>

          <Card>
            <div className="px-5 pt-5">
              <h3 className="text-[15px] font-semibold text-ink-900">支持格式</h3>
            </div>
            <div className="px-5 pb-5 pt-3 space-y-2 text-[12.5px]">
              <Row label="效果图" value="JPG / PNG / TIF / PDF" />
              <Row label="3D模型" value="3DMAX / SKP / FBX / OBJ" />
              <div className="text-[11.5px] text-ink-400">
                建议图片不小于 1920px，模型不超过 500MB
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              iconLeft={<RefreshCw className="size-4" />}
              onClick={() => {
                setUploaded(false);
                setRecogStage("待识别");
              }}
            >
              重新上传
            </Button>
            <Button
              variant="primary"
              iconLeft={<Sparkles className="size-4" />}
              onClick={startRecog}
              disabled={recogStage !== "待识别"}
            >
              {recogStage === "识别中" ? "识别中..." : "开始识别"}
            </Button>
          </div>
          <div className="text-center text-[11.5px] text-ink-400">
            完成后将跳转到材质替换工作区
          </div>
        </div>
      </div>
    </div>
  );
}

function Stepper({
  steps,
}: {
  steps: Array<{
    idx: number;
    title: string;
    desc: string;
    state: "active" | "pending" | "done";
  }>;
}) {
  return (
    <ol className="grid grid-cols-4 gap-3">
      {steps.map((s, i) => (
        <li key={s.idx} className="flex items-start gap-3 relative">
          <span
            className={`mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full text-[13px] font-medium shrink-0 ${
              s.state === "active"
                ? "bg-brand-600 text-white"
                : s.state === "done"
                  ? "bg-brand-100 text-brand-700"
                  : "bg-surface-subtle text-ink-500 border border-line"
            }`}
          >
            {s.state === "done" ? <Check className="size-3.5" /> : s.idx}
          </span>
          <div>
            <div
              className={`text-[13.5px] font-medium ${
                s.state === "pending" ? "text-ink-500" : "text-ink-900"
              }`}
            >
              {s.title}
            </div>
            <div className="text-[11.5px] text-ink-500 mt-0.5">{s.desc}</div>
          </div>
          {i < steps.length - 1 && (
            <span className="hidden md:block absolute left-[40px] right-[-12px] top-3.5 h-px bg-line -z-0" />
          )}
        </li>
      ))}
    </ol>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 text-[12.5px]">
      <span className="text-ink-500 w-16 shrink-0">{label}</span>
      <span className="text-ink-800 font-medium">{value}</span>
    </div>
  );
}

function ProgressTrack({
  stage,
}: {
  stage: "待识别" | "识别中" | "识别完成";
}) {
  const idx = stage === "待识别" ? 0 : stage === "识别中" ? 1 : 2;
  const labels: ("待识别" | "识别中" | "识别完成")[] = ["待识别", "识别中", "识别完成"];
  return (
    <div>
      <div className="relative h-1 rounded-full bg-ink-200">
        <div
          className="absolute inset-y-0 left-0 bg-brand-500 rounded-full transition-all"
          style={{ width: `${(idx / 2) * 100}%` }}
        />
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`absolute top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-white ${
              i <= idx ? "bg-brand-600" : "bg-ink-300"
            }`}
            style={{ left: `calc(${(i / 2) * 100}% - 6px)` }}
          />
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[11.5px] text-ink-500">
        {labels.map((l, i) => (
          <span key={l} className={i === idx ? "text-brand-700 font-medium" : ""}>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

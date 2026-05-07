import Link from "next/link";
import { notFound } from "next/navigation";
import {
  RefreshCw,
  ChevronDown,
  Edit3,
  Trash2,
  FileDown,
  FileText,
  Send,
  Settings2,
  Plus,
  Pencil,
  MoreHorizontal,
  Leaf,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialThumb } from "@/components/ui/material-thumb";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  findProject,
  findMaterial,
  findSupplier,
  quotes,
  calcQuoteSummary,
} from "@/lib/mock";
import { formatCurrency, formatNumber } from "@/lib/utils";

export default function QuotePage({ params }: { params: { id: string } }) {
  const project = findProject(params.id);
  if (!project) notFound();
  const quote = quotes[0];
  const summary = calcQuoteSummary(quote);

  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <div className="flex items-center justify-between">
        <Breadcrumbs
          items={[
            { label: "项目", href: "/projects" },
            { label: project.name, href: `/projects/${project.id}` },
            { label: "大堂公区" },
            { label: "智能报价" },
          ]}
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* MAIN */}
        <div className="col-span-12 xl:col-span-8 space-y-5">
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-[22px] font-semibold text-ink-900">
                  {project.name} – 大堂公区
                </h1>
                <div className="mt-2 flex items-center gap-3 text-[12.5px] text-ink-500">
                  <span>报价版本：{quote.version}</span>
                  <Badge tone="brand">{quote.status}</Badge>
                  <span>生成时间：{new Date(quote.generatedAt).toLocaleString("zh-CN")}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" iconLeft={<RefreshCw className="size-4" />}>
                  重新生成报价
                </Button>
                <Button variant="outline" iconRight={<ChevronDown className="size-4" />}>
                  更多操作
                </Button>
              </div>
            </div>

            {/* tabs */}
            <div className="mt-5 flex items-center gap-5 border-b border-line text-[13.5px]">
              {["报价明细", "报价概览"].map((t, i) => (
                <button
                  key={t}
                  className={`relative pb-3 ${i === 0 ? "text-ink-900 font-medium" : "text-ink-500 hover:text-ink-700"}`}
                >
                  {t}
                  {i === 0 && (
                    <span className="absolute -bottom-px left-0 right-0 h-[2px] bg-brand-600 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* metrics */}
            <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
              <div className="grid grid-cols-4 gap-x-12 gap-y-2">
                <Metric label="区域数量" value="6" />
                <Metric label="材料种类" value="18" />
                <Metric label="总面积" value="1,128.6 m²" />
                <Metric label="报价条目" value="26" />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" iconLeft={<Pencil className="size-3.5" />}>
                  批量编辑
                </Button>
                <Button variant="outline" size="sm" iconLeft={<Settings2 className="size-3.5" />}>
                  调整损耗
                </Button>
                <button className="size-8 rounded-md bg-white border border-line text-ink-500 inline-flex items-center justify-center hover:border-ink-300">
                  <Settings2 className="size-3.5" />
                </button>
              </div>
            </div>

            {/* table */}
            <div className="mt-4 rounded-lg border border-line overflow-hidden">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-surface-subtle text-ink-500 text-[12px]">
                    <Th>区域 / 空间</Th>
                    <Th className="!pl-0">材料信息</Th>
                    <Th className="text-right">面积 (m²)</Th>
                    <Th className="text-right">单价 (元/m²)</Th>
                    <Th className="text-right">损耗率</Th>
                    <Th className="text-right">小计 (元)</Th>
                    <Th>供应商</Th>
                    <Th className="text-center w-20">操作</Th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {quote.items.map((it) => {
                    const m = findMaterial(it.materialId)!;
                    const s = findSupplier(it.supplierId)!;
                    const subtotal =
                      it.areaSize * it.unitPrice * (1 + it.lossRate);
                    return (
                      <tr key={it.id} className="hover:bg-surface-subtle/40">
                        <Td>
                          <div className="flex items-start gap-2">
                            <ChevronDown className="size-3.5 text-ink-400 mt-0.5" />
                            <div>
                              <div className="text-ink-900 font-medium">
                                {it.area}
                              </div>
                              <div className="text-[11px] text-ink-500 mt-0.5">
                                {formatNumber(it.areaSize, 1)} m²
                              </div>
                            </div>
                          </div>
                        </Td>
                        <Td className="!pl-0">
                          <div className="flex items-center gap-3">
                            <MaterialThumb
                              seed={m.id}
                              category={m.category}
                              className="size-12 rounded-md shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="text-ink-900 font-medium truncate">
                                {m.name}
                              </div>
                              <div className="text-[11px] text-ink-500 mt-0.5">
                                {m.spec}
                              </div>
                              <div className="mt-1 flex flex-wrap gap-1">
                                <Badge tone="subtle">{m.surface}</Badge>
                                <Badge tone="subtle">{m.ecoLevel}</Badge>
                                <Badge tone="subtle">{m.fireLevel}</Badge>
                              </div>
                            </div>
                          </div>
                        </Td>
                        <Td className="text-right tabular-nums">
                          {formatNumber(it.areaSize, 1)}
                        </Td>
                        <Td className="text-right tabular-nums text-ink-900">
                          ¥ {it.unitPrice}
                        </Td>
                        <Td className="text-right tabular-nums">
                          {Math.round(it.lossRate * 100)}%
                        </Td>
                        <Td className="text-right tabular-nums font-medium text-ink-900">
                          ¥ {subtotal.toLocaleString("zh-CN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Td>
                        <Td>
                          <div className="text-ink-900">{s.name}</div>
                          <Badge tone={s.partnership === "优选" ? "brand" : "subtle"} className="mt-1">
                            {s.partnership}
                          </Badge>
                        </Td>
                        <Td className="text-center">
                          <div className="inline-flex gap-1">
                            <button className="size-7 inline-flex items-center justify-center rounded text-ink-500 hover:bg-surface-subtle">
                              <Edit3 className="size-3.5" />
                            </button>
                            <button className="size-7 inline-flex items-center justify-center rounded text-ink-500 hover:bg-surface-subtle">
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </Td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <button className="w-full text-[13px] text-brand-700 hover:bg-brand-50/30 py-3 inline-flex items-center justify-center gap-1.5 border-t border-line">
                <Plus className="size-3.5" />
                添加区域 / 材料
              </button>
            </div>

            <div className="mt-3 text-[11.5px] text-ink-400">
              * 报价基于当前材料价格与设定的损耗率，实际价格以供应商最终确认与合同为准。
            </div>
          </Card>
        </div>

        {/* SIDE */}
        <div className="col-span-12 xl:col-span-4 space-y-5">
          <Card>
            <div className="px-5 pt-5 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-ink-900">报价汇总</h3>
              <button className="text-ink-400 hover:text-ink-700">
                <MoreHorizontal className="size-4" />
              </button>
            </div>
            <dl className="px-5 pt-4 pb-5 space-y-3 text-[13px]">
              <Sum label="材料总价" value={formatCurrency(summary.materialTotal)} />
              <Sum
                label={`损耗（加权平均 ${(summary.lossWeighted * 100).toFixed(1)}%）`}
                value={`+ ${formatCurrency(summary.lossTotal)}`}
              />
              <Sum
                label={`税费（${(summary.taxRate * 100).toFixed(0)}%）`}
                value={`+ ${formatCurrency(summary.tax)}`}
              />
              <Sum label="运费（预估）" value={`+ ${formatCurrency(summary.shipping)}`} />
              <div className="border-t border-line pt-3 mt-2 flex items-center justify-between">
                <span className="text-ink-700">总计（含税）</span>
                <span className="text-[22px] font-semibold text-brand-700 tabular-nums">
                  {formatCurrency(summary.grandTotal)}
                </span>
              </div>
              <div className="rounded-lg bg-brand-50/60 p-3 mt-2">
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="text-ink-700">预计节省（AI 优化）</span>
                  <span className="font-medium text-brand-700">
                    – {formatCurrency(summary.estSavings)}
                  </span>
                </div>
                <div className="mt-1 text-[11.5px] text-brand-700/80 inline-flex items-center gap-1">
                  <Leaf className="size-3.5" />
                  相比人工报价预计节省 3.3%
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <Button block variant="primary" iconLeft={<FileDown className="size-4" />}>
                  导出 PDF
                </Button>
                <Button block variant="outline" iconLeft={<FileText className="size-4" />}>
                  导出 Excel
                </Button>
                <Button block variant="secondary" iconLeft={<Send className="size-4" />}>
                  提交审批
                </Button>
              </div>
            </dl>
          </Card>

          <Card>
            <div className="px-5 pt-5 flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-ink-900">
                报价版本历史
              </h3>
              <Link
                href="#"
                className="text-[12.5px] text-brand-700 hover:underline"
              >
                查看全部版本 ({quote.history.length})
              </Link>
            </div>
            <ul className="px-5 pt-3 pb-5 space-y-3">
              {quote.history.map((h) => (
                <li
                  key={h.version}
                  className="flex items-start justify-between rounded-lg border border-line p-3"
                >
                  <div>
                    <div className="text-[13px] text-ink-900 font-medium inline-flex items-center gap-2">
                      {h.version}
                      <Badge
                        tone={h.status === "已生成" ? "brand" : "subtle"}
                      >
                        {h.status}
                      </Badge>
                    </div>
                    <div className="text-[11.5px] text-ink-500 mt-1">
                      {h.author}{" "}
                      {new Date(h.at).toLocaleString("zh-CN", {
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <button className="text-ink-400 hover:text-ink-800">
                    <MoreHorizontal className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11.5px] text-ink-500">{label}</div>
      <div className="text-[18px] font-semibold text-ink-900 tabular-nums mt-0.5">
        {value}
      </div>
    </div>
  );
}

function Sum({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-500">{label}</dt>
      <dd className="text-ink-900 font-medium tabular-nums">{value}</dd>
    </div>
  );
}

function Th({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`text-left font-medium px-4 h-10 whitespace-nowrap ${className ?? ""}`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <td className={`px-4 py-3 align-top ${className ?? ""}`}>{children}</td>
  );
}

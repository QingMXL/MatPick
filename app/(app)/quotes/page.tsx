import Link from "next/link";
import { FileText, Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { quotes, findProject, calcQuoteSummary } from "@/lib/mock";
import { formatCurrency } from "@/lib/utils";

export default function QuotesIndexPage() {
  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs items={[{ label: "报价" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900">报价</h1>
          <p className="text-[13px] text-ink-500 mt-1">
            管理项目报价单与版本历史
          </p>
        </div>
        <Button variant="primary" iconLeft={<Plus className="size-4" />}>
          新建报价
        </Button>
      </div>

      <Card className="p-0">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-surface-subtle text-ink-500 text-[12px]">
              <th className="text-left px-4 h-10 font-medium">报价单</th>
              <th className="text-left px-4 h-10 font-medium">所属项目</th>
              <th className="text-left px-4 h-10 font-medium">版本</th>
              <th className="text-left px-4 h-10 font-medium">状态</th>
              <th className="text-right px-4 h-10 font-medium">总计</th>
              <th className="text-left px-4 h-10 font-medium">生成时间</th>
              <th className="text-center px-4 h-10 font-medium w-20">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {quotes.map((q) => {
              const p = findProject(q.projectId);
              const s = calcQuoteSummary(q);
              return (
                <tr key={q.id} className="hover:bg-surface-subtle/40">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="size-4 text-brand-600" />
                      <span className="text-ink-900 font-medium">
                        {q.scheme} 报价单
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-700">{p?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-ink-700">{q.version}</td>
                  <td className="px-4 py-3">
                    <Badge tone={q.status === "已生成" ? "brand" : "subtle"}>
                      {q.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-ink-900 tabular-nums">
                    {formatCurrency(s.grandTotal)}
                  </td>
                  <td className="px-4 py-3 text-ink-500">
                    {new Date(q.generatedAt).toLocaleString("zh-CN")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Link href={`/projects/${q.projectId}/quote`}>
                      <Button size="sm" variant="outline">
                        查看
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

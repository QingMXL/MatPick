"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  X,
  Phone,
  FileText,
  Download,
  RefreshCw,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MaterialThumb } from "@/components/ui/material-thumb";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import {
  orders,
  findSupplier,
  findProject,
  findMaterial,
} from "@/lib/mock";
import { cn, formatCurrency } from "@/lib/utils";
import type { Order, OrderStatus } from "@/lib/types";

const statusList: Array<{ key: OrderStatus | "全部"; label: string; tone?: any }> = [
  { key: "全部", label: "全部" },
  { key: "待确认", label: "待确认" },
  { key: "待发货", label: "待发货" },
  { key: "运输中", label: "运输中" },
  { key: "已完成", label: "已完成" },
  { key: "售后", label: "售后" },
];

const statusTone: Record<OrderStatus, "warn" | "info" | "brand" | "subtle" | "danger"> = {
  待确认: "warn",
  待发货: "info",
  运输中: "info",
  已完成: "brand",
  售后: "danger",
};

export default function OrdersPage() {
  const [filter, setFilter] = useState<OrderStatus | "全部">("全部");
  const [activeId, setActiveId] = useState<string | null>(orders[0].id);

  const visible = useMemo(
    () => (filter === "全部" ? orders : orders.filter((o) => o.status === filter)),
    [filter],
  );
  const grouped = useMemo(() => {
    const map = new Map<string, Order[]>();
    for (const o of visible) {
      const key = o.supplierId;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(o);
    }
    return Array.from(map.entries());
  }, [visible]);

  const active = orders.find((o) => o.id === activeId);

  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs items={[{ label: "订单" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900">订单</h1>
          <p className="text-[13px] text-ink-500 mt-1">
            按供应商分组管理订货单与配送进度
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" iconLeft={<Filter className="size-4" />}>
            筛选
          </Button>
          <Button variant="primary">新建订单</Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 h-9 px-3 rounded-lg bg-white border border-line w-[320px]">
          <Search className="size-4 text-ink-400" />
          <input
            placeholder="搜索订单号、供应商、项目"
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-ink-400"
          />
        </label>
        <div className="flex-1" />
        <div className="inline-flex bg-surface-subtle rounded-lg p-0.5 text-[13px]">
          {statusList.map((s) => (
            <button
              key={s.key}
              onClick={() => setFilter(s.key)}
              className={cn(
                "h-7 px-3 rounded-md inline-flex items-center gap-1.5 transition",
                filter === s.key
                  ? "bg-white text-ink-900 shadow-sm font-medium"
                  : "text-ink-500 hover:text-ink-700",
              )}
            >
              {s.label}
              {s.key !== "全部" && (
                <span className="text-[11px] text-ink-400">
                  {orders.filter((o) => o.status === s.key).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div
          className={cn(
            "space-y-4",
            active ? "col-span-12 xl:col-span-8" : "col-span-12",
          )}
        >
          {grouped.map(([supId, list]) => {
            const sup = findSupplier(supId)!;
            const totalPaid = list.reduce((s, o) => s + o.total, 0);
            return (
              <Card key={supId} className="p-0 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-line bg-surface-subtle/50 flex items-center gap-3">
                  <Avatar name={sup.name} size={36} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-medium text-ink-900 inline-flex items-center gap-2">
                      {sup.name}
                      <Badge tone={sup.partnership === "优选" ? "brand" : "subtle"}>
                        {sup.partnership}
                      </Badge>
                    </div>
                    <div className="text-[11.5px] text-ink-500 mt-0.5">
                      {sup.region} · 履约率 {Math.round(sup.fulfillmentRate * 100)}% · 评分 {sup.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11.5px] text-ink-500">
                      {list.length} 张订单 · 合计
                    </div>
                    <div className="text-[15px] font-semibold text-ink-900 tabular-nums">
                      {formatCurrency(totalPaid)}
                    </div>
                  </div>
                </div>
                <ul className="divide-y divide-line">
                  {list.map((o) => {
                    const proj = findProject(o.projectId);
                    return (
                      <li
                        key={o.id}
                        onClick={() => setActiveId(o.id)}
                        className={cn(
                          "px-5 py-4 cursor-pointer transition-colors",
                          activeId === o.id
                            ? "bg-brand-50/40"
                            : "hover:bg-surface-subtle/40",
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-[12px] text-ink-500 w-[150px] shrink-0">
                            <div className="text-ink-900 font-medium">
                              #{o.no}
                            </div>
                            <div className="mt-0.5">
                              {new Date(o.createdAt).toLocaleString("zh-CN", {
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] text-ink-900 truncate">
                              {proj?.name ?? "—"}
                            </div>
                            <div className="text-[11.5px] text-ink-500 mt-0.5 truncate">
                              {o.items
                                .map(
                                  (it) =>
                                    findMaterial(it.materialId)?.name +
                                    " × " +
                                    it.qty +
                                    it.unit,
                                )
                                .join("，")}
                            </div>
                          </div>
                          <Badge tone={statusTone[o.status]}>{o.status}</Badge>
                          <div className="text-right shrink-0 w-[140px]">
                            <div className="text-[14px] font-semibold text-ink-900 tabular-nums">
                              {formatCurrency(o.total)}
                            </div>
                            <div className="text-[11px] text-ink-400">合计金额</div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Detail */}
        {active && (
          <Card className="col-span-12 xl:col-span-4 p-0 overflow-hidden">
            <DetailPanel order={active} onClose={() => setActiveId(null)} />
          </Card>
        )}
      </div>
    </div>
  );
}

function DetailPanel({ order, onClose }: { order: Order; onClose: () => void }) {
  const sup = findSupplier(order.supplierId)!;
  const proj = findProject(order.projectId);
  return (
    <div className="flex flex-col h-full">
      <div className="px-5 py-4 border-b border-line flex items-center justify-between">
        <div>
          <div className="text-[15px] font-semibold text-ink-900">订单详情</div>
          <div className="text-[12px] text-ink-500 mt-0.5">#{order.no}</div>
        </div>
        <button
          onClick={onClose}
          className="size-8 rounded-md text-ink-500 hover:bg-surface-subtle inline-flex items-center justify-center"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="px-5 py-4 space-y-5 overflow-y-auto">
        <div className="rounded-lg bg-surface-subtle p-3 flex items-center gap-3">
          <Avatar name={sup.name} size={36} />
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-ink-900">{sup.name}</div>
            <div className="text-[11.5px] text-ink-500">{sup.contact} · {sup.phone}</div>
          </div>
          <Badge tone={statusTone[order.status]}>{order.status}</Badge>
        </div>

        <div>
          <div className="text-[13px] font-medium text-ink-900 mb-2.5">订单进度</div>
          <ol className="space-y-3">
            {order.timeline.map((e, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 size-5 rounded-full inline-flex items-center justify-center shrink-0",
                    e.done ? "bg-brand-600 text-white" : "bg-surface-subtle text-ink-400",
                  )}
                >
                  {e.done ? <CheckCircle2 className="size-3.5" /> : <Clock className="size-3" />}
                </span>
                <div className="flex-1 -mt-0.5">
                  <div
                    className={cn(
                      "text-[13px]",
                      e.done ? "text-ink-900 font-medium" : "text-ink-500",
                    )}
                  >
                    {e.label}
                  </div>
                  <div className="text-[11px] text-ink-400 mt-0.5">
                    {e.at
                      ? new Date(e.at).toLocaleString("zh-CN", {
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "待处理"}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <div className="text-[13px] font-medium text-ink-900 mb-2.5">材料清单</div>
          <ul className="space-y-2.5">
            {order.items.map((it, i) => {
              const m = findMaterial(it.materialId);
              return (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-lg border border-line p-2.5"
                >
                  {m && (
                    <MaterialThumb
                      seed={m.id}
                      category={m.category}
                      className="size-10 rounded shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] text-ink-900 truncate">{m?.name}</div>
                    <div className="text-[11.5px] text-ink-500 mt-0.5">
                      {m?.spec} · {it.qty} {it.unit}
                    </div>
                  </div>
                  <div className="text-[13px] text-ink-900 font-medium tabular-nums">
                    {formatCurrency(it.subtotal)}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <div className="text-[13px] font-medium text-ink-900 mb-2.5">配送信息</div>
          <div className="text-[12.5px] text-ink-700">{order.contact}</div>
          <div className="text-[12px] text-ink-500 mt-1">{order.address}</div>
          <div className="text-[12px] text-ink-500 mt-1">所属项目：{proj?.name}</div>
        </div>

        <div className="rounded-lg border border-line p-3 flex items-center justify-between">
          <span className="text-[13px] text-ink-700">订单总额</span>
          <span className="text-[20px] font-semibold text-brand-700 tabular-nums">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>
      <div className="border-t border-line p-3 grid grid-cols-2 gap-2">
        <Button variant="outline" iconLeft={<Phone className="size-4" />}>催单</Button>
        <Button variant="outline" iconLeft={<FileText className="size-4" />}>查看合同</Button>
        <Button variant="outline" iconLeft={<Download className="size-4" />}>下载清单</Button>
        <Button variant="secondary" iconLeft={<RefreshCw className="size-4" />}>申请售后</Button>
      </div>
    </div>
  );
}

// Suppress unused import warnings for icons we may want later
void Package;
void Truck;
void AlertTriangle;

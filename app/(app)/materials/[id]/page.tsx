import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Star,
  Share2,
  Heart,
  Phone,
  MessageCircle,
  ShoppingCart,
  Repeat,
  Check,
  ChevronRight,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { MaterialThumb } from "@/components/ui/material-thumb";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Scene } from "@/components/ui/scene";
import { findMaterial, findSupplier, materials } from "@/lib/mock";
import { formatNumber } from "@/lib/utils";

export default function MaterialDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const m = findMaterial(params.id);
  if (!m) notFound();
  const supplier = findSupplier(m.supplierId)!;
  const related = materials.filter((x) => x.id !== m.id && x.category === m.category).slice(0, 4);

  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs
        items={[
          { label: "材料库", href: "/materials" },
          { label: m.category },
          { label: m.name },
        ]}
      />

      <div className="grid grid-cols-12 gap-6">
        {/* Image gallery */}
        <Card className="col-span-12 lg:col-span-5 p-4 space-y-3">
          <MaterialThumb
            seed={m.id}
            category={m.category}
            className="w-full aspect-square rounded-lg"
          />
          <div className="grid grid-cols-5 gap-2">
            {[m.id, m.id + "-2", m.id + "-3", m.id + "-4", m.id + "-5"].map(
              (s, i) => (
                <button
                  key={s}
                  className={`aspect-square rounded-md overflow-hidden border ${i === 0 ? "border-brand-500 ring-1 ring-brand-500/30" : "border-line hover:border-ink-300"}`}
                >
                  <MaterialThumb seed={s} category={m.category} className="w-full h-full" />
                </button>
              ),
            )}
          </div>
        </Card>

        {/* Info */}
        <div className="col-span-12 lg:col-span-7 space-y-5">
          <Card className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-[12.5px] text-ink-500">
                  {m.category} · {m.subCategory ?? "—"} · {m.brand}
                </div>
                <h1 className="text-[24px] font-semibold text-ink-900 mt-1">
                  {m.name}
                </h1>
                <div className="mt-2 flex items-center gap-3 text-[12.5px] text-ink-500">
                  <span className="inline-flex items-center gap-0.5 text-warn-600">
                    <Star className="size-3.5 fill-warn-500 stroke-warn-500" />
                    4.8
                  </span>
                  <span>近 30 天 +218 应用</span>
                  <span>SKU MP-{m.id.slice(-4).toUpperCase()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button className="size-9 rounded-lg border border-line bg-white text-ink-500 inline-flex items-center justify-center hover:text-warn-500">
                  <Star className="size-4" />
                </button>
                <button className="size-9 rounded-lg border border-line bg-white text-ink-500 inline-flex items-center justify-center hover:text-danger-500">
                  <Heart className="size-4" />
                </button>
                <Button variant="outline" iconLeft={<Share2 className="size-4" />}>
                  分享
                </Button>
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[28px] font-semibold text-brand-700">
                ¥{m.price}
              </span>
              <span className="text-ink-500 text-[13px]">/{m.unit}</span>
              <span className="ml-3 text-[12px] text-ink-500">
                参考价 · 实际以供应商最终确认为准
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-y-3 gap-x-6 text-[12.5px]">
              <Field label="规格" value={m.spec} />
              <Field label="表面" value={m.surface} />
              <Field label="单位" value={`m² (起订 ${m.moq})`} />
              <Field label="环保等级" value={m.ecoLevel} tone="brand" />
              <Field label="防火等级" value={m.fireLevel} tone="info" />
              <Field label="交期" value={`${m.leadDays} 天 内`} />
              <Field label="最小起订量" value={`${m.moq} m²`} />
              <Field label="原产地" value="中国" />
              <Field label="应用场景" value="公共区域 / 客房 / 餐厅" />
            </div>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {m.tags.map((t) => (
                <Badge key={t} tone="subtle">
                  {t}
                </Badge>
              ))}
              <Badge tone="brand">优选合作</Badge>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <Button variant="primary" iconLeft={<Check className="size-4" />}>
                应用到当前项目
              </Button>
              <Link href="/compare">
                <Button variant="outline" iconLeft={<Repeat className="size-4" />}>
                  加入比价
                </Button>
              </Link>
              <Button variant="outline" iconLeft={<MessageCircle className="size-4" />}>
                发起询价
              </Button>
              <Button variant="outline" iconLeft={<ShoppingCart className="size-4" />}>
                加入订货清单
              </Button>
            </div>
          </Card>

          {/* Supplier card */}
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[15px] font-semibold text-ink-900">
                供应商信息
              </h3>
              <Link
                href="#"
                className="text-[13px] text-brand-700 hover:underline"
              >
                查看供应商档案 ›
              </Link>
            </div>
            <div className="mt-4 flex items-center gap-4">
              <Avatar name={supplier.name} size={48} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-ink-900">
                    {supplier.name}
                  </span>
                  <Badge tone="brand">{supplier.partnership}</Badge>
                </div>
                <div className="text-[12.5px] text-ink-500 mt-1 flex gap-4">
                  <span>{supplier.region}</span>
                  <span>合作 {supplier.yearsCooperated} 年</span>
                  <span>
                    履约率 {Math.round(supplier.fulfillmentRate * 100)}%
                  </span>
                  <span>评分 {supplier.rating.toFixed(1)}</span>
                </div>
              </div>
              <Button
                variant="outline"
                iconLeft={<Phone className="size-4" />}
              >
                联系供应商
              </Button>
              <Button variant="primary">发起询价</Button>
            </div>
          </Card>

          {/* Description */}
          <Card className="p-5">
            <h3 className="text-[15px] font-semibold text-ink-900">材料介绍</h3>
            <p className="mt-3 text-[13px] text-ink-700 leading-relaxed">
              {m.description}
            </p>
          </Card>
        </div>
      </div>

      {/* Cases */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-ink-900">应用案例</h3>
          <Link href="/projects" className="text-[13px] text-brand-700 hover:underline inline-flex items-center">
            查看全部 <ChevronRight className="size-3.5" />
          </Link>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {(m.cases ?? ["杭州滨江希尔顿酒店 大堂", "上海静安瑞吉酒店 走廊", "深圳湾办公楼 大堂", "广州 K11 艺术中心"]).slice(0, 4).map((c, i) => (
            <div key={i} className="rounded-lg border border-line overflow-hidden">
              <div className="aspect-[5/3]">
                <Scene
                  wallColor={["#9DAE9D", "#B5AD9C", "#9AAEB1", "#7B7468"][i % 4]}
                  className="w-full h-full"
                />
              </div>
              <div className="p-3">
                <div className="text-[13px] text-ink-900 font-medium truncate">
                  {c}
                </div>
                <div className="text-[11.5px] text-ink-500 mt-0.5">
                  应用面积 {formatNumber((i + 1) * 38.6, 1)} m²
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Related */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-[15px] font-semibold text-ink-900">相关材料推荐</h3>
        </div>
        <div className="mt-4 grid grid-cols-4 gap-4">
          {related.map((r) => (
            <Link
              key={r.id}
              href={`/materials/${r.id}`}
              className="rounded-lg border border-line hover:shadow-elevated transition-shadow overflow-hidden bg-white"
            >
              <MaterialThumb
                seed={r.id}
                category={r.category}
                className="w-full aspect-[5/3]"
              />
              <div className="p-3">
                <div className="text-[13px] font-medium text-ink-900 truncate">
                  {r.name}
                </div>
                <div className="text-[11.5px] text-ink-500 mt-0.5">
                  ¥{r.price} /{r.unit} · {r.spec}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Field({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "brand" | "info";
}) {
  return (
    <div>
      <div className="text-ink-500">{label}</div>
      <div className="mt-1">
        {tone ? (
          <Badge tone={tone}>{value}</Badge>
        ) : (
          <span className="text-ink-900 font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}

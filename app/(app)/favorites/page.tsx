import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialThumb } from "@/components/ui/material-thumb";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { materials } from "@/lib/mock";

const favIds = [
  "m_yunwu_grey",
  "m_yudu_white",
  "m_mibai_dong",
  "m_oak_straight",
  "m_brass_steel",
  "m_terrazzo_grey",
];

export default function FavoritesPage() {
  const favs = materials.filter((m) => favIds.includes(m.id));
  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs items={[{ label: "收藏" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900">收藏</h1>
          <p className="text-[13px] text-ink-500 mt-1">
            保存常用材料以便快速调用至项目中
          </p>
        </div>
        <Button variant="outline">新建收藏夹</Button>
      </div>
      <Card className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {favs.map((m) => (
            <Link
              key={m.id}
              href={`/materials/${m.id}`}
              className="rounded-lg border border-line overflow-hidden hover:shadow-elevated transition-shadow bg-white"
            >
              <div className="relative">
                <MaterialThumb
                  seed={m.id}
                  category={m.category}
                  className="w-full aspect-square"
                />
                <Star className="size-4 absolute top-2 right-2 text-warn-500 fill-warn-500" />
              </div>
              <div className="p-3">
                <div className="text-[13px] font-medium text-ink-900 truncate">
                  {m.name}
                </div>
                <div className="text-[11.5px] text-ink-500 mt-0.5">
                  ¥{m.price} /m²
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  <Badge tone="subtle">{m.category}</Badge>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

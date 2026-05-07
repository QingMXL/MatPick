import type { Quote, QuoteItem } from "@/lib/types";

const items: QuoteItem[] = [
  {
    id: "q1",
    area: "墙面",
    areaSize: 128.6,
    materialId: "m_yunwu_grey",
    unitPrice: 680,
    lossRate: 0.08,
    supplierId: "sp_dongsheng",
  },
  {
    id: "q2",
    area: "地面",
    areaSize: 268.4,
    materialId: "m_yudu_white",
    unitPrice: 620,
    lossRate: 0.08,
    supplierId: "sp_dongsheng",
  },
  {
    id: "q3",
    area: "顶面",
    areaSize: 156.2,
    materialId: "m_mibai_dong",
    unitPrice: 480,
    lossRate: 0.1,
    supplierId: "sp_xinlei",
  },
  {
    id: "q4",
    area: "立柱",
    areaSize: 89.7,
    materialId: "m_shenhui_wood",
    unitPrice: 560,
    lossRate: 0.08,
    supplierId: "sp_dongsheng",
  },
  {
    id: "q5",
    area: "软装背景",
    areaSize: 42.1,
    materialId: "m_buyi_yingbao",
    unitPrice: 420,
    lossRate: 0.05,
    supplierId: "sp_buyifang",
  },
  {
    id: "q6",
    area: "踢脚线",
    areaSize: 60.6,
    materialId: "m_steel_skirt",
    unitPrice: 120,
    lossRate: 0.05,
    supplierId: "sp_jinyi",
  },
];

export const quotes: Quote[] = [
  {
    id: "qt_hilton_lobby_v1",
    projectId: "p_hilton_hangzhou",
    scheme: "大堂公区",
    version: "V1.0",
    status: "已生成",
    generatedAt: "2025-05-10T14:30:00",
    items,
    history: [
      { version: "V1.0", status: "已生成", author: "林设计", at: "2025-05-10T14:30:00" },
      { version: "V0.9", status: "已调整", author: "林设计", at: "2025-05-09T16:45:00" },
      { version: "V0.8", status: "已生成", author: "林设计", at: "2025-05-09T10:12:00" },
    ],
  },
];

export function findQuote(id: string) {
  return quotes.find((q) => q.id === id);
}

export function calcQuoteSummary(quote: Quote) {
  const materialTotal = quote.items.reduce(
    (s, it) => s + it.areaSize * it.unitPrice,
    0,
  );
  const lossTotal = quote.items.reduce(
    (s, it) => s + it.areaSize * it.unitPrice * it.lossRate,
    0,
  );
  const taxRate = 0.13;
  const tax = (materialTotal + lossTotal) * taxRate;
  const shipping = 8500;
  const grandTotal = materialTotal + lossTotal + tax + shipping;
  const lossWeighted = materialTotal === 0 ? 0 : lossTotal / materialTotal;
  return {
    materialTotal,
    lossTotal,
    lossWeighted,
    tax,
    taxRate,
    shipping,
    grandTotal,
    estSavings: 18640.2,
  };
}

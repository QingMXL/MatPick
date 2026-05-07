import type { ComparisonItem } from "@/lib/types";

export const comparisons: ComparisonItem[] = [
  {
    id: "cmp_1",
    baselineMaterialId: "m_yunwu_grey",
    candidateMaterialId: "m_mibai_dong",
    similarity: 0.92,
    estSavings: 25712,
    notes: "纹理风格相近，价格更低，交期略长",
  },
  {
    id: "cmp_2",
    baselineMaterialId: "m_yunwu_grey",
    candidateMaterialId: "m_shenhui_wood",
    similarity: 0.78,
    estSavings: 15456,
    notes: "色调偏深，可作为特殊位置替换备选",
  },
  {
    id: "cmp_3",
    baselineMaterialId: "m_yunwu_grey",
    candidateMaterialId: "m_terrazzo_grey",
    similarity: 0.83,
    estSavings: 51440,
    notes: "水磨石替代天然石材，成本下降明显",
  },
];

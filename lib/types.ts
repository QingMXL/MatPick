export type ProjectStatus = "进行中" | "报价中" | "已完成" | "待启动";
export type ProjectStage = "方案设计" | "深化设计" | "施工配合" | "已完工";

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  stage: ProjectStage;
  area: number;
  cover: string; // procedural color
  lastEditedAt: string;
  members: string[];
  schemes: string[];
  city: string;
  client: string;
  deadline: string;
}

export type AreaKind = "墙面" | "地面" | "顶面" | "柜体" | "软装" | "立柱" | "踢脚线" | "软装背景";

export interface DetectedArea {
  id: string;
  kind: AreaKind;
  area: number; // m²
  selected?: boolean;
  // SVG-style polygon (percentages of container)
  polygon: Array<{ x: number; y: number }>;
}

export type MaterialCategory =
  | "石材"
  | "木作"
  | "布艺"
  | "皮革"
  | "瓷砖"
  | "五金"
  | "软装";

export interface Material {
  id: string;
  name: string;
  category: MaterialCategory;
  subCategory?: string;
  spec: string;
  surface: string;
  unit: "m²" | "m" | "件";
  price: number;
  brand: string;
  supplierId: string;
  ecoLevel: "E0" | "E1" | "B0";
  fireLevel: "A1" | "A2" | "B1";
  tags: string[];
  leadDays: number;
  moq: number; // minimum order qty
  description: string;
  cases?: string[];
}

export interface Supplier {
  id: string;
  name: string;
  region: string;
  rating: number;
  partnership: "优选" | "合作" | "新供应商";
  contact: string;
  phone: string;
  yearsCooperated: number;
  fulfillmentRate: number;
}

export interface QuoteItem {
  id: string;
  area: string; // 区域 / 空间名称
  areaSize: number;
  materialId: string;
  unitPrice: number;
  lossRate: number; // 0.08 = 8%
  supplierId: string;
}

export interface Quote {
  id: string;
  projectId: string;
  scheme: string;
  version: string;
  status: "已生成" | "已调整" | "草稿";
  generatedAt: string;
  items: QuoteItem[];
  history: Array<{ version: string; status: string; author: string; at: string }>;
}

export interface ComparisonItem {
  id: string;
  baselineMaterialId: string;
  candidateMaterialId: string;
  similarity: number; // 0-1
  estSavings: number;
  notes?: string;
}

export type OrderStatus =
  | "待确认"
  | "待发货"
  | "运输中"
  | "已完成"
  | "售后";

export interface OrderTimelineEvent {
  label: string;
  at?: string;
  done: boolean;
}

export interface Order {
  id: string;
  no: string;
  projectId: string;
  supplierId: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  items: Array<{ materialId: string; qty: number; unit: string; subtotal: number }>;
  timeline: OrderTimelineEvent[];
  contact: string;
  address: string;
}

export interface TodoItem {
  id: string;
  title: string;
  due: string;
  urgency: "今日截止" | "明天截止" | string;
}

export interface Message {
  id: string;
  sender: string;
  role: string;
  content: string;
  at: string;
  unread?: boolean;
}

export interface ActivityEvent {
  id: string;
  actor: string;
  text: string;
  at: string;
  kind: "upload" | "edit" | "quote" | "system";
}

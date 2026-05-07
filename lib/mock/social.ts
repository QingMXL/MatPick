import type { ActivityEvent, Message, TodoItem } from "@/lib/types";

export const todos: TodoItem[] = [
  {
    id: "t1",
    title: "杭州滨江希尔顿酒店 — 材料清单确认",
    due: "2025-05-10",
    urgency: "今日截止",
  },
  {
    id: "t2",
    title: "上海静安瑞吉酒店 — 报价单确认",
    due: "2025-05-11",
    urgency: "明天截止",
  },
  {
    id: "t3",
    title: "深圳湾办公楼 — 样品寄送跟进",
    due: "2025-05-13",
    urgency: "5月13日截止",
  },
  {
    id: "t4",
    title: "广州 K11 艺术中心 — 供应商合同签署",
    due: "2025-05-15",
    urgency: "5月15日截止",
  },
];

export const messages: Message[] = [
  {
    id: "msg1",
    sender: "张工",
    role: "项目助理",
    content: "杭州滨江希尔顿酒店的报价单已更新，请查收",
    at: "2025-05-10T14:50:00",
    unread: true,
  },
  {
    id: "msg2",
    sender: "供应商 · 石材王总",
    role: "东升石材",
    content: "云雾灰大理石样品已发出，预计明天送达",
    at: "2025-05-10T14:00:00",
    unread: true,
  },
  {
    id: "msg3",
    sender: "系统通知",
    role: "MatPick",
    content: "项目 深圳湾办公楼 已进入报价阶段",
    at: "2025-05-10T12:00:00",
    unread: false,
  },
];

export const activity: ActivityEvent[] = [
  {
    id: "ev1",
    actor: "张工",
    text: "上传了材料 云雾灰大理石 到项目 杭州滨江希尔顿酒店",
    at: "2025-05-10T14:50:00",
    kind: "upload",
  },
  {
    id: "ev2",
    actor: "你",
    text: "更新了项目 上海静安瑞吉酒店 的方案文件",
    at: "2025-05-10T14:00:00",
    kind: "edit",
  },
  {
    id: "ev3",
    actor: "李设计",
    text: "完成了项目 深圳湾万象城办公楼 的报价单",
    at: "2025-05-10T12:00:00",
    kind: "quote",
  },
  {
    id: "ev4",
    actor: "系统",
    text: "生成了项目 广州 K11 艺术中心 的材料清单",
    at: "2025-05-09T18:20:00",
    kind: "system",
  },
];

export const calendarEvents = [
  { project: "杭州滨江希尔顿酒店", label: "方案汇报", date: "2025-05-12" },
  { project: "上海静安瑞吉酒店", label: "报价截止", date: "2025-05-13" },
  { project: "深圳湾万象城办公楼", label: "样品确认", date: "2025-05-16" },
];

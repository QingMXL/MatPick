import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

const members = [
  { name: "林设计", role: "项目负责人", projects: 8, status: "在线" },
  { name: "张工", role: "项目助理", projects: 5, status: "在线" },
  { name: "李设计", role: "深化设计师", projects: 6, status: "离线" },
  { name: "周设计", role: "设计师", projects: 3, status: "在线" },
  { name: "孙设计", role: "实习生", projects: 1, status: "离线" },
];

export default function TeamPage() {
  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs items={[{ label: "团队" }]} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-ink-900">团队</h1>
          <p className="text-[13px] text-ink-500 mt-1">管理团队成员、角色与权限</p>
        </div>
        <Button variant="primary">邀请成员</Button>
      </div>
      <Card className="p-0">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="bg-surface-subtle text-ink-500 text-[12px]">
              <th className="text-left px-4 h-10 font-medium">成员</th>
              <th className="text-left px-4 h-10 font-medium">角色</th>
              <th className="text-left px-4 h-10 font-medium">参与项目</th>
              <th className="text-left px-4 h-10 font-medium">状态</th>
              <th className="text-center px-4 h-10 font-medium w-32">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {members.map((m) => (
              <tr key={m.name} className="hover:bg-surface-subtle/40">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={m.name} size={32} />
                    <span className="text-ink-900 font-medium">{m.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-700">{m.role}</td>
                <td className="px-4 py-3 text-ink-700">{m.projects}</td>
                <td className="px-4 py-3">
                  <Badge tone={m.status === "在线" ? "brand" : "subtle"} dot>
                    {m.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-center">
                  <Button size="sm" variant="outline">
                    管理
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

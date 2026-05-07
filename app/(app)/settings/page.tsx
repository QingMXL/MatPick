import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";

export default function SettingsPage() {
  return (
    <div className="px-8 py-6 max-w-[1640px] mx-auto space-y-5">
      <Breadcrumbs items={[{ label: "设置" }]} />
      <h1 className="text-[24px] font-semibold text-ink-900">设置</h1>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-3">
          <Card className="p-2 text-[13px]">
            {[
              "账户资料",
              "团队与成员",
              "通知设置",
              "项目模板",
              "导出格式",
              "供应商关联",
              "API 集成",
              "订阅与计费",
            ].map((s, i) => (
              <button
                key={s}
                className={
                  "w-full h-9 px-3 text-left rounded-md " +
                  (i === 0
                    ? "bg-brand-50 text-brand-700 font-medium"
                    : "text-ink-700 hover:bg-surface-subtle")
                }
              >
                {s}
              </button>
            ))}
          </Card>
        </div>
        <div className="col-span-9 space-y-5">
          <Card className="p-5">
            <h3 className="text-[15px] font-semibold text-ink-900">账户资料</h3>
            <div className="mt-4 grid grid-cols-2 gap-5 text-[13px]">
              <Field label="姓名" value="林设计" />
              <Field label="角色" value="设计师" />
              <Field label="所属公司" value="拾材集设计工作室" />
              <Field label="邮箱" value="lin@matpick.cn" />
              <Field label="手机" value="138-0000-1234" />
              <Field label="常用城市" value="杭州 / 上海" />
            </div>
          </Card>
          <Card className="p-5">
            <h3 className="text-[15px] font-semibold text-ink-900 inline-flex items-center gap-2">
              订阅与计费
              <Badge tone="brand">企业版</Badge>
            </h3>
            <div className="mt-3 text-[13px] text-ink-700">
              当前套餐有效期至 2025-12-31，已使用存储 36.2GB / 200GB。
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Button variant="primary">续费</Button>
              <Button variant="outline">查看发票</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[12px] text-ink-500">{label}</div>
      <div className="mt-1 h-9 px-3 rounded-lg border border-line bg-surface-subtle/40 text-ink-800 inline-flex items-center w-full">
        {value}
      </div>
    </div>
  );
}

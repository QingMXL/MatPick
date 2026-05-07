import { Card } from "./card";

export function Empty({
  title,
  hint,
  icon,
  action,
}: {
  title: string;
  hint?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card className="p-12 flex flex-col items-center justify-center text-center">
      <div className="size-14 rounded-full bg-brand-50 text-brand-700 inline-flex items-center justify-center">
        {icon}
      </div>
      <div className="mt-4 text-[15px] font-medium text-ink-900">{title}</div>
      {hint && <div className="mt-1 text-[12.5px] text-ink-500 max-w-[420px]">{hint}</div>}
      {action && <div className="mt-4">{action}</div>}
    </Card>
  );
}

import { cn } from "@/lib/utils";

const palette = [
  "bg-brand-100 text-brand-700",
  "bg-warn-50 text-warn-600",
  "bg-info-50 text-info-500",
  "bg-danger-50 text-danger-500",
  "bg-ink-100 text-ink-700",
];

export function Avatar({
  name,
  size = 32,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const initial = name.trim().slice(0, 1) || "?";
  const idx =
    Array.from(name).reduce((a, c) => a + c.charCodeAt(0), 0) % palette.length;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full font-medium",
        palette[idx],
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {initial}
    </span>
  );
}

export function AvatarStack({ names, max = 3 }: { names: string[]; max?: number }) {
  const visible = names.slice(0, max);
  const overflow = names.length - visible.length;
  return (
    <div className="flex items-center -space-x-1.5">
      {visible.map((n, i) => (
        <span
          key={i}
          className="ring-2 ring-white rounded-full"
        >
          <Avatar name={n} size={22} />
        </span>
      ))}
      {overflow > 0 && (
        <span className="ring-2 ring-white inline-flex items-center justify-center w-[22px] h-[22px] rounded-full bg-surface-subtle text-[10px] text-ink-600 font-medium">
          +{overflow}
        </span>
      )}
    </div>
  );
}
